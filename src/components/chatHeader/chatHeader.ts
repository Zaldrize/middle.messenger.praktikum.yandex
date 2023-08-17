import ChatHeaderProps from "./types"
import "./chatHeader.less"
import chatHeader from "./chatHeader.hbs"
import Block from "../block/block"
import Button from "../button/button";
import AddUsersDialog from "../dialogs/addUsersDialog/addUsersDialog";
import RemoveUserDialog from "../dialogs/removeUserDialog/removeUserDialog";

export default class ChatHeaderComponent extends Block<ChatHeaderProps> {
    constructor(){
        const props = new ChatHeaderProps();
        props.chatName = '';
        props.addUsersButton = new Button('div', {
            text: 'Add users...',
            events: {
                'click': ()=>this.openAddUsersDialog()
            }
        });
        props.addUsersDialog = new AddUsersDialog();
        props.removeUsersDialog = new RemoveUserDialog();
        props.removeUsersButton= new Button('div', {
            text: 'Remove users...',
            events: {
                'click': ()=>this.openRemoveUsersDialog()
            }
        });
        super('div', props);
    }
    openRemoveUsersDialog() {
        this._children.removeUsersDialog.show();
    }
    openAddUsersDialog() {
        this._children.addUsersDialog.show();
    }

    render() {
        return this.compile(chatHeader);
    }

    componentDidUpdate(newProps: ChatHeaderProps): boolean {
        return this._props.chatName !== newProps.chatName;
    }
}
