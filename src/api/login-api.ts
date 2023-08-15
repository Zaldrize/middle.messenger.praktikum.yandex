import { HTTPTransport, Options } from "../modules/fetch";
import { BaseAPI, baseUrl } from "./base-api";

const loginApiInstance = new HTTPTransport();

export class LoginApi extends BaseAPI {
    create(args: object) {
        return loginApiInstance.post(`${baseUrl}/auth/signup`, 
        {
            data: args,
            timeout: 5200,
            headers: {}
        } as Options);
    }

    login(args: object) {
        return loginApiInstance.post(`${baseUrl}/auth/signin`, {
            data: args,
            timeout: 2000,
            headers: {}
        });
    }

    get() {
        return loginApiInstance.post(`${baseUrl}/auth/user`, {
            data: {},
            timeout: 200,
            headers: {}
        });
    }

    logout() {
        return loginApiInstance.post(`${baseUrl}/auth/logout`,
         {data: {}, headers: {}, timeout: 300} as Options);
    }
}
