export default interface IValidator {
    isValid(params?: any): boolean;
    getMessage():string;
}
