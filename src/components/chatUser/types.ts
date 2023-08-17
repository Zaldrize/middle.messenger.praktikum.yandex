import { IBlockProps } from "../block/types";
import Button from "../button";

export default class ChatUserComponentProps implements IBlockProps {
    displayName: string;
    firstName: string;
    secondName: string;
    avatar: string;
    login: string;
    removeButton: Button;
}
