import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppComponent } from './account-app';

const accountRouteConfig: Routes = [
    { path: '', component: AccountAppComponent,
        children: [
            { path: 'cadastrar' },
            { path: 'entrar' }
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
