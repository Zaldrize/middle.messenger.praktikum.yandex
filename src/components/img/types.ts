import { IBlockEvents, IBlockProps } from "../block/types";

export default class ImageProps implements IBlockProps {
    src: any;
    attributes?: Record<string, string | number | boolean> | undefined;
    events?: {} | IBlockEvents | undefined;
}
