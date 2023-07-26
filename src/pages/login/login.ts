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
                class: 'auth_login_input',
                type: 'text'
            },
            events: {
                'blur': ()=> {console.log('login blur');}
            }
        });
        props.inputPassword = new Input('div', {
            label: 'Password',
            attributes: {
                class: 'auth_password_input',
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
