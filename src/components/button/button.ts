import Block from "../block"
import button from './button.hbs'

type ButtonProps = {
    "text": string;
}

export class Button extends Block<ButtonProps>{
    render() {
        return this.compile(button, {...this._props});
    }

    componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
        return oldProps.text !== newProps.text;
    }
}