import ChatItem from "../../models/chatItem";
import Block from "../block/block";
import ChatItemProps from "./types";
import "./chat.less";
import chatItem from "./chat.hbs";

export default class ChatItemComponent extends Block<ChatItemProps>{
    constructor(c: ChatItem) {
        const props = new ChatItemProps();
        props.chatName = c.title;
        props.lastMessageSender = c.last_message?.user.display_name;
        props.lastMessageText = c.last_message?.content;
        
        super('div', props);

    }

    render() {
        return this.compile(chatItem);
    }
}
