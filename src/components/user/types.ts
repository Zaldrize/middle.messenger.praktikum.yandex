import { IBlockProps } from "../block/types";
import Button from "../button";

export default class UserComponentProps implements IBlockProps {
    displayName: string;
    firstName: string;
    secondName: string;
    avatar: string;
    login: string;
    addButton: Button;
}
