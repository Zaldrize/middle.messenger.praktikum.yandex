import login from './login.hbs'
import './login.less'
import { LoginPageProps } from './types'
import Block from '../../components/block/block'
import Input from '../../components/input/input';
import Button from '../../components/button/button';

export default class LoginPage extends Block<LoginPageProps> {
    constructor() {
        const props = new LoginPageProps();
        props.attributes = {
            'id': 'auth'
        };
        props.inputLogin = new Input('div', {
            label: 'Login',
            attributes: {
                labelClass: 'auth_login_label',
                inputClass: 'auth_login_input',
                type: 'text'
            }
        });
        props.inputPassword = new Input('div', {
            label: 'Password',
            attributes: {
                labelClass: 'auth_password_label',
                inputClass: 'auth_password_input',
                type: 'password'
            }
        });
        props.signInButton = new Button('div', {
            text: 'Sign In'
        });
        props.signUpButton = new Button('div', {
            text: 'Sign Up'
        });
        super('div', props);
    }
    render() {
        return this.compile(login);
    }
}