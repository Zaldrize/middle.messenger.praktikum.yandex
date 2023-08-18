import { userInfo } from "../../models/user";
import store from "../../modules/store";
import { IBlockProps } from "../block/types";

export default class MessageProps implements IBlockProps {
    sender: string;
    text: string;
    attributes?: Record<string, string | number | boolean> | undefined;
    constructor(sender: string, text: string) {
        this.sender = sender;
        this.text = text;
        const user = store.getState().user as userInfo;
        this.attributes = {
            class: sender === user.display_name ? 'message-mine' : 'message-theirs'
        }

    }
}
