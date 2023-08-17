import './style.less'
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register";
import ChatPage from "./pages/chat/chat";
import { Router } from "./routing/router";
import UserController from './controllers/userController';

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');
    router.use('/', LoginPage)
    .use('/sign-up', RegisterPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage)
    .start();

    const controller = new UserController();
    controller.getUser().then((u:boolean) => {
        if (u)
        router.go('/messenger');
    })

});
