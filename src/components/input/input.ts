import Block from "../block/block";
import { InputProps } from "./types";
import input from './input.hbs'

export default class Input extends Block<InputProps> {
    render() {
        return this.compile(input);
    }
    componentDidUpdate(newProps: Record<string, any>): boolean {
        return this._props.label !== newProps.label ||
        this._attributes.labelClass !== newProps.attributes.labelClass ||
        this._attributes.inputClass !== newProps.attributes.inputClass ||
        this._attributes.type !== newProps.attributes.type
    }
}