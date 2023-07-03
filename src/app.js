import last from "./utils/last";
import GetProfilePage from "./pages/profile/profile";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("app");
    const path = last(window.location.pathname.split('/'))
    if (path === 'profile')
    {
        root.innerHTML = GetProfilePage();
    }
});