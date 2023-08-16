import { userInfo } from "../../models/user";
import Block from "../block/block";
import UserComponentProps from "./types";
import user from "./user.hbs"
import "./user.less"
import { resourceUrl } from "../../api/base-api";
import defaultUserPic from "../../../static/defaultUserPic.svg"
import Button from "../button/button";

export default class UserComponent extends Block<UserComponentProps>
{
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
    }
    addUser(e: MouseEvent) {
        e.preventDefault();
        this._children.addButton.setProps({text: 'Added!'});
    }
    render() {
        return this.compile(user);
    }
}
