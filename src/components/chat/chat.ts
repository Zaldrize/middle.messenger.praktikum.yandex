import ChatItem from "../../models/chatItem";
import Block from "../block/block";
import ChatItemProps from "./types";
import "./chat.less";
import chatItem from "./chat.hbs";
import store, { StoreEvents } from "../../modules/store";
import ChatController from "../../controllers/chatController";
import last from "../../utils/last";
import Message from "../../models/message";
import { userInfo } from "../../models/user";

export default class ChatItemComponent extends Block<ChatItemProps> {
    private chatController = new ChatController();
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
        store.on(StoreEvents.Updated, () => this.onMessage());
        this.chat = c;
    }
    onMessage(): void {
        const currentChatId: number = store.getState()["currentChatId"];
        const lastMessage = last(store.getState()["messages"]) as Message;
        const chatUsers = store.getState()["chatUsers"] as Array<userInfo>;
        if (this.chat.id === currentChatId && lastMessage) {
            this._element.classList.add('selected');
            const sender = chatUsers.find(x=>x.id===lastMessage.user_id)!.display_name;
            const text = lastMessage.content;
            this.setProps({lastMessageSender: sender, lastMessageText: text} as ChatItemProps);

        }
    }
    
    selectChat(e: Event): void {
        e.stopPropagation();
        this.chatController.selectChat(this.chat);
    }

    render() {
        return this.compile(chatItem);
    }

    componentDidUpdate(newProps: ChatItemProps): boolean {
        return newProps.lastMessageSender !== this._props.lastMessageSender ||
        newProps.lastMessageText !== this._props.lastMessageText;
    }
}
