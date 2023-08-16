import UserController from "../../controllers/userController";
import { userInfo } from "../../models/user";
import store, { StoreEvents } from "../../modules/store";
import Block from "../block/block";
import Button from "../button";
import Input from "../input";
import UserComponent from "../user/user";
import { UserSearchProps } from "./types";
import userSearch from './userSearch.hbs';
import "./userSearch.less";
export default class UserSearch extends Block<UserSearchProps> {
    private _userController = new UserController();
    constructor(){
        const props = new UserSearchProps();
        props.search = new Input('div',
        {
            label: '',
            value: '',
            attributes: {
                type: 'text',
                placeholder: 'Type login...'
            }

        });
        props.searchButton = new Button('div', {
            text:'Search',
            events: {
                'click': (e:MouseEvent) => this.searchUsers(e)
            }
        })
        props.userComponents = [];

        store.on(StoreEvents.Updated, () => this.updateUsers())

        super('div', props)
    }
    updateUsers(): void {
        const result = store.getState()["userSearchResult"];
        if (result) {
        const searchResult = JSON.parse(result) as userInfo[];
        const components = searchResult.map(u => new UserComponent(u));
        this.setProps({ userComponents: components} as UserSearchProps);
        }
    }
    searchUsers(e: Event): void {
        e.preventDefault();
        const searchString =(this._children.search as Input).element.querySelector('input')?.value
         ??'';
        this._userController.search(searchString); // will trigger updateUsers
        
    }
    
    render() {
        return this.compile(userSearch);
    }


}
