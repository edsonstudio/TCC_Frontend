import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatAppComponent } from './chat-app';
import { ChatComponent } from './chat/chat.component';

const chatRoutesConfig: Routes = [
  { path: '', component: ChatAppComponent,
  children: [
    { path: 'chat', component: ChatComponent }
  ]},
];

@NgModule({
  imports: [ RouterModule.forChild(chatRoutesConfig) ],
  exports: [ RouterModule ]
})

export class ChatRoutingModule {}


