import chatItem from './chatItem.hbs'
import Handlebars from 'handlebars'

export default function registerChatItemPartial()
{
    Handlebars.registerPartial('chatItemPartial', chatItem);
}