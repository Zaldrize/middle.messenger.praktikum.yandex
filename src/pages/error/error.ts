import Block from '../../components/block/block';
import error from './error.hbs'
import './error.less'
import { ErrorPageProps } from './types';

export default class ErrorPage extends Block<ErrorPageProps> {
    constructor(status: number, text: string) {
        let props = new ErrorPageProps();
        props.status = status;
        props.text = text;
        props.attributes = {
            class: 'div_center error_container'
        };
        super('div', props);
    }
    render() {
        return this.compile(error);
    }
}
