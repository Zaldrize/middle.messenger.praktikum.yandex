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
import isEqual from '../../utils/isEqual'
import UserController from '../../controllers/userController'
import store, { StoreEvents } from '../../modules/store'
import { Router } from '../../routing/router'
import { userInfo } from '../../models/user'
import Image from '../../components/img/img'
import defaultUserPic from '../../../static/defaultUserPic.svg'
import ChangePasswordDialog from '../../components/dialogs/changePasswordDialog'
import GetModelFromFormData from '../../utils/getModelFromFormData'
import LoginController from '../../controllers/loginController'
import ChangeAvatarDialog from '../../components/dialogs/changeAvatarDialog/changeAvatarDialog'

export default class ProfilePage extends Block<ProfilePageProps> {
    _loginValidator = new LoginValidator();
    _emailValidator = new EmailValidator();
    _phoneValidator = new PhoneValidator();
    _nameValidator = new NameValidator();
    _passwordValidator = new PasswordValidator()
    _notEmptyValidator = new NotEmptyValidator();
    _controller: UserController;
    _loginController = new LoginController();

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
       
        store.on(StoreEvents.Updated, () => this.updateUserData());
        props.attributes = {
            class: 'profile-container'
        }

        props.avatar =  new Image({
            src: defaultUserPic,
            attributes: {
                class: 'user-pic'
            },
            events: {
                'click': (e:MouseEvent) => this.openChangeAvatarDialog(e)
            }
        });

        props.changeAvatarDialog = new ChangeAvatarDialog();

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
        props.changePasswordDialog = new ChangePasswordDialog();

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

        props.changePasswordButton = new Button('div', {
            text: 'Сменить пароль',
            events: {
                'click': (event:MouseEvent) => this.changePassword(event)
            }
        })
        super('div', props);
        this._controller = new UserController();
        this._controller.getUser();
    }
    openChangeAvatarDialog(e: MouseEvent): void {
       e.preventDefault();
       this._children.changeAvatarDialog.show();
    }
    changePassword(event: MouseEvent) {
        event.preventDefault();
        this._children.changePasswordDialog.setProps({
            newPassword:'',
            oldPassword:''
        });
        this._children.changePasswordDialog.show();
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
       
        const userData = GetModelFromFormData<userInfo>(new FormData(form));
        if (validator.isValid(userData)) {
            this._controller.saveUserProfile(userData);
        }
        else {
            alert(validator.getMessage());
        }
        event.stopPropagation();
    }
    exit(event: MouseEvent) {
        event.preventDefault();
        this._loginController.logout();
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
        if (userData.avatar) {
            this._children.avatar.setProps({src: userData.avatar})
        }
        else {
            this._children.avatar.setProps({src: defaultUserPic})
        }

    }
}
