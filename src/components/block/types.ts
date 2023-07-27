export type IBlockEvents = {
    [K in keyof HTMLElementEventMap]?: (event: (HTMLElementEventMap[K])) => void;
} & Record<string, any>;
export interface IBlockProps extends Record<string, any> {
    events?: IBlockEvents | {};    
    attributes?: Record<string, string|number|boolean>;
}

