import last from "./utils/last";
import { ServerError, NotFoundError } from "./pages/error/error";
import GetLoginPage from "./pages/login/login";
import GetRegisterPage from "./pages/register/register";
import getProfile from "./pages/profile/profile";
import getChat from "./pages/chat/chat";
import './style.less'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("app");
    const path = last(window.location.pathname.split('/')).toLowerCase();
    switch (path)
    {
        case 'profile':
            root.innerHTML = getProfile();
            break;
        case 'servererror':
            root.innerHTML = ServerError();
            break;
        case 'notfound':
            root.innerHTML = NotFoundError();
            break;
        case 'login':
            root.innerHTML = GetLoginPage();
            break;
        case 'register':
            root.innerHTML = GetRegisterPage();
            break;
        case 'chat':
            root.innerHTML = getChat();
            break;
        default:
            break;

    }
});