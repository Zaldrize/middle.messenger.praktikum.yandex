import { IBlockProps } from "../../block/types";
import Button from "../../button";
import Input from "../../input";
export default class AddChatDialogProps implements IBlockProps {
    okButton: Button;
    cancelButton: Button;
    chatNameInput: Input;
    
}
