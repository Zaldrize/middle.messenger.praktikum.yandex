import chat from './chat.hbs'
import './chat.less'
import sendPic from '../../../static/sendPic.svg'
import { ChatPageProps } from './types';
import Block from '../../components/block/block';
import ChatFeed from '../../components/chatFeed/chatFeed';
import MessageHistoryBlock from '../../components/messageHistory/messageHistory';
export default class ChatPage extends Block<ChatPageProps> {
    constructor() {
        const props = {
            chatFeed: new ChatFeed(),
            history: new MessageHistoryBlock(),
            send: sendPic,
            attributes: {
                class: 'chat'
            }
        };
        super('div', props);
    }
    render() {
        return this.compile(chat);
    }
}
