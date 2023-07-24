import { IBlockProps } from "../../components/block/types";
import Button from "../../components/button";
import Input from "../../components/input";
import chatPic from '../../../static/chatPic.svg'

export class LoginPageProps implements IBlockProps {
    inputLogin: Input;
    inputPassword: Input;
    signInButton: Button;
    signUpButton: Button;
    chatPic = chatPic;
    attributes: {}
}