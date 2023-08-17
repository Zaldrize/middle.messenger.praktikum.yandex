import { IBlockEvents, IBlockProps } from "../block/types";

export default class ChatItemProps implements IBlockProps
{
    chatName: string;
    lastMessageSender: string;
    lastMessageText: string;
    chatId: number;
    events?: {} | IBlockEvents | undefined;
}
