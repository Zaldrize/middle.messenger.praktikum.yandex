import chat from './chat.hbs'
import './chat.less'
import sendPic from '../../../static/sendPic.svg'
import { ChatPageProps } from './types';
import Block from '../../components/block/block';
import ChatFeed from '../../components/chatFeed/chatFeed';
export default class ChatPage extends Block<ChatPageProps> {
    constructor() {
        const props = {
            chatFeed: new ChatFeed(),
            sendPic: sendPic,
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
