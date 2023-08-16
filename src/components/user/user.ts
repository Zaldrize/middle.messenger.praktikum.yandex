import { userInfo } from "../../models/user";
import Block from "../block/block";
import UserComponentProps from "./types";
import user from "./user.hbs"
import "./user.less"

export default class UserComponent extends Block<UserComponentProps>
{
    constructor(user: userInfo) {
        const props = new UserComponentProps();
        props.displayName = user.display_name;
        props.login = user.login;
        super('div', props);
    }
    render() {
        return this.compile(user);
    }
}
