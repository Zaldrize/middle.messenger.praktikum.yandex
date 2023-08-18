import { IBlockEvents, IBlockProps } from "../block/types";

export default class ChatItemProps implements IBlockProps
{
    chatAvatar: string;
    chatName: string;
    lastMessageSender: string;
    lastMessageText: string;
    chatId: number;
    events?: {} | IBlockEvents | undefined;
}
