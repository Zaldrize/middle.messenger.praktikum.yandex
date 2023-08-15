import store from "../modules/store";
import { UserApi } from "../api/user-api";
import { userInfo } from "../models/user";
import PasswordRequest from "../models/passwordRequest";

export default class UserController {
    private _userApi = new UserApi();

    public getUser(): void {
        this._userApi.get().then(
            (x: XMLHttpRequest)=> store.set('user', <userInfo>x.response)
        );
    }

    public saveUserProfile(data: userInfo): void {
        this._userApi.put(data).then(
            ()=> store.set('user', JSON.stringify(data))
        );
    }

    public changeUserPassword(data: PasswordRequest): void {
        this._userApi.changePassword(data).then(
            (x: XMLHttpRequest)=>console.log(x.response)
        );
    }
}
