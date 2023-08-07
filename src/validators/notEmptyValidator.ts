import IValidator from "./validator";

export class NotEmptyValidator implements IValidator {
    isValid(message: string):boolean {
       const regExp =  /^\w{1,}/;
       return regExp.test(message);
   }

   getMessage(): string {
       return `Сообщение не должно быть пустым`;
   }
}
