import Block from '../../components/block/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { RegisterValidator, validate } from '../../validators/aggregateValidator';
import { EmailValidator } from '../../validators/emailValidator';
import { LoginValidator } from '../../validators/loginValidator';
import { NameValidator } from '../../validators/nameValidator';
import { PasswordValidator } from '../../validators/passwordValidator';
import { PhoneValidator } from '../../validators/phoneValidator';
import register from './register.hbs';
import './register.less';
import { RegisterPageProps } from './types';
import { fullUserInfo } from '../../models/user';
import GetModelFromFormData from '../../utils/getModelFromFormData';
import LoginController from '../../controllers/loginController';
import { Router } from '../../routing/router';

export default class RegisterPage extends Block<RegisterPageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
    _loginController = new LoginController();
    constructor() {
        const props = new RegisterPageProps();
        props.attributes = {
            class: 'div-center'
        }
        props.emailInput = new Input('div', {
            label: 'Email',            
            value: '',
            attributes: {
                type: 'text',
                name: 'email'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._emailValidator);
                }
            }
        });
        props.loginInput = new Input('div', {
            label: 'Login',            
            value: '',
            attributes: {
                type: 'text',
                name: 'login'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._loginValidator);
                }
            }
        });
        props.firstNameInput = new Input('div', {
            label: 'First name',            
            value: '',
            attributes: {
                type: 'text',
                name: 'first_name'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.secondNameInput = new Input('div', {
            label: 'Second name',            
            value: '',
            attributes: {
                type: 'text',
                name: 'second_name'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.phoneInput = new Input('div', {
            label: 'Phone',            
            value: '',
            attributes: {
                type: 'text',
                name: 'phone'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._phoneValidator);
                }
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Password',            
            value: '',
            attributes: {
                type: 'password',
                name: 'password'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._passwordValidator);
                }
            }
        });
        props.saveButton = new Button('div', {
            text: 'Регистрация',
            events: {
                'click': (event: MouseEvent)=>this.submit(event)
            }
        });

        props.cancelButton = new Button('div', {
            text: 'Отмена'
        });
        super('div', props);
    }

    render() {
        return this.compile(register);
    }

    submit(event: MouseEvent) {
        event.preventDefault();
        let form = <HTMLFormElement>this._element.querySelector('form');
        const validator = new RegisterValidator();
        const userData = GetModelFromFormData<fullUserInfo>(new FormData(form));
        if (validator.isValid(userData)) {
           this._loginController.createUser(userData).then(res => {
            if (res)
            {
                Router.getInstance().go("/messenger");
            }
            
           });
        }
        else {
            alert(validator.getMessage());
        }
        event.stopPropagation();
    }
}
