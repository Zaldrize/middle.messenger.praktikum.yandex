import IValidator from "./validator";

export class NameValidator implements IValidator {
    isValid(name:string):boolean {
       const regExp =  /^[A-ZА-Я][a-zа-яA-ZА-Я-.]{1,}$/;
       return regExp.test(name);
   }

   getMessage(): string {
       return 'Латиница или кириллица, первая буква должна быть заглавной,\
 без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
   }
}
