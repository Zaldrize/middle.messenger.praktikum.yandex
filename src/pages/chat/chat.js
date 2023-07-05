import chat from './chat.hbs'
import './chat.css'

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
    const data = {};
    data.chatItems = chatItems;
    return chat(data);
}