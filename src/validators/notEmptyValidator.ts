import IValidator from "./validator";

export class NotEmptyValidator implements IValidator {
    isValid(message: string):boolean {
       const regExp =  /^[а-яА-Яa-zA-Z0-9_]{1,}/;
       return regExp.test(message);
   }

   getMessage(): string {
       return `Сообщение не должно быть пустым`;
   }
}
