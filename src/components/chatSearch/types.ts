import { userInfo } from "../../models/user";
import { IBlockEvents, IBlockProps } from "../block/types";

export class ChatSearchProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    users: userInfo[]
}
