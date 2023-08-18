import Block from '../block/block'
import message from './message.hbs'
import './message.less'
import MessageProps from './types'

export default class MessageComponent extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super('div', props);
        
    }
    render() {
        return this.compile(message);
    }
    
}
