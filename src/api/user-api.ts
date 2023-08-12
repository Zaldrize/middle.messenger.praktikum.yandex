
import { HTTPTransport } from "../fetch/fetch";
import { BaseAPI, baseUrl } from "./base-api";

export type userInfo = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    phone: string,
    email: string
  };

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
