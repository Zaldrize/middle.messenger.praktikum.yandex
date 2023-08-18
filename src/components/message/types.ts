import { IBlockProps } from "../block/types";

export default class MessageProps implements IBlockProps {
    sender: string;
    text: string;
    constructor(sender: string, text:string) {
        this.sender = sender;
        this.text = text;
    }
}
