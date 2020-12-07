import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../components/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from '../services/User/user.service';

import { AccountAppComponent } from './account-app';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuardAccount } from '../services/User/user.guard';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TimelineModule } from 'primeng/timeline';
import { OrderService } from '../services/Cart_Order/order.service';
import { OrdersComponent } from './orders/orders.component';
import { CardModule } from 'primeng/card';
import { ActionsGuard } from '../services/actions.guard';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NgBrazil } from 'ng-brazil';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        NgxSpinnerModule,
        BreadcrumbModule,
        TimelineModule,
        CardModule,
        PanelModule,
        ButtonModule,
        RippleModule,
        NgBrazil
    ],
    declarations: [
        AccountAppComponent,
        LoginComponent,
        RegisterComponent,
        OrdersComponent
    ],
    providers: [
        AccountService,
        GuardAccount,
        MessageService,
        NgxSpinnerService,
        OrderService,
        ActionsGuard
    ]
})

export class AccountModule {}
