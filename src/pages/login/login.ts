import login from './login.hbs'
import './login.less'
import { LoginPageProps } from './types'
import Block from '../../components/block/block'
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { Router } from '../../routing/router';
import GetModelFromFormData from '../../utils/getModelFromFormData';
import LoginRequest from '../../models/loginRequest';
import LoginController from '../../controllers/loginController';

export default class LoginPage extends Block<LoginPageProps> {
    constructor() {
        const router = new Router(null);
        const props = new LoginPageProps();
        props.attributes = {
            'id': 'auth'
        };
        props.inputLogin = new Input('div', {
            label: 'Login',
            value: '',
            attributes: {
                class: 'auth_login_input',
                type: 'text',
                name: 'login'
            }
        });
        props.inputPassword = new Input('div', {
            label: 'Password',
            value: '',
            attributes: {
                class: 'auth_password_input',
                type: 'password',
                name: 'password'
            }
        });
        props.signInButton = new Button('div', {
            text: 'Sign In',
            events: {
                'click': (event: MouseEvent) => this.signIn(event)
            }
        });
        props.signUpButton = new Button('div', {
            text: 'Sign Up',
            events: {
                'click': () => {
                    router.go('sign-up')
                }
            }
        });
        super('div', props);
    }
    render() {
        return this.compile(login);
    }

    signIn(event: MouseEvent) {
        event.preventDefault();
        let form = <HTMLFormElement>this._element.querySelector('form');
        const request = GetModelFromFormData<LoginRequest>(new FormData(form));
        const controller = new LoginController();
        controller.login(request).then(res => {
            if (res) {
                Router.getInstance().go('/messenger');
            }
            else {
                this._children.inputLogin.setProps({value: ''});
                this._children.inputPassword.setProps({value: ''});
            }
        });
       
    }
}
