import { EmailValidator } from "./emailValidator";
import { LoginValidator } from "./loginValidator";
import { NameValidator } from "./nameValidator";
import { NotEmptyValidator } from "./notEmptyValidator";
import { PasswordValidator } from "./passwordValidator";
import { PhoneValidator } from "./phoneValidator";
import IValidator from "./validator";

export type userData = {
    email: string;
    login: string;
    phone: string;
    first_name:string;
    second_name: string;
    display_name: string | undefined;
    password: string;
}

export class RegisterValidator implements IValidator {
    private _nameValidator = new NameValidator();
    private _loginValidator = new LoginValidator();
    private _emailValidator = new EmailValidator();
    private _phoneValidator = new PhoneValidator();
    private _passwordValidator = new PasswordValidator();
    isValid(userData: userData): boolean {
        return  this._nameValidator.isValid(userData.first_name) &&
        this._nameValidator.isValid(userData.second_name) &&
        this._emailValidator.isValid(userData.email) &&
        this._loginValidator.isValid(userData.login) &&
        this._phoneValidator.isValid(userData.phone) &&
        this._passwordValidator.isValid(userData.password);
    }
    getMessage(): string {
        return 'Данные были заполнены неверно';
    }
}

export class ProfileValidator extends RegisterValidator {
    _notEmptyValidator = new NotEmptyValidator();

    isValid(userData: userData): boolean {
        return super.isValid(userData) &&
        this._notEmptyValidator.isValid(userData.display_name || '');
    }
}

export function validate(e:FocusEvent, validator: IValidator) {
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
