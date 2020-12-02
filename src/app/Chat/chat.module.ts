import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatAppComponent } from './chat-app';
import { ChatService } from '../services/Chat/chat.service';
import {AccordionModule} from 'primeng/accordion';
import {OrderListModule} from 'primeng/orderlist';
import {FieldsetModule} from 'primeng/fieldset';
import {ListboxModule} from 'primeng/listbox';
import { SharedModule } from '../components/shared.module';
import {ButtonModule} from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    AccordionModule,
    OrderListModule,
    FieldsetModule,
    ListboxModule,
    SharedModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule
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
