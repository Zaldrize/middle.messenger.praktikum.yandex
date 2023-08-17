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
            console.log('Получены данные', event.data);
          });
          
          this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
          });        
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
        console.log(r);
        return r;
    }
}
