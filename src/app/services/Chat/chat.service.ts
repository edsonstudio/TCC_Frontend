import { EventEmitter, Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';          // import signalR
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BaseService } from '../base.service';
import { Profile, User } from 'src/app/models/User';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message, Thread } from 'src/app/models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(private http: HttpClient){
    super();
  }

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  sendMessage(message: Message) {
    this._hubConnection.invoke('SendMessage', message);
    }

  createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5101/chat', {
        accessTokenFactory: () => this.LocalStorage.getUserToken()
      }).build();
  }

  startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function() { this.startConnection(); }, 5000);
      });
  }

   registerOnServerEvents(): void {
    this._hubConnection.on('ReciveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
}

    searchForUsers(value: string): Observable<User>{
        return this.http.get<User>(`${this.UrlChat}/users/search?name=${value}`, this.GetJsonAuthHeader());
    }

    getUsers(): Observable<User[]>{
      return this.http.get<User[]>(`${this.UrlChat}/Hey/getusers`, this.GetJsonAuthHeader());
    }

    uploadAvatar(fromData){
        return this.http.post(`${this.UrlChat}/avatars/upload`, fromData, this.GetJsonAuthHeader());
    }

    getProfile(accessToken): Observable<Profile>{
        return this.http.get(`${this.UrlChat}/users/getprofile`, this.GetJsonAuthHeader());
    }

    getMessages(threadId, accessToken): Observable<Array<any>>{
        return this.http.get<Array<any>>(`${this.UrlChat}/Thread/getmessages/${threadId}`, {headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        })});
    }

    getThreads(): Observable<Thread[]>{
        return this.http.get<Thread[]>(`${this.UrlChat}/Hey/getthreads`, this.GetJsonAuthHeader());
    }

    createThread(oponentViewModel): Observable<Thread>{
        return this.http.post<Thread>(`${this.UrlChat}/Hey/createthread`, {
            OponentVM: oponentViewModel
        }, this.GetJsonAuthHeader());
    }

    sendMessageToApi(messageViewModel) {
        return this.http.post(`${this.UrlChat}/Hey/send`, JSON.stringify(messageViewModel), this.GetJsonAuthHeader());
    }

    searchForMessageInThread(accessToken, param): Observable<any>{
        return this.http.get(`${this.UrlChat}/Thread/search`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }),
            params: param
        });
    }

    updateUsersProfile(user) {
        return this.http.post(`${this.UrlChat}/users/update`, user, this.GetJsonAuthHeader());
    }

    getUserAvatar(fileName){
        return `${this.UrlImages}/images/${fileName}`;
    }

    getDefaultImageUrl = (userName) => {
      return `https://ui-avatars.com/api/?name=${userName}&background=435f7a&color=fff&size=256&font-size=0.55`;
    }

}
