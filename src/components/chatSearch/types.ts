import { userInfo } from "../../api/user-api";
import { IBlockEvents, IBlockProps } from "../block/types";

export class ChatSearchProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    users: userInfo[]
}
