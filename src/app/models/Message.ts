import { Oponent, User } from './User';

export class Message {
    text: string;
    username?: string;
    senderId: string;
    sender?: User;
    threadId?: string;
    thread?: Thread;
    time: Date;
    date?: Date;
    type?: string;
}

export class Thread {
    id: string;
    owner: string;
    lastMessage: Message;
    oponentVM: Oponent;
}
