import './messageHistory.less'
import messageHistory from './messageHistory.hbs'
import Block from '../block/block'
import { MessageHistoryProps } from './types'
import store, { StoreEvents } from '../../modules/store'
import Message from '../../models/message'
import { userInfo } from '../../models/user'
import MessageViewModel from '../../models/messageViewModel'

export default class MessageHistoryBlock extends Block<MessageHistoryProps> {
    constructor() {
        const props = {
            attributes: {
                class: 'history'
            }
        };
        super('div', props);
        store.on(StoreEvents.Updated, () => this.getMessages());
    }
    getMessages(): void {
        const messages = store.getState()['messages'] as Array<Message>;
        const chatUsers = store.getState()['chatUsers'] as Array<userInfo>;
        if (messages && chatUsers) {
        const messageViewModels: Array<MessageViewModel> = [];
         messages.forEach(m=>
            messageViewModels.push(
                new MessageViewModel(m.content, chatUsers.find(x=>x.id == m.user_id)!.display_name))
            );
        this.setProps({messages: messageViewModels});
    }
    }
    render() {
        return this.compile(messageHistory);
    }
}
