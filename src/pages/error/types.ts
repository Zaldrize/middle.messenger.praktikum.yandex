import { IBlockEvents, IBlockProps } from "../../components/block/types";

export class ErrorPageProps implements IBlockProps {
    status:number;
    text: string;   
    events?: IBlockEvents | {};    
    attributes?: Record<string, string|number|boolean>;
}
