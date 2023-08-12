import chatFeed from './chatFeed.hbs'
import './chatFeed.less'
import Block from '../block/block';
import { ChatFeedProps } from './types';
import ChatSearch from '../chatSearch';
import { UserApi, userInfo } from '../../api/user-api';

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
            chatSearch: new ChatSearch('div', {
                attributes: {
                    placeholder: 'Search...',
                    class: 'chat-search'
                },
                events: {
                    'input': (e: Event) => this.search(e),
                },
                users: []
            }),
            attributes: {
                class: 'chats'
            }
        }
        super('div', props)
    }
    render() {
        return this.compile(chatFeed);
    }

    search(e: Event) {
        e.preventDefault();
        const loginSearch = (e.target as HTMLInputElement).value;
        const api = new UserApi();
        api.search(loginSearch).then((x: XMLHttpRequest)=>
            {
                const items = JSON.parse(x.response) as userInfo[];
                if (items) {
                    this._children.chatSearch.setProps(
                        {
                            users: items,
                            attributes: {value: loginSearch}
                        });
                }
            });            
    }
}


