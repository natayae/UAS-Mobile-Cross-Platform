export class User{
    user_id: string;
    email: string;
    names: string;
    usernames: string;
    emailVerified: boolean; 
    photo_profile: string;
    checkinDate: string;
    place: string;
    lat: number;
    lng: number;

    constructor(
        user_id: string,
        email: string,
        names: string,
        usernames: string,
        emailVerified: boolean,
        checkinDate: string,
        photo_profile: string) {
    }
}
