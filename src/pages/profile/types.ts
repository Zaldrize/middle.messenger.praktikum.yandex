import { IBlockEvents, IBlockProps } from "../../components/block/types";
import Button from "../../components/button/button";
import Input from "../../components/input";
import { userInfo } from "../../models/user";

export class ProfilePageProps implements IBlockProps {
    userPic: string;
    avatarInput: Input;
    emailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    secondNameInput: Input;
    displayNameInput: Input;
    phoneInput: Input;
    passwordInput: Input;
    saveButton: Button;
    cancelButton: Button;
    logOutButton: Button;
    userData: userInfo;
    events?: IBlockEvents | {};    
    attributes?: Record<string, string|number|boolean>;
}
