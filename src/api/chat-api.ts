import AddUsersRequest from "../models/addUsersRequest";
import ChatItem from "../models/chatItem";
import { HTTPTransport } from "../modules/fetch";
import { BaseAPI, baseUrl } from "./base-api";

const chatApiInstance = new HTTPTransport();

export class ChatApi extends BaseAPI {

    get(): Promise<ChatItem[]> {
        return chatApiInstance.get(`${baseUrl}/chats`, {
            data: {},
            timeout: 2000,
            headers: {}
        }).then(
            (x:XMLHttpRequest) => {
                if (x.status === 200)
                {
                    return <ChatItem[]>(JSON.parse(x.response));
                }
                return [];
            }
        );
    }

    createChat(chatName: string) {
        return chatApiInstance.post(`${baseUrl}/chats`, {
            data: {title: chatName},
            timeout: 500,
            headers: {}
        })
    }

    addUsers(request: AddUsersRequest) {
        return chatApiInstance.put(`${baseUrl}/chats/users`, {
            data: request,
            timeout: 2000,
            headers: {}
        });
    }
}
