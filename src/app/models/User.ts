import { v4 as Guid } from 'uuid';

export class User {
    id?: typeof Guid;
    email: string;
    password: string;
    confirmpassword?: string;
}
