import Block from '../../components/block/block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import { EmailValidator } from '../../validators/emailValidator'
import { LoginValidator } from '../../validators/loginValidator'
import { NameValidator } from '../../validators/nameValidator'
import { PhoneValidator } from '../../validators/phoneValidator'
import { PasswordValidator } from '../../validators/passwordValidator'
import IValidator from '../../validators/validator'
import profile from './profile.hbs'
import './profile.less'
import { ProfilePageProps } from './types'

export default class ProfilePage extends Block<ProfilePageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
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
                    this.validate(e, this._emailValidator);
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
                    this.validate(e, this._loginValidator);
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
                    this.validate(e, this._nameValidator);
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
                    this.validate(e, this._nameValidator);
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
                    this.validate(e, this._phoneValidator);
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
                    this.validate(e, this._passwordValidator);
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
        super('div', props);
    }
    render() {
        return this.compile(profile);
    }

    validate(e:FocusEvent, validator: IValidator) {
        const target = e.target;
        const t = target as HTMLInputElement;
        if (!validator.isValid(t.value)) {
            console.log(validator.getMessage());
            t.setCustomValidity(validator.getMessage());
        }
        else {
            t.setCustomValidity('');
        }
        t.reportValidity();
    }
    submit(event: MouseEvent) {
        event.preventDefault();
        let form = <HTMLFormElement>this._element.querySelector('form');
        let data = new FormData(form);
        for (var pair of data.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
        event.stopPropagation();
    }
}
