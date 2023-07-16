import chatItem from './chatItem.hbs'
import Handlebars from 'handlebars'
import './chatItem.less'

export default function registerChatItemPartial()
{
    Handlebars.registerPartial('chatItemPartial', chatItem);
}
