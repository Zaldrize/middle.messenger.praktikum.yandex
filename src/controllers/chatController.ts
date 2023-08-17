import { ChatApi } from "../api/chat-api";
import AddUsersRequest from "../models/addUsersRequest";
import { userInfo } from "../models/user";
import store from "../modules/store";
import MessageWebSocket from "../modules/webSocket";

export default class ChatController {
    private _chatApi = new ChatApi();

    public getChats() {
        return this._chatApi.get()
        .then(
            x=> {
            store.set('chats',x);
            const state = store.getState();
            const userId = (store.getState()["user"] as userInfo).id;
            if (!state["sockets"])
                state["sockets"] = new Map<number, WebSocket>();
            x.forEach(chatItem => {
                this._chatApi.getChatToken(chatItem.id)
                .then(t => {
                    const token = JSON.parse(t.response).token;
                    const socket = new MessageWebSocket(chatItem.id, userId, token);
                    state["sockets"][chatItem.id] = socket;
                })
            })
        }
            );
        
    }

    public createChat(chatName: string) {
        return this._chatApi.createChat(chatName)
        .then(
            (x:XMLHttpRequest) => {
                if (x.status === 200) {
                    this.getChats();
                }
                else console.log(x.response);
            }
        )
    }
    
    public addUsers(users: Array<number>, chatId: number)
    {
        const request = new AddUsersRequest();
        request.chatId = chatId;
        request.users = users;
        return this._chatApi.addUsers(request)
        .then(
            (x: XMLHttpRequest) => {
                if (x.status !== 200){
                    console.log(x.response);
                }
            }
        )
    }
}
