import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAccount } from '../services/User/user.guard';
import { AccountAppComponent } from './account-app';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const accountRouteConfig: Routes = [
    { path: '', component: AccountAppComponent,
        children: [
            { path: 'cadastrar', component: RegisterComponent, canActivate: [GuardAccount], canDeactivate: [GuardAccount]},
            { path: 'entrar', component: LoginComponent, canActivate: [GuardAccount] }
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
