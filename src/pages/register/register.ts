import Block from '../../components/block/block';
import Button from '../../components/button';
import Input from '../../components/input';
import register from './register.hbs';
import './register.less';
import { RegisterPageProps } from './types';

export default class RegisterPage extends Block<RegisterPageProps> {
    constructor() {
        const props = new RegisterPageProps();
        props.attributes = {
            class: 'div_center'
        }
        props.emailInput = new Input('div', {
            label: 'Электронная почта',
            attributes: {
                type: 'text',
                name: 'email'
            }
        });
        props.loginInput = new Input('div', {
            label: 'Логин',
            attributes: {
                type: 'text',
                name: 'login'
            }
        });
        props.firstNameInput = new Input('div', {
            label: 'Имя',
            attributes: {
                type: 'text',
                name: 'first_name'
            }
        });
        props.secondNameInput = new Input('div', {
            label: 'Фамилимя',
            attributes: {
                type: 'text',
                name: 'second_name'
            }
        });
        props.phoneInput = new Input('div', {
            label: 'Телефон',
            attributes: {
                type: 'text',
                name: 'phone'
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Пароль',
            attributes: {
                type: 'password',
                name: 'password'
            }
        });
        props.passwordInput = new Input('div', {
            label: 'Повторите пароль',
            attributes: {
                type: 'password',
                name: 'password'
            }
        });
        props.saveButton = new Button('div', {
            text: 'Регистрация'
        });

        props.cancelButton = new Button('div', {
            text: 'Отмена'
        });
        super('div', props);
    }

    render() {
        return this.compile(register);
    }
}
