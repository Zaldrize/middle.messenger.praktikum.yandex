import login from './login.hbs'
import chatPic from '../../../static/chatPic.svg'

export default function GetLoginPage() {
    return login({chatPic: chatPic});
}