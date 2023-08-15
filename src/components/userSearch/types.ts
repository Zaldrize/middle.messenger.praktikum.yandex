import { userInfo } from "../../models/user";
import { IBlockEvents, IBlockProps } from "../block/types";

export class UserSearchProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    users: userInfo[]
}
