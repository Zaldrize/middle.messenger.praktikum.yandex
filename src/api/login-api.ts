import { HTTPTransport, Options } from "../fetch/fetch";
import { BaseAPI, baseUrl } from "./base-api";
type Response = {
    id: number,
    reason: string
};
const loginApiInstance = new HTTPTransport<Response>();

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
            timeout: 200,
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
