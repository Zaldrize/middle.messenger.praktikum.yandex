import AddChatDialog from "../dialogs/addChatDialog/addChatDialog";
import { IBlockProps } from "../block/types";
import Button from "../button";
import ChatItemComponent from "../chat/chat";

export class ChatFeedProps implements IBlockProps {
    addChatButton: Button;
    addChatDialog: AddChatDialog;
    chatComponents: ChatItemComponent[]
}
