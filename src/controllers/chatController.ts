import { ChatApi } from "../api/chat-api";
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
}
