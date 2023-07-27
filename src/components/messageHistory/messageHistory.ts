import './messageHistory.less'
import messageHistory from './messageHistory.hbs'
import Block from '../block/block'
import { MessageHistoryProps } from './types'

export default class MessageHistoryBlock extends Block<MessageHistoryProps> {
    constructor() {
        const props = {
            messages: [
                {
                    sender: 'Я',
                    text: 'Привет! Позвоню через 15 минут?'
                },
                {
                    sender: 'Папа',
                    text: 'Ок'
                }
            ],
            attributes: {
                class: 'history'
            }
        };

        super('div', props);
    }
    render() {
        return this.compile(messageHistory);
    }
}
