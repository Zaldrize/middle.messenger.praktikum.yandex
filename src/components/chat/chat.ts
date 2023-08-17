import ChatItem from "../../models/chatItem";
import Block from "../block/block";
import ChatItemProps from "./types";
import "./chat.less";
import chatItem from "./chat.hbs";
import store, {StoreEvents } from "../../modules/store";

export default class ChatItemComponent extends Block<ChatItemProps> {
    private chat: ChatItem;
    constructor(c: ChatItem) {
        const props = new ChatItemProps();
        props.chatName = c.title;
        props.lastMessageSender = c.last_message?.user.display_name;
        props.lastMessageText = c.last_message?.content;
        props.chatId = c.id;
        props.events = {
            'click': (e: Event) => this.selectChat(e)
        }
        super('div', props);
        this.chat = c;
    }
    onChatSelected() {
        const currentChatId: number = store.getState()["currentChatId"];
        if (this.chat.id === currentChatId) {
            this._element.classList.add('selected');
        }
        else {
            this._element.classList.remove('selected');
        }
    }
    selectChat(e: Event): void {
        e.stopPropagation();
        let state = store.getState();
        state["currentChatId"] = this._props.chatId;
        state["currentChat"] = this.chat;
        store.emit(StoreEvents.Updated);
    }

    render() {
        return this.compile(chatItem);
    }
}
