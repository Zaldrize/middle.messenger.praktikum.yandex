import { IBlockEvents, IBlockProps } from "../../components/block/types";
import Button from "../../components/button/button";
import Input from "../../components/input";

export class RegisterPageProps implements IBlockProps {
    emailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    secondNameInput: Input;
    phoneInput: Input;
    passwordInput: Input;
    repeatPasswordInput: Input;
    saveButton: Button;
    cancelButton: Button;
    events?: IBlockEvents | {};    
    attributes?: Record<string, string|number|boolean>;
}
