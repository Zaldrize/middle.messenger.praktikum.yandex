import store from "../modules/store";
import { UserApi } from "../api/user-api";
import { userInfo } from "../models/user";
import PasswordRequest from "../models/passwordRequest";
export default class UserController {
    private _userApi = new UserApi();

    public getUser(): Promise<boolean> {
        return this._userApi.get().then(
            (x: XMLHttpRequest)=> {
                if (x.status === 200) {
                    const user = JSON.parse(x.response);
                    store.set('user', user)
                    return true;
                }
                return false;
            }
        ).catch((reason: any) => {
            console.log('Could not get user');
            console.log(reason);
            return false;
        });
    }

    public saveUserProfile(data: userInfo): void {
        this._userApi.put(data).then(
            ()=> store.set('user', data)
        ).catch((reason: any) => {
            console.log('Could not save user profile');
            console.log(reason);
            return false;
        });
    }

    public changeUserPassword(data: PasswordRequest): void {
        this._userApi.changePassword(data).then(
            (x: XMLHttpRequest)=>console.log(x.response)
        ).catch((reason: any) => {
            console.log('Could not change password');
            console.log(reason);
            return false;
        });
    }

    public changeAvatar(data: FormData): void {
        this._userApi.changeAvatar(data).then(
            (x:XMLHttpRequest) => {
                if (x.status === 200) {
                    const user = (<userInfo>JSON.parse(x.response));
                    store.set("user", user);
                }
            }
        ).catch((reason: any) => {
            console.log('Could not change avatar');
            console.log(reason);
            return false;
        });
    }

    public search(searchString: string): void {
        this._userApi.search(searchString).then(
            (x:XMLHttpRequest) => {
                if (x.status === 200) {
                    const users = (<userInfo[]>x.response);
                    store.set("userSearchResult", users);
                }
            }
        ).catch((reason: any) => {
            console.log('Could not find users by login');
            console.log(reason);
            return false;
        });
    }
}
