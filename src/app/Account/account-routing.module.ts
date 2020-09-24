import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppComponent } from './account-app';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const accountRouteConfig: Routes = [
    { path: '', component: AccountAppComponent,
        children: [
            { path: 'cadastrar', component: RegisterComponent},
            { path: 'entrar', component: LoginComponent }
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
