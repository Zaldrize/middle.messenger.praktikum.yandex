import last from "./utils/last";
import chatItem from './pages/chat/chatItem/chatItem.hbs'
import Handlebars from "handlebars/runtime";
Handlebars.registerPartial('chatItemPartial', chatItem);
import getChat from "./pages/chat/chat";
import './style.less'
import LoginPage from "./pages/login";
import { render } from "./renderDOM";
import ProfilePage from "./pages/profile/profile";
import RegisterPage from "./pages/register/register";
import ErrorPage from "./pages/error/error";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("app");
    if (!root) {
        return;
    }

    const path: string = last(window.location.pathname.split('/')).toLowerCase();
    switch (path)
    {
        case 'profile': {
            let profilePage = new ProfilePage();
            render('#app', profilePage);
            break;
            }
        case 'servererror': {
            let errorPage = new ErrorPage(500, 'Уже исправляем');
            render('#app', errorPage);
            break;
        }
        case 'notfound':{
            let errorPage = new ErrorPage(404, 'Страница не найдена');
            render('#app', errorPage);
            break;
        }
        case 'login': {
            let loginPage = new LoginPage();
            render('#app', loginPage);
            break;
        }
        case 'register': {
            let registerPage = new RegisterPage();
            render('#app', registerPage);
            break;
        }
        case 'chat':
            root.innerHTML = getChat();
            break;
        default:
            break;

    }
});
