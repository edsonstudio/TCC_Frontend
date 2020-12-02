import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../components/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from '../services/User/user.service';

import { AccountAppComponent } from './account-app';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuardAccount } from '../services/User/user.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        NgxSpinnerModule,
        BreadcrumbModule
    ],
    declarations: [
        AccountAppComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AccountService,
        GuardAccount,
        MessageService
    ]
})

export class AccountModule {}
