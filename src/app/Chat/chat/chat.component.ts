import { Component, NgZone, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, Thread } from 'src/app/models/Message';
import { Oponent, Profile, User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/Chat/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  urlImg = environment.images;
  filter = 'a';
  txtMessage = '';
  uniqueID: string;
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  bread: MenuItem[] = [
    {label: 'Suporte'},
    {label: 'Chat'},
  ];
  messages = new Array<Message>();
  profile = new Profile();
  message = new Message();
  users = new Array<User>();
  threads = new Array<Thread>();
  currentThreadId: string;
  listForC = new Array<any>();
  currentOponentVM: Oponent;
  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone,

  ) {
    this.chatService.createConnection();
    this.chatService.registerOnServerEvents();
    this.chatService.startConnection();
    this.subscribeToEvents();
  }

  con(user){
    console.log('deu certo', user);
    this.loadThread(user);
  }

  ngOnInit() {
    console.log('this');
    this.chatService.getUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        if (user.avatarFileName === null){
          const urlImg = this.chatService.getDefaultImageUrl(user.username);
          user.avatarFileName = urlImg;
        }
        else {
          user.avatarFileName = `${this.urlImg}/${user.avatarFileName}`;
        }
      });
    }, error => console.log(error));
    this.chatService.getThreads().subscribe(threads => {
      this.threads = threads;
      this.threads.forEach(tr => {
        if (tr.oponentVM.avatarFileName === null){
          const url = this.chatService.getDefaultImageUrl(tr.oponentVM.username);
          tr.oponentVM.avatarFileName = url;
        }
        else {
          tr.oponentVM.avatarFileName = `${this.urlImg}/${tr.oponentVM.avatarFileName}`;
        }
      });
      this.listForC = threads;
    });
    this.uniqueID = this.chatService.LocalStorage.getUserToken();
    this.chatService.getProfile(this.uniqueID).subscribe(prof => this.profile = prof);
  }

  loadThread(event: Thread){
    console.log('entrou');
    this.messages = [];
    this.currentOponentVM = event.oponentVM;
    this.currentThreadId = event.id;
    this.chatService.getMessages(event.id, this.uniqueID).subscribe(result => {
      const messages = Object.entries(result)[0][1];
      messages.forEach(message => {
        if (message.senderId !== this.profile.id){
          message.type = 'received';
          this.messages.push(message);
        }
        else {
          message.type = 'sent';
          this.messages.push(message);
        }
      });
      console.log(this.messages);
    });
  }

  createThread(event: Oponent){
    const result = this.threads.find(thread => thread.oponentVM.id === event.id);
    if (result){
      this.loadThread(result);
    }
    else {
      const newthr = new Thread();
      newthr.oponentVM = event;
      newthr.owner = this.profile.id;
      this.chatService.createThread(newthr).subscribe(thr => {
        this.currentThreadId = thr.id;
        this.currentOponentVM = event;
      });
    }
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.senderId = this.profile.id;
      this.message.text = this.txtMessage;
      this.message.time = new Date().toISOString();
      this.message.date = new Date().toISOString();
      this.message.threadId = this.currentThreadId;
      this.message.username = this.profile.userName;
      this.message.type = 'sent';

      const msgEnv: Message = {
        text: this.message.text,
        senderId: this.message.senderId,
        time: this.message.time,
        date: this.message.date,
        threadId: this.message.threadId,
        username: this.message.username
      };
      this.messages.push(this.message);
      console.log(this.message);
      this.chatService.sendMessageToApi(msgEnv).subscribe(
         success => console.log('Mensagem enviada'),
         error => console.log(error)
      );
      this.txtMessage = '';
    }
  }

  subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.senderId !== this.profile.id) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }

}
