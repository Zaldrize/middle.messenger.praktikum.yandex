import { ChatApi } from "../api/chat-api";
import AddUsersRequest from "../models/addUsersRequest";
import store from "../modules/store";

export default class ChatController {
    private _chatApi = new ChatApi();

    public getChats() {
        return this._chatApi.get()
        .then(x=>
            store.set('chats',x));
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
