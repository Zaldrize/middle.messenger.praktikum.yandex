import { IBlockProps } from "../../block/types";
import Button from "../../button";
import Input from "../../input";

export default class ChangeAvatarDialogProps implements IBlockProps
{
    avatarInput: Input;
    submitButton: Button;
    cancelButton: Button;
    src: string;
}
