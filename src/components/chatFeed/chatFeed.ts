import chatFeed from './chatFeed.hbs'
import './chatFeed.less'
import Block from '../block/block';
import { ChatFeedProps } from './types';
import { UserApi } from '../../api/user-api';
import Button from '../button/button';
import AddChatDialog from '../dialogs/addChatDialog/addChatDialog';
import { userInfo } from '../../models/user';
import ChatController from '../../controllers/chatController';
import store, {StoreEvents } from '../../modules/store';
import ChatItemComponent from '../chat/chat';
import ChatItem from '../../models/chatItem';

export default class ChatFeed extends Block<ChatFeedProps> {

    private _chatController = new ChatController();
    constructor() {
        const props = {            
            addChatDialog: new AddChatDialog(),
            addChatButton: new Button('div', {
                text: '+',
                attributes: {
                    class: 'add-chat-button'
                },
                events: {
                    'click': ()=> this.openAddChatDialog()
                }
            }),
            chatComponents: []
            
        };
        super('div', props);
        this._chatController.getChats();
        store.on(StoreEvents.Updated, () => this.update());
    }

    update() {
        const chats = store.getState()['chats'];
        const chatComponents: Array<ChatItemComponent> = 
        chats.map((c: ChatItem)=>new ChatItemComponent(c));
        this.setProps({chatComponents: chatComponents} as ChatFeedProps);
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

    openAddChatDialog() {
        this._children.addChatDialog.show();
    }
}


