
import { HTTPTransport } from "../modules/fetch";
import { BaseAPI, baseUrl } from "./base-api";

  const userApiInstance = new HTTPTransport();


  export class UserApi extends BaseAPI {
    get() {
        return userApiInstance.get(`${baseUrl}/auth/user`, {
            data: {},
            timeout: 200,
            headers: {}
        });
    }
    search(input: string) {
        return userApiInstance.post(`${baseUrl}/user/search`, {
            data: {login: input},
            timeout: 200,
            headers: {}
        })
    }
}
