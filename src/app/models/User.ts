import { Guid } from 'guid-typescript';


export class User {
    id?: Guid;
    email?: string;
    password?: string;
    confirmpassword?: string;

    username?: string;
    isOnline?: boolean;
    avatarFileName?: string;
}

export class Profile {
    id?: Guid;
    userName?: string;
    email?: string;
    avatarFileName?: string;
}


export class Oponent {
    id: Guid;
    username: string;
    email: string;
    avatarFileName: string;
    isOnline: boolean;
    isTyping: boolean;
}
