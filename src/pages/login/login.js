import login from './login.hbs'
import chatPic from '../../../static/chatPic.svg'
import './login.css'

export default function GetLoginPage() {
    return login({chatPic: chatPic});
}