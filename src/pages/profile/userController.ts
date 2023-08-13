import store from "../../modules/store";
import { UserApi } from "../../api/user-api";
import { userInfo } from "../../models/user";

export default class UserController {
    private _userApi = new UserApi();
    public getUser(): void {
        this._userApi.get().then(
            (x: XMLHttpRequest)=> store.set('user', <userInfo>x.response)
        );
    }
}
