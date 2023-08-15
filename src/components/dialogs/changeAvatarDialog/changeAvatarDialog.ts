import Button from "../../button/button";
import Input from "../../input/input";
import DialogBlock from "../dialogBlock/dialogBlock";
import ChangeAvatarDialogProps from "./types";
import changeAvatarDialog from "./changeAvatarDialog.hbs"
import "./changeAvatarDialog.less"

export default class ChangeAvatarDialog extends DialogBlock<ChangeAvatarDialogProps> {
    constructor()
    {
        const props = new ChangeAvatarDialogProps();
        props.avatarInput = new Input('div',
        {
            label: '',
            value: '',
            events: {
                'change': (e:Event) => this.imageChanged(e)
            },
            attributes: {
                type: 'file',
                accept: 'image/*'
            }
        });

        props.cancelButton = new Button('div', {
            text: 'Отмена'
        });
        props.submitButton = new Button('div', {
            text: 'ОК'
        });
        super(props);
    }
    imageChanged(e: Event): void {
        e.preventDefault();
        
        const files = (e.target as HTMLInputElement).files;
        if (files) {
            const file = files[0];
            if (file) {
                const image = this._element.querySelector('img');
                (image as HTMLImageElement).src = URL.createObjectURL(file);
            }
        }
        
    }

    render() {
        return this.compile(changeAvatarDialog);
    }
}
