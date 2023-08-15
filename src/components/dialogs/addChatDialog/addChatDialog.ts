import AddChatDialogProps from "./types";
import addChatDialog from "./addChatDialog.hbs"
import DialogBlock from "../dialogBlock/dialogBlock";
import Button from "../../button/button";
import Input from "../../input/input";
import './addChatDialog.less'

export default class AddChatDialog extends DialogBlock<AddChatDialogProps> {
    constructor() {
        const props = new AddChatDialogProps();
        props.okButton = new Button('div', {
            text: 'OK'
        });
        props.cancelButton = new Button('div', {
            text: 'Cancel'
        });
        props.chatNameInput = new Input('div', {
            label: 'Chat name',
            events: {},
            value: '',
             attributes: {}
        });
        super(props);
    }

    render() {
        const r = this.compile(addChatDialog);
        return r;
    }
}
