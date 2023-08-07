import Block from "../block/block";
import { InputProps } from "./types";
import input from './input.hbs'
import './input.less'

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
    addAttributes() {
        this._attributes && Object.keys(this._attributes).forEach((key) => {
            this._element.querySelector('input')
            ?.setAttribute(key, this._attributes[key].toString());
        });
    }

    addEvents(): void {
        if (this._events) {
            Object.keys(this._events).forEach(eventName => {
              this._element.querySelector('input')
              ?.addEventListener(eventName, this._events[eventName]);
            });
          }
    }

    removeEvents(): void {
        if (this._events) {
            Object.keys(this._events).forEach(eventName => {
              this._element.querySelector('input')
              ?.removeEventListener(eventName, this._events[eventName]);
            });
          }
    }
}
