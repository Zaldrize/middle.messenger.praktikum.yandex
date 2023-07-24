import Block from "../block"
import button from './button.hbs'
import { ButtonProps } from "./types";
import './button.less';

export default class Button extends Block<ButtonProps>{
    render() {
        return this.compile(button, {...this._props});
    }

    componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
        return oldProps.text !== newProps.text;
    }
}