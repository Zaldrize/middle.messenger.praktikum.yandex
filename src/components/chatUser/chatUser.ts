import { userInfo } from "../../models/user";
import Block from "../block/block";
import user from "./chatUser.hbs"
import "./chatUser.less"
import { resourceUrl } from "../../api/base-api";
import defaultUserPic from "../../../static/defaultUserPic.svg"
import Button from "../button/button";
import store from "../../modules/store";
import ChatUserComponentProps from "./types";

export default class ChatUserComponent extends Block<ChatUserComponentProps>
{
    private userId: number;
    constructor(user: userInfo) {
        const props = new ChatUserComponentProps();
        props.displayName = user.display_name;
        props.firstName = user.first_name;
        props.secondName = user.second_name
        props.login = user.login;
        props.avatar = user.avatar ? `${resourceUrl}/${user.avatar}` : defaultUserPic;
        props.removeButton = new Button('div', {
            text: 'Remove',
            events: {
                'click': (e:MouseEvent) => this.removeUser(e)
            }
        });
        super('div', props);
        this.userId = user.id;
    }
    removeUser(e: MouseEvent) {
        e.preventDefault();
        const state = store.getState();
        if (!state["removedUsers"]) {
            state["removedUsers"] = [];
        }
        state["removedUsers"].push(this.userId);
        this._children.removeButton.setProps({text: 'Removed!'});
    }
    render() {
        return this.compile(user);
    }
}
