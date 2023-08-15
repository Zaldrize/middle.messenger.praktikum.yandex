import LoginRequest from "../models/loginRequest";
import { LoginApi } from "../api/login-api";
import { fullUserInfo } from "../models/user";

export default class LoginController {
    private _loginApi = new LoginApi();

    public login(request: LoginRequest): Promise<boolean> {
        return this._loginApi.login(request).then(
            (x: XMLHttpRequest) => {
                if (x.status === 200) {
                    return true;
                }
                return false;
            },
        );
    }

    public createUser(request: fullUserInfo): Promise<boolean> {
        return this._loginApi.create(request)
            .then(
                (x: XMLHttpRequest)=>
                {
                    if (x.status === 201) {
                        console.log((<{id: Number}>x.response).id)
                        return true;
                    }
                    return false;
                });
    }
}
