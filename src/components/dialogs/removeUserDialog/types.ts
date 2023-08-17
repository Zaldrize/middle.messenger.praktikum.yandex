import { IBlockProps, IBlockEvents } from "../../block/types";
import Button from "../../button";
import ChatUserComponent from "../../chatUser/chatUser";


export class RemoveUserDialogProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    userComponents: ChatUserComponent[]
    okButton: Button;
    cancelButton: Button;
}
