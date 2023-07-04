import defaultUserPic from '../../../static/defaultUserPic.svg'
import profile from './profile.hbs'
import './profile.css'

export default function getProfile(){
    const profileModel = {
        name: 'Галина',
        surname: 'Залужная',
        password: '******',
        email: 'litvinovaga@inbox.ru',
        login: 'zaldrize',
        phone: '+7-985-130-98-55',
        userPic: defaultUserPic
    }
    return profile(profileModel);
}