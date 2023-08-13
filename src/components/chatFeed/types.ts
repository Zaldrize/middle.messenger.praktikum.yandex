import AddChatDialog from "../addChatDialog/addChatDialog";
import { IBlockProps } from "../block/types";
import Button from "../button";

export class ChatFeedProps implements IBlockProps {
    addChatButton: Button;
    addChatDialog: AddChatDialog;
}
