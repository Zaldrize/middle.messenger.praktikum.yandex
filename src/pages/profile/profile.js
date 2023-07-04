import profile from './profile.hbs'

export default function GetProfilePage() {
    const data = {
        name: "Galina"
    }
    
    const result = profile({name: "Galina"});
    return result;
};