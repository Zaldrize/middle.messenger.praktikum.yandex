import { IBlockEvents, IBlockProps } from "../block/types";
import Input from "../input/input";
import UserComponent from "../user/user";

export class UserSearchProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    userComponents: UserComponent[]
    search: Input;
}
