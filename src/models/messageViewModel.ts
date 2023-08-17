export default class MessageViewModel {
    constructor(text: string, sender: string) {
        this.sender = sender;
        this.text = text;
    }
    text: string;
    sender: string;
}
