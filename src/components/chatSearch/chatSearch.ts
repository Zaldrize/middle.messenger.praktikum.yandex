import Block from "../block/block";
import { ChatSearchProps } from "./types";
import chatSearch from './chatSearch.hbs'
import isEqual from "../../utils/isEqual";

export default class ChatSearch extends Block<ChatSearchProps> {
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

    
    render() {
        return this.compile(chatSearch);
    }
    componentDidUpdate(newProps: Record<string, any>): boolean {
        if (!newProps)
            return false;
        return !isEqual(this._props.users, newProps.users);
    }

}
