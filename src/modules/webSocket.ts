import Message from "../models/message";
import { userInfo } from "../models/user";
import last from "../utils/last";
import store, { StoreEvents } from "./store";

export default class MessageWebSocket {
    private socket: WebSocket;
    constructor(chatId: number, userId:number, token: string) {
        this.socket = 
        new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');         
        
          });
          
          this.socket.addEventListener('close', event => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
          
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });
          
          this.socket.addEventListener('message', event => {
            try {
                const data = JSON.parse(event.data);

                if (data && data.type !== "error" 
                && data.type !== "pong" && data.type !== "user connected") {
                    this.workMessage(data);
                }
            } catch (error) {
                console.log(error);
            }
          });
          
          this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
          });        
    }
  private workMessage(data: any) {
    const messages = store.getState().messages ?? [];
    if (Array.isArray(data)) {
      data.sort((m1: Message, m2: Message) => {
        if (m1.time > m2.time)
          return 1;
        if (m1.time < m2.time)
          return -1;
        return 0;
      });
      store.getState().messages = [...messages, ...data];
    }
    else {
      store.getState().messages = [...messages, data];
    }
    const lastMessage = last(store.getState().messages) as Message;    
    const chatUsers = store.getState()["chatUsers"] as Array<userInfo>;
    store.getState().currentChat.last_message = {
      user: chatUsers.find(x=>x.id===lastMessage.user_id),
      time: lastMessage.time,
      content: lastMessage.content
    }
    store.emit(StoreEvents.Updated);
  }

    sendMessage(message: string) {
        this.socket.send(
            JSON.stringify({
                content: message,
                type: "message",
            })
        );
    }
    getOldMessages() {
        console.log('Получение старых сообщений');
        const r = this.socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
          })); 
        return r;
    }
}
