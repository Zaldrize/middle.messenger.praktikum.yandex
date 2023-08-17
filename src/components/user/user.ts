import { userInfo } from "../../models/user";
import Block from "../block/block";
import UserComponentProps from "./types";
import user from "./user.hbs"
import "./user.less"
import { resourceUrl } from "../../api/base-api";
import defaultUserPic from "../../../static/defaultUserPic.svg"
import Button from "../button/button";
import store from "../../modules/store";

export default class UserComponent extends Block<UserComponentProps>
{
    private userId: number;
    constructor(user: userInfo) {
        const props = new UserComponentProps();
        props.displayName = user.display_name;
        props.firstName = user.first_name;
        props.secondName = user.second_name
        props.login = user.login;
        props.avatar = user.avatar ? `${resourceUrl}/${user.avatar}` : defaultUserPic;
        props.addButton = new Button('div', {
            text: 'Add',
            events: {
                'click': (e:MouseEvent) => this.addUser(e)
            }
        });
        super('div', props);
        this.userId = user.id;
    }
    addUser(e: MouseEvent) {
        e.preventDefault();
        const state = store.getState();
        if (!state["newUsers"]) {
            state["newUsers"] = [];
        }
        state["newUsers"].push(this.userId);
        this._children.addButton.setProps({text: 'Added!'});
    }
    render() {
        return this.compile(user);
    }
}
