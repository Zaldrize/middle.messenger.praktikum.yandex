import { ChatApi } from "../api/chat-api";
import store from "../modules/store";

export default class ChatController {
    private _chatApi = new ChatApi();

    public getChats() {
        return this._chatApi.get()
        .then(x=>
            store.set('chats',x));
    }
}
