import Block from "../block/block"
import button from './button.hbs'
import { ButtonProps } from "./types";
import './button.less';

export default class Button extends Block<ButtonProps>{
    render() {
        return this.compile(button);
    }

    componentDidUpdate( newProps: ButtonProps): boolean {
        return this._props.text !== newProps.text;
    }
}