import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatAppComponent } from './chat-app';
import { ChatService } from '../services/Chat/chat.service';
import {AccordionModule} from 'primeng/accordion';
import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    AccordionModule,
    OrderListModule
  ],
  declarations: [
    ChatComponent,
    ChatAppComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
