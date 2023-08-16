import { IBlockEvents, IBlockProps } from "../block/types";
import Button from "../button";
import Input from "../input";
import UserComponent from "../user/user";

export class UserSearchProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    userComponents: UserComponent[]
    search: Input;
    searchButton: Button;
}
