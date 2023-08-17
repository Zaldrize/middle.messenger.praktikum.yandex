import './messageHistory.less'
import messageHistory from './messageHistory.hbs'
import Block from '../block/block'
import { MessageHistoryProps } from './types'
import store, { StoreEvents } from '../../modules/store'
import MessageWebSocket from '../../modules/webSocket'

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
        console.log('Get messages from component');
        const state = store.getState();
        const socket = state["currentSocket"] as MessageWebSocket;
        if (socket) {
            socket.getOldMessages();
        }
    }
    render() {
        return this.compile(messageHistory);
    }
}
