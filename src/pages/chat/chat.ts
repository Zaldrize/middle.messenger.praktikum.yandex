import chat from './chat.hbs'
import './chat.less'
import sendPic from '../../../static/sendPic.svg'
import { ChatPageProps } from './types';
import Block from '../../components/block/block';
import ChatFeed from '../../components/chatFeed/chatFeed';
import MessageHistoryBlock from '../../components/messageHistory/messageHistory';
import Button from '../../components/button/button';
import { NotEmptyValidator } from '../../validators/notEmptyValidator';
import ChatHeaderComponent from '../../components/chatHeader/chatHeader';
import store, {StoreEvents } from '../../modules/store';
import ChatItem from '../../models/chatItem';
import MessageWebSocket from '../../modules/webSocket';
export default class ChatPage extends Block<ChatPageProps> {
    constructor() {
        const props = {
            chatFeed: new ChatFeed(),
            history: new MessageHistoryBlock(),
            header: new ChatHeaderComponent(),
            send: sendPic,
            sendButton: new Button('div', {                
                text: 'Send',
                events: {
                    'click': (e: MouseEvent) => {this.sendMessage(e);}
                }
            }),
            attributes: {
                class: 'chat'
            }
        };
        super('div', props);
        store.on(StoreEvents.Updated, () => this.chatSelected())
    }

    chatSelected(): void {
        const currentChat = store.getState()["currentChat"] as ChatItem;
        if (currentChat) {
            this._children.header.setProps({chatName: currentChat.title});
        }
    }
    sendMessage(e: MouseEvent) {
        const text = this._element.querySelector('textarea');
        const validator = new NotEmptyValidator();
        if (validator.isValid(text?.value || '')){
            text?.setCustomValidity('');
            console.log(text?.value);
            const socket = store.getState()["currentSocket"] as MessageWebSocket;
            if (socket) {
                socket.sendMessage(text!.value);
                text!.value='';
            }
        }
        else {
            text?.setCustomValidity(validator.getMessage());
        }
        text?.reportValidity();
        e.stopPropagation();
    }
    render() {
        return this.compile(chat);
    }
}
