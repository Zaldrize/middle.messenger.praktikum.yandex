
import PasswordRequest from "../models/passwordRequest";
import { userInfo } from "../models/user";
import { HTTPTransport } from "../modules/fetch";
import { BaseAPI, baseUrl } from "./base-api";

  const userApiInstance = new HTTPTransport();


  export class UserApi extends BaseAPI {
    get() {
        return userApiInstance.get(`${baseUrl}/auth/user`, {
            data: null,
            timeout: 200,
            headers: {}
        });
    }
    put(data: userInfo) {
        return userApiInstance.put(`${baseUrl}/user/profile`, {
            data: data,
            timeout: 200,
             headers: {}
        });
    }
    search(input: string) {
        return userApiInstance.post(`${baseUrl}/user/search`, {
            data: {login: input},
            timeout: 2000,
            headers: {}
        })
    }
    changePassword(data: PasswordRequest) {
        return userApiInstance.put(`${baseUrl}/user/password`, {
            data: data,
            timeout: 200,
            headers: {}
        });
    }

    changeAvatar(data: FormData) {
        return userApiInstance.put(`${baseUrl}/user/profile/avatar`, {
            data: data,
            timeout: 3000,
            headers: {}
        });
    }
}
