import store from "../modules/store";
import { UserApi } from "../api/user-api";
import { userInfo } from "../models/user";
import PasswordRequest from "../models/passwordRequest";
export default class UserController {
    private _userApi = new UserApi();

    public getUser(): void {
        this._userApi.get().then(
            (x: XMLHttpRequest)=> {
                if (x.status === 200) {
                const user = JSON.parse(x.response);
                store.set('user', user)
                }
            }
        );
    }

    public saveUserProfile(data: userInfo): void {
        this._userApi.put(data).then(
            ()=> store.set('user', data)
        );
    }

    public changeUserPassword(data: PasswordRequest): void {
        this._userApi.changePassword(data).then(
            (x: XMLHttpRequest)=>console.log(x.response)
        );
    }

    public changeAvatar(data: FormData): void {
        this._userApi.changeAvatar(data).then(
            (x:XMLHttpRequest) => {
                if (x.status === 200) {
                    const user = (<userInfo>x.response);
                    store.set("user", user);
                }
            }
        );
    }
}
