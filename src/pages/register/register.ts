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
import { LoginApi } from '../../api/login-api';
import { fullUserInfo } from '../../models/user';

export default class RegisterPage extends Block<RegisterPageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
    _loginApi = new LoginApi();
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
        let formData = new FormData(form);
        const validator = new RegisterValidator();
        let data: Record<string, string> = {};
        for (var pair of formData.entries()) {
            data[pair[0]] = pair[1].toString();
          }
        const userData = data as unknown as fullUserInfo;
        if (validator.isValid(userData)) {
            console.log(data);
            this._loginApi.create(userData)
            .then((x: XMLHttpRequest)=>
            console.log((<{id: Number}>x.response).id),
            x=>console.log(x.response));
        }
        else {
            alert(validator.getMessage());
        }
        event.stopPropagation();
    }
}
