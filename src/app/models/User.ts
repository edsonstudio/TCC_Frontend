import { v4 as Guid } from 'uuid';

export class User {
    id: Guid;
    email: string;
    password: string;
    confirmpassword: string;
}
