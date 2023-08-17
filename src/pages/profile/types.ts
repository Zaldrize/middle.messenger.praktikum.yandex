import { IBlockEvents, IBlockProps } from "../../components/block/types";
import Button from "../../components/button/button";
import Input from "../../components/input";
import { userInfo } from "../../models/user";
import Image from "../../components/img/img";
import ChangePasswordDialog from "../../components/dialogs/changePasswordDialog";
import ChangeAvatarDialog from "../../components/dialogs/changeAvatarDialog/changeAvatarDialog";

export class ProfilePageProps implements IBlockProps {
    userPic: string;
    avatar: Image;
    changeAvatarDialog: ChangeAvatarDialog;
    emailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    secondNameInput: Input;
    displayNameInput: Input;
    phoneInput: Input;
    
    saveButton: Button;
    cancelButton: Button;
    logOutButton: Button;
    changePasswordButton: Button;

    changePasswordDialog: ChangePasswordDialog;
    userData: userInfo;
    events?: IBlockEvents | {};    
    attributes?: Record<string, string|number|boolean>;
}
