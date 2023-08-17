import Block from "../block/block";
import ImageProps from "./types";
import image from "./img.hbs"

export default class Image extends Block<ImageProps> {
    constructor(props: ImageProps)
    {
        super('div', props);
    }

    render() {
        return this.compile(image);
    }

    // addAttributes() {
    //     this._attributes && Object.keys(this._attributes).forEach((key) => {
    //         this._element.querySelector('img')
    //         ?.setAttribute(key, this._attributes[key].toString());
    //     });
    // }

    // addEvents(): void {
    //     if (this._events) {
    //         Object.keys(this._events).forEach(eventName => {
    //           this._element.querySelector('img')
    //           ?.addEventListener(eventName, this._events[eventName]);
    //         });
    //       }
    // }

    // removeEvents(): void {
    //     if (this._events) {
    //         Object.keys(this._events).forEach(eventName => {
    //           this._element.querySelector('img')
    //           ?.removeEventListener(eventName, this._events[eventName]);
    //         });
    //       }
    // }
    
}
