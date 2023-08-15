import { IBlockProps } from "../../block/types";
import Button from "../../button";
import Input from "../../input";

export default class ChangePasswordDialogProps implements IBlockProps {
    oldPasswordInput: Input;
    newPasswordInput: Input;
    okButton: Button;
    cancelButton: Button;
}
