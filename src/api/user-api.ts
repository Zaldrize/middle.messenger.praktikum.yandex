
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

  const loginApiInstance = new HTTPTransport<userInfo>();


  export class UserApi extends BaseAPI {
    get() {
        return loginApiInstance.get(`${baseUrl}/auth/user`, {
            data: {},
            timeout: 200,
            headers: {}
        });
    }
}
