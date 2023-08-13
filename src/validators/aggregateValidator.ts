import { fullUserInfo } from "../models/user";
import { EmailValidator } from "./emailValidator";
import { LoginValidator } from "./loginValidator";
import { NameValidator } from "./nameValidator";
import { NotEmptyValidator } from "./notEmptyValidator";
import { PasswordValidator } from "./passwordValidator";
import { PhoneValidator } from "./phoneValidator";
import IValidator from "./validator";

export class RegisterValidator implements IValidator {
    private _nameValidator = new NameValidator();
    private _loginValidator = new LoginValidator();
    private _emailValidator = new EmailValidator();
    private _phoneValidator = new PhoneValidator();
    private _passwordValidator = new PasswordValidator();

    isValid(userData: fullUserInfo): boolean {
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

    isValid(userData: fullUserInfo): boolean {
        return super.isValid(userData) &&
        this._notEmptyValidator.isValid(userData.display_name || '');
    }
}

export function validate(e:FocusEvent, validator: IValidator) {
    e.preventDefault();
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
