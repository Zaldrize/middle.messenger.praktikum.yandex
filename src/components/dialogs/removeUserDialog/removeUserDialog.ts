
import ChatController from '../../../controllers/chatController';
import { userInfo } from '../../../models/user';
import store, { StoreEvents } from '../../../modules/store';
import Button from '../../button';
import ChatUserComponent from '../../chatUser/chatUser';
import DialogBlock from '../dialogBlock/dialogBlock';
import userSearch from './removeUserDialog.hbs';
import "./removeUserDialog.less";
import { RemoveUserDialogProps } from './types';

export default class RemoveUserDialog extends DialogBlock<RemoveUserDialogProps> {
    private chatController = new ChatController();
    constructor(){
        const props = new RemoveUserDialogProps();
        props.userComponents = [];
        props.okButton = new Button('div', {
            text: 'OK',
            events: {
                'click': () => this.removeUsers()
            }
        });
        props.cancelButton = new Button('div', {
            text: 'Cancel',
            events: {
                'click': () => this.cancel()
            }
        });
        store.on(StoreEvents.Updated, () => this.updateUsers());

        super(props);
    }
    updateUsers(): void {
        const result = store.getState()["chatUsers"] as userInfo[];
        if (result) {
        const components = result.map(u => new ChatUserComponent(u));
        this.setProps({ userComponents: components} as RemoveUserDialogProps);
        }    
    }
    cancel() {
        const state = store.getState();
        delete state["removedUsers"];
    }
    removeUsers() {
        const state = store.getState();
        const users = state["removedUsers"];
        this.chatController.removeUsers(users, state["currentChatId"]).then(
            () => {
                delete state["removedUsers"];
            }
        );
    }

    render() {
        return this.compile(userSearch);
    }

}
