import { IBlockProps } from "../block/types";
import MessageComponent from "../message/message";

export class MessageHistoryProps implements IBlockProps {
    messages: MessageComponent[]
}
