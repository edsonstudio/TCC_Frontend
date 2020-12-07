import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsGuard } from '../services/actions.guard';
import { GuardAccount } from '../services/User/user.guard';
import { AccountAppComponent } from './account-app';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';

const accountRouteConfig: Routes = [
    { path: '', component: AccountAppComponent,
        children: [
            { path: 'cadastrar', component: RegisterComponent, canActivate: [GuardAccount], canDeactivate: [GuardAccount]},
            { path: 'entrar', component: LoginComponent, canActivate: [GuardAccount] },
            { path: 'pedidos', component: OrdersComponent, canActivate: [ActionsGuard] }
        ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountRouteConfig)
    ],
    exports: [
        RouterModule
    ]
})

export class AccountRoutingModule {}
