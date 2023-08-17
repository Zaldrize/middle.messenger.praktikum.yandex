import addUsersDialog from "./addUsersDialog.hbs"
import DialogBlock from "../dialogBlock/dialogBlock";
import Button from "../../button";
import './addUsersDialog.less'
import UserSearch from "../../userSearch";
import AddUsersDialogProps from "./types";
import store from "../../../modules/store";
import ChatController from "../../../controllers/chatController";

export default class AddUsersDialog extends DialogBlock<AddUsersDialogProps> {
    private chatController = new ChatController();
    constructor() {
        const props = new AddUsersDialogProps();
        props.okButton = new Button('div', {
            text: 'OK',
            events: {
                'click': () => this.addUsers()
            }
        });
        props.cancelButton = new Button('div', {
            text: 'Cancel',
            events: {
                'click': () => this.cancel()
            }
        });
        props.userSearch = new UserSearch();
        super(props);
    }
    cancel() {
        throw new Error("Method not implemented.");
    }
    addUsers() {
        const state = store.getState();
        const users = state["newUsers"];
        this.chatController.addUsers(users, state["currentChatId"]).then(
            () => {
                delete state["newUsers"];
                this._children.userSearch.setProps({});
            }
        );
    }

    render() {
        const r = this.compile(addUsersDialog);
        return r;
    }
}
