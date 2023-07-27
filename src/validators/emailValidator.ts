import IValidator from "./validator";

export class EmailValidator implements IValidator {
    isValid(email:string):boolean {
         // eslint-disable-next-line
        const regExp =/^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$/;
        return regExp.test(email);
    }

    getMessage(): string {
        return 'Некорректный email';
    }
}
