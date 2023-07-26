import IValidator from "./validator";

export class PasswordValidator implements IValidator {
    isValid(password:string):boolean {
       const regExp =  /^(?=.?[0-9])(?=.?[A-Z])[a-zA-Z0-9]{8,40}$/;
       return regExp.test(password);
   }

   getMessage(): string {
       return 'Пароль должен быть от 8 до 40 символов,\
 обязательно хотя бы одна заглавная буква и цифра';
   }
}
