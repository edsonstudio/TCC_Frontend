import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { MainAppComponent } from './main-app';


const mainRouteConfig: Routes = [
    { path: '', component: MainAppComponent,
    children: [
        { path: '', component: MainComponent },
        { path: 'produtos', loadChildren: () => import('../Products/product.module').then(m => m.ProductModule) },
        { path: 'suporte', loadChildren: () => import('../Chat/chat.module').then(m => m.ChatModule) },
        { path: 'conta', loadChildren: () => import('../Account/account.module').then(m => m.AccountModule) },
        { path: 'admin', loadChildren: () => import('../Admin/admin.module').then(m => m.AdminModule) }
        { path: '**', redirectTo: '' }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRouteConfig)
    ],
    exports: [
        RouterModule
    ]
})

export class MainRoutingModule {}
