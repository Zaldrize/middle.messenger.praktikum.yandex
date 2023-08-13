import Block from "../block/block";
import { IBlockProps } from "../block/types";

export default class DialogBlock<T extends IBlockProps> extends Block<T> {
    constructor(propsAndChildren: T) {
        super('dialog', propsAndChildren);
    }

    show(): void {
        (this._element as HTMLDialogElement).showModal();
    }

    hide(): void {
        (this._element as HTMLDialogElement).close();
    }
}
