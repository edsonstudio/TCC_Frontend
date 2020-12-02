import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRouterModule } from './cart-routing.module';
import { CartService } from '../services/Cart_Order/cart.service';
import { OrderService } from '../services/Cart_Order/order.service';
import { AddressComponent } from './address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { OrderComponent } from './order/order.component';
import {StepsModule} from 'primeng/steps';
import { SharedModule } from '../components/shared.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Store } from '../Products/cart.store';
import { ConfirmComponent } from './confirm/confirm.component';
import { CardModule } from 'primeng/card';
import { NgBrazil } from 'ng-brazil';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListItemsComponent } from './list-items/list-items.component';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  imports: [
    CommonModule,
    CartRouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    StepsModule,
    SharedModule,
    BreadcrumbModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    CardModule,
    NgBrazil,
    DynamicDialogModule,
    TableModule,
    BlockUIModule
  ],
  declarations: [
    CartComponent,
    AddressComponent,
    OrderComponent,
    ConfirmComponent,
    ListItemsComponent
  ],
  providers: [
    CartService,
    OrderService,
    MessageService,
    Store,
    DialogService
  ]
})
export class CartModule { }
