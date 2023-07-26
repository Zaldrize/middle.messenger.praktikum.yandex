import IValidator from "./validator";

export class PhoneValidator implements IValidator {
    isValid(phone:string):boolean {
       const regExp =  /^[+|0-9][0-9]{9,15}$/;
       return regExp.test(phone);
   }

   getMessage(): string {
       return 'Телефон должен быть строкой от 10 до 15 символов,\
 состоит из цифр, может начинается с плюса';
   }
}
