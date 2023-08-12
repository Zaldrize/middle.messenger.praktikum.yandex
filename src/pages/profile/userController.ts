import store from "../../modules/store";
import { UserApi, userInfo } from "../../api/user-api";

export default class UserController {
    private _userApi = new UserApi();
    public getUser(): void {
        this._userApi.get().then(
            (x: XMLHttpRequest)=> store.set('user', <userInfo>x.response)
        );
    }
}
