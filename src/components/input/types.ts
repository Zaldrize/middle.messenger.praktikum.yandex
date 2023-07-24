import { IBlockEvents, IBlockProps } from "../block/types";

export class InputProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
        labelClass: string;
        inputClass: string;
        type: string;
    };
    label: string;
}