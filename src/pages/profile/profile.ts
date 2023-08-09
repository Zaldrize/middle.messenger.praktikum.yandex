import Block from '../../components/block/block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import { EmailValidator } from '../../validators/emailValidator'
import { LoginValidator } from '../../validators/loginValidator'
import { NameValidator } from '../../validators/nameValidator'
import { PhoneValidator } from '../../validators/phoneValidator'
import { PasswordValidator } from '../../validators/passwordValidator'
import profile from './profile.hbs'
import './profile.less'
import { ProfilePageProps } from './types'
import {ProfileValidator, userData, validate } from '../../validators/aggregateValidator'
import { NotEmptyValidator } from '../../validators/notEmptyValidator'
import { LoginApi } from '../../api/login-api'

export default class ProfilePage extends Block<ProfilePageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
    _notEmptyValidator = new NotEmptyValidator();
    constructor() {
        const props = new ProfilePageProps();
        props.attributes = {
            class: 'div-center'
        }
        props.emailInput = new Input('div', {
            label: 'Email',
            attributes: {
                type: 'text',
                name: 'email',
                value: 'litvinova@mail.ru'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._emailValidator);
                }
            }
        });
        props.loginInput = new Input('div', {
            label: 'Login',
            attributes: {
                type: 'text',
                name: 'login',
                value: 'zaldrize_azula'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._loginValidator);
                }
            }
        });
        props.firstNameInput = new Input('div', {
            label: 'First name',
            attributes: {
                type: 'text',
                name: 'first_name',
                value: 'Galina',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.secondNameInput = new Input('div', {
            label: 'Second name',
            attributes: {
                type: 'text',
                name: 'second_name',
                value: 'Litvinova'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.displayNameInput = new Input('div', {
            label: 'Display name',
            attributes: {
                type: 'text',
                name: 'display_name',
                value: 'Galina Litvinova'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._notEmptyValidator);
                }
            }
        });
        props.phoneInput = new Input('div', {
            label: 'Phone',
            attributes: {
                type: 'text',
                name: 'phone',
                value:'+79851309855'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._phoneValidator);
                }
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Password',
            attributes: {
                type: 'password',
                name: 'password',
                value: 'Valar1morghulis'
            },
            events: {
                'blur': (e) => {
                    validate(e, this._passwordValidator);
                }
            }
        });

        props.saveButton = new Button('div', {
            text: 'Сохранить данные',
            events: {
                'click': (event: MouseEvent) => this.submit(event)
            }
        });

        props.cancelButton = new Button('div', {
            text: 'Назад'
        });

        props.logOutButton = new Button('div', {
            text: 'Выйти',
            events: {
                'click': (event: MouseEvent) => this.exit(event)
            }
        })
        super('div', props);
    }
    render() {
        return this.compile(profile);
    }
    submit(event: MouseEvent) {
        event.preventDefault();
        const validator = new ProfileValidator();
        let form = <HTMLFormElement>this._element.querySelector('form');
        let formData = new FormData(form);
        let data: Record<string, string> = {};
        for (var pair of formData.entries()) {
            data[pair[0]] = pair[1].toString();
          }
        const userData = data as userData;
        if (validator.isValid(userData)) {
            console.log(data);
        }
        else {
            alert(validator.getMessage());
        }
        event.stopPropagation();
    }
    exit(event: MouseEvent) {
        event.preventDefault();
        const loginApi = new LoginApi();
        loginApi.logout().then(()=>console.log('успех'), ()=> console.log('провал'));
    }
}
