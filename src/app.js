import last from "./utils/last";
import GetProfilePage from "./pages/profile/profile";
import { ServerError, NotFoundError } from "./pages/error/error";
import GetLoginPage from "./pages/login/login";
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("app");
    const path = last(window.location.pathname.split('/')).toLowerCase();
    switch (path)
    {
        case 'profile':
            root.innerHTML = GetProfilePage();
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
        default:
            break;

    }
});