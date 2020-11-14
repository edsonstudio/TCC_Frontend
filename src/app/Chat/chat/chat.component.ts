import { Component, NgZone, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/Chat/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  urlImg = environment.images;
  txtMessage: string = '';
  uniqueID: string;
  messages = new Array<Message>();
  message = new Message();
  users = new Array<User>();
  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.uniqueID = this.chatService.LocalStorage.getUserToken();
  }

  con(user){console.log('deu certo', user)}

  ngOnInit() {
    console.log('this');
    this.chatService.getUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        if (user.avatarFileName === null){
          const urlImg = this.chatService.getDefaultImageUrl(user.username);
          user.avatarFileName = urlImg;
        }
      });
      console.log(this.users);
    }, error => console.log(error));
  }


  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.senderId = this.uniqueID;
      this.message.text = this.txtMessage;
      this.message.time = new Date();
      const msg = this.message;
      msg.type = 'sent';
      this.messages.push(msg);
      this.chatService.sendMessageToApi(this.message).subscribe(
        success => console.log('Mensagem enviada'),
        error => console.log(error)
      );
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.senderId !== this.uniqueID) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }

}
