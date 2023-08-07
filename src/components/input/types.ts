import { IBlockEvents, IBlockProps } from "../block/types";

export class InputProps implements IBlockProps {
    events?: IBlockEvents;
    attributes: {
    };
    label: string;
}
