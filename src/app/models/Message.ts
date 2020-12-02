import { Guid } from 'guid-typescript';
import { Oponent, User } from './User';

export class Message {
    text: string;
    username?: string;
    senderId: Guid;
    sender?: User;
    threadId?: string;
    time: string;
    date?: string;

    type?: string;
}

export class Thread {
    id: string;
    owner: Guid;
    lastMessage: Message;
    oponentVM: Oponent;
}
