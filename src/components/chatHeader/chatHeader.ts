import ChatHeaderProps from "./types"
import "./chatHeader.less"
import chatHeader from "./chatHeader.hbs"
import Block from "../block/block"
import Button from "../button/button";
import AddUsersDialog from "../dialogs/addUsersDialog/addUsersDialog";

export default class ChatHeaderComponent extends Block<ChatHeaderProps> {
    constructor(){
        const props = new ChatHeaderProps();
        props.chatName = '';
        props.addUsersButton = new Button('div', {
            text: 'Add users...',
            events: {
                'click': ()=>this.openDialog()
            }
        });
        props.addUsersDialog = new AddUsersDialog();
        super('div', props);
    }
    openDialog() {
        this._children.addUsersDialog.show();
    }

    render() {
        return this.compile(chatHeader);
    }

    componentDidUpdate(newProps: ChatHeaderProps): boolean {
        return this._props.chatName !== newProps.chatName;
    }
}
