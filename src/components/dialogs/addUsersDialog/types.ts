import { IBlockProps } from "../../block/types";
import Button from "../../button";
import UserSearch from "../../userSearch";

export default class AddUsersDialogProps implements IBlockProps {
    okButton: Button;
    cancelButton: Button;
    userSearch: UserSearch
    
}
