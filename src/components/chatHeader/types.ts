import Button from "../button";
import AddUsersDialog from "../dialogs/addUsersDialog/addUsersDialog";
import RemoveUserDialog from "../dialogs/removeUserDialog/removeUserDialog";

export default class ChatHeaderProps {
    chatName: string;
    addUsersButton: Button;
    addUsersDialog: AddUsersDialog;    
    removeUsersButton: Button;
    removeUsersDialog: RemoveUserDialog;
}
