import chat from './chat.hbs'
import './chat.less'
import sendPic from '../../../static/sendPic.svg'
import { ChatPageProps } from './types';
import Block from '../../components/block/block';
import ChatFeed from '../../components/chatFeed/chatFeed';
import MessageHistoryBlock from '../../components/messageHistory/messageHistory';
import Button from '../../components/button/button';
import { NotEmptyValidator } from '../../validators/notEmptyValidator';
export default class ChatPage extends Block<ChatPageProps> {
    constructor() {
        const props = {
            chatFeed: new ChatFeed(),
            history: new MessageHistoryBlock(),
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
    }
    sendMessage(e: MouseEvent) {
        const text = this._element.querySelector('textarea');
        const validator = new NotEmptyValidator();
        if (validator.isValid(text?.value || '')){
            text?.setCustomValidity('');
            console.log(text?.value);
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
