import { ChatApi } from "../api/chat-api";
import ChatUsersRequest from "../models/addUsersRequest";
import ChatItem from "../models/chatItem";
import { userInfo } from "../models/user";
import store, { StoreEvents } from "../modules/store";
import MessageWebSocket from "../modules/webSocket";

export default class ChatController {
    private _chatApi = new ChatApi();

    public getChats() {
        return this._chatApi.get()
            .then(
                x => {
                    store.set('chats', x);
                    const state = store.getState();
                    if (!state["sockets"])
                        state["sockets"] = new Map<number, WebSocket>();
                    x.forEach(chatItem => {
                        this.getSocket(chatItem.id).then(
                            (s: MessageWebSocket) => {
                                state["sockets"][chatItem.id] = s;
                            }

                        );
                    })
                }
            );

    }

    public createChat(chatName: string) {
        return this._chatApi.createChat(chatName)
            .then(
                (x: XMLHttpRequest) => {
                    if (x.status === 200) {
                        this.getChats();
                    }
                    else console.log(x.response);
                }
            )
    }

    public addUsers(users: Array<number>, chatId: number) {
        const request = new ChatUsersRequest();
        const state = store.getState();
        request.chatId = chatId;
        request.users = users;
        return this._chatApi.addUsers(request)
            .then(
                (x: XMLHttpRequest) => {
                    if (x.status !== 200) {
                        console.log(x.response);
                    }
                }
            )
            .then(() =>
                this._chatApi.getChatUsers(chatId))
            .then(x => {
                state["chatUsers"] = x;
                store.emit(StoreEvents.Updated)
            });
    }
    public removeUsers(users: Array<number>, chatId: number) {
        const request = new ChatUsersRequest();
        request.chatId = chatId;
        request.users = users;
        return this._chatApi.removeUsers(request)
            .then(
                (x: XMLHttpRequest) => {
                    if (x.status !== 200) {
                        console.log(x.response);
                    }
                    else {
                        const chatUsers = store.getState().chatUsers as Array<userInfo>;
                        store.getState().chatUsers = chatUsers.filter(x => !users.includes(x.id));
                        store.emit(StoreEvents.Updated);
                    }
                }
            )

    }
    public selectChat(chat: ChatItem) {
        const state = store.getState();
        this.getSocket(chat.id).then((socket: MessageWebSocket) => {
            state["currentChatId"] = chat.id;
        state["currentChat"] = chat;
        state["currentSocket"] = socket;
        state["messages"] = [];
        this._chatApi.getChatUsers(chat.id).then(x => state["chatUsers"] = x);
        socket.getOldMessages();
        })
        
    }

    public getSocket(chatId: number): Promise<MessageWebSocket> {        
        const state = store.getState();        
        const userId = (store.getState()["user"] as userInfo).id;
        const sockets = state.sockets as Map<number, MessageWebSocket>;
        if (sockets && sockets.has(chatId)) {
            return new Promise<MessageWebSocket>(()=> sockets.get(chatId));
        }
        else return this._chatApi
        .getChatToken(chatId)
        .then(t => {
            const token = JSON.parse(t.response).token;
            const socket = new MessageWebSocket(chatId, userId, token);
            state["sockets"][chatId] = socket;
            return socket;
        })
    }
}
