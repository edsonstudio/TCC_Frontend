import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

const chatRoutesConfig: Routes = [
  { path: '', component: ChatComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(chatRoutesConfig) ],
  exports: [ RouterModule ]
})

export class ChatRoutingModule {}


