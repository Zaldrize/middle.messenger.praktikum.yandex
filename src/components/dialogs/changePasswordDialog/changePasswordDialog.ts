import ChangePasswordDialogProps from "./types";
import changePasswordDialog from "./changePasswordDialog.hbs"
import GetModelFromFormData from "../../../utils/getModelFromFormData"
import PasswordRequest from "../../../models/passwordRequest";
import UserController from "../../../controllers/userController";
import Button from "../../button";
import Input from "../../input";
import DialogBlock from "../dialogBlock/dialogBlock";

export default class ChangePasswordDialog extends DialogBlock<ChangePasswordDialogProps> {
    private _controller: UserController;
    constructor() {
        const props = new ChangePasswordDialogProps();
        props.oldPassword = new Input('div', {
            label: 'Cтарый пароль',
            value: '',
            events: {},
            attributes:{
                type: 'text',
                name: 'oldPassword'
            }
        });
        props.newPassword = new Input('div', {
            label: 'Новый пароль',
            value: '',
            events: {},
            attributes:{
                type: 'text',
                name: 'oldPassword'
            }
        });
        props.okButton = new Button('div', {
            text: 'Ok',
            events: {
                'click': ()=>this.changePassword()
            },
            attributes: {}
        });
        props.cancelButton = new Button('div', {
            text: 'Отмена',
            events: {},
            attributes: {}
        });
        super(props);
        this._controller = new UserController();
    }
    changePassword() {
        const form = this._element.querySelector('form') as HTMLFormElement;
        const passwordRequest = GetModelFromFormData<PasswordRequest>(new FormData(form));
        this._controller.changeUserPassword(passwordRequest);
        
    }

    render() {
        return this.compile(changePasswordDialog);
    }
}
