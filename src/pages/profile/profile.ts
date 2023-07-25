import Block from '../../components/block/block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import profile from './profile.hbs'
import './profile.less'
import { ProfilePageProps } from './types'

export default class ProfilePage extends Block<ProfilePageProps> {
    constructor() {
        const props = new ProfilePageProps();
        props.emailInput = new Input('div', {
            label: 'Email',
            attributes: {
                type: 'text',
                name: 'email'
            }
        });
        props.loginInput = new Input('div', {
            label: 'Login',
            attributes: {
                type: 'text',
                name: 'login'
            }
        });
        props.firstNameInput = new Input('div', {
            label: 'First name',
            attributes: {
                type: 'text',
                name: 'first_name'
            }
        });
        props.secondNameInput = new Input('div', {
            label: 'Second name',
            attributes: {
                type: 'text',
                name: 'second_name'
            }
        });
        props.phoneInput = new Input('div', {
            label: 'Phone',
            attributes: {
                type: 'text',
                name: 'phone'
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Password',
            attributes: {
                type: 'password',
                name: 'password'
            }
        });

        props.saveButton = new Button('div', {
            text: 'Сохранить данные'
        });

        props.cancelButton = new Button('div', {
            text: 'Назад'
        });
        super('div', props);
    }
    render() {
        return this.compile(profile);
    }
}
