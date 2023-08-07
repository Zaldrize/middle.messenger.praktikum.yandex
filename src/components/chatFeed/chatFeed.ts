import chatFeed from './chatFeed.hbs'
import './chatFeed.less'
import Block from '../block/block';
import { ChatFeedProps } from './types';

export default class ChatFeed extends Block<ChatFeedProps> {
    constructor() {
        const props = {
            chatItems: [
                {
                    chatName: 'Папа',
                    lastMessageSender: 'Папа',
                    lastMessageText: 'Ок'
                },
                {
                    chatName: 'Мама',
                    lastMessageSender: 'Я',
                    lastMessageText: 'Позвоню чуть позже'
                },
            ],
            attributes: {
                class: 'chats'
            }
        }
        super('div', props)
    }
    render() {
        return this.compile(chatFeed);
    }
}


