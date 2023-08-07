import IValidator from "./validator";

export class LoginValidator implements IValidator {
    isValid(login:string):boolean {
       const regExp =  /^[a-zA-Z][a-zA-Z0-9-_.]{2,20}$/;
       return regExp.test(login);
   }

   getMessage(): string {
       return 'Логин должен быть от 3 до 20 символов, латиница, может содержать цифры,\
 но не состоять из них, без пробелов,\
 без спецсимволов (допустимы дефис и нижнее подчёркивание';
   }
}
