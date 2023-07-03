import Handlebars from 'handlebars';
import profileTemplate from './profile.template';

export default function GetProfilePage() {
    const data = {
        name: "Galina"
    }
    const template = Handlebars.compile(profileTemplate);
    const result = template({name: "Galina"});
    return result;
};