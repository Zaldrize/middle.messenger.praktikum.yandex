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
import {ProfileValidator, validate } from '../../validators/aggregateValidator'
import { NotEmptyValidator } from '../../validators/notEmptyValidator'
import { LoginApi } from '../../api/login-api'
import isEqual from '../../utils/isEqual'
import UserController from './userController'
import store, { StoreEvents } from '../../modules/store'
import { Router } from '../../routing/router'
import { fullUserInfo } from '../../models/user'

export default class ProfilePage extends Block<ProfilePageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
    _notEmptyValidator = new NotEmptyValidator();
    constructor() {
        const props = new ProfilePageProps();
        props.userData = {
            first_name: '',
            second_name: '',
            login: '',
            id: 0,
            avatar: '',
            display_name: '',
            email: '',
            phone: ''
        };
        const controlller = new UserController();
        controlller.getUser();
        store.on(StoreEvents.Updated, () => this.updateUserData());
        props.attributes = {
            class: 'profile-container'
        }

        props.avatarInput = new Input('div', {
            label:'',
            value: '',
            attributes: {
                type: 'file'
            }
        });
        props.emailInput = new Input('div', {
            label: 'Email',
            value: props.userData.email,
            attributes: {
                type: 'text',
                name: 'email',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._emailValidator);
                }
            }
        });
        props.loginInput = new Input('div', {
            label: 'Login',
            value: props.userData.login,
            attributes: {
                type: 'text',
                name: 'login',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._loginValidator);
                }
            }
        });
        props.firstNameInput = new Input('div', {
            label: 'First name',
            value: props.userData.first_name,
            attributes: {
                type: 'text',
                name: 'first_name',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.secondNameInput = new Input('div', {
            label: 'Second name',
            value: props.userData.second_name,
            attributes: {
                type: 'text',
                name: 'second_name',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._nameValidator);
                }
            }
        });
        props.displayNameInput = new Input('div', {
            label: 'Display name',
            value: props.userData.display_name,
            attributes: {
                type: 'text',
                name: 'display_name',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._notEmptyValidator);
                }
            }
        });
        props.phoneInput = new Input('div', {
            label: 'Phone',
            value: props.userData.phone,
            attributes: {
                type: 'text',
                name: 'phone',
            },
            events: {
                'blur': (e) => {
                    validate(e, this._phoneValidator);
                }
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Password',
            value: 'password',
            attributes: {
                type: 'password',
                name: 'password',
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
            text: 'Назад',
            events: {
                'click': () => Router.getInstance().back()
            }
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
    componentDidUpdate(newProps: ProfilePageProps): boolean {
        return !isEqual(this._props.userData, newProps.userData);
    }
    cancel(event: MouseEvent) {
        event.preventDefault();
        Router.getInstance().back();
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
        const userData = data as unknown as fullUserInfo;
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
        loginApi.logout().then(()=>{
            Router.getInstance().go('/');
        });
    }

    updateUserData() {
        let userData = JSON.parse(store.getState()['user']);
        //this.setProps({userData: userData} as ProfilePageProps);

        this._children.loginInput.setProps({value: userData.login});
        this._children.emailInput.setProps({value: userData.email});
        this._children.phoneInput.setProps({value: userData.phone});
        this._children.displayNameInput.setProps({value: userData.display_name});
        this._children.firstNameInput.setProps({value: userData.first_name});
        this._children.secondNameInput.setProps({value: userData.second_name});

    }
}
