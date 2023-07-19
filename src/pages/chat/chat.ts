import chat from './chat.hbs'
import './chat.less'
import './chatItem/chatItem.less'
import sendPic from '../../../static/sendPic.svg'

export default function getChat() {
    const chatItems = [
        {
            chatName: 'Мама',
            lastMessage: {
                Sender: 'Я',
                Text: 'Папе привет!'
            }
        },
        {
            chatName: 'Папа',
            lastMessage: {
                Sender: 'Папа',
                Text: 'Всё ок'
            }
        }
    ];
    const data = {
        send: sendPic,
        chatItems: chatItems
    };
    return chat(data);
}
