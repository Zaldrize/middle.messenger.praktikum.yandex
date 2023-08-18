import './messageHistory.less'
import messageHistory from './messageHistory.hbs'
import Block from '../block/block'
import { MessageHistoryProps } from './types'
import store, { StoreEvents } from '../../modules/store'
import Message from '../../models/message'
import { userInfo } from '../../models/user'
import MessageComponent from '../message/message'
import MessageProps from '../message/types'

export default class MessageHistoryBlock extends Block<MessageHistoryProps> {
    constructor() {
        const props = {
            messages: [],
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
            const messageViewModels: Array<MessageComponent> = [];
            messages.forEach(m =>
                messageViewModels.push(
                    new MessageComponent(
                        new MessageProps(chatUsers.find(x => x.id == m.user_id)!.display_name,
                        m.content))));
            this.setProps({ messages: messageViewModels });
        }
    }
    render() {
        return this.compile(messageHistory);
    }
}
