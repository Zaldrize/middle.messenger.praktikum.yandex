import AddChatDialogProps from "./types";
import addChatDialog from "./addChatDialog.hbs"
import DialogBlock from "../dialogBlock/dialogBlock";
import Button from "../../button";
import Input from "../../input";
import './addChatDialog.less'
import ChatController from "../../../controllers/chatController";

export default class AddChatDialog extends DialogBlock<AddChatDialogProps> {
    private chatController = new ChatController();
    constructor() {
        const props = new AddChatDialogProps();
        props.okButton = new Button('div', {
            text: 'OK',
            events: {
                'click': () => this.addNewChat()
            }
        });
        props.cancelButton = new Button('div', {
            text: 'Cancel'
        });
        props.chatNameInput = new Input('div', {
            label: '',
            events: {},
            value: '',
             attributes: {
                placeholder: 'Chat name'
             }
        });
        super(props);
    }
    addNewChat() {
        const chatName = (this._children.chatNameInput as Input)
        .element.querySelector('input')?.value;
        if (!chatName)
            return;
        this.chatController.createChat(chatName);

    }

    render() {
        const r = this.compile(addChatDialog);
        return r;
    }
}
