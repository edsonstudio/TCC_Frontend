import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { MainAppComponent } from './main-app';


const routes: Routes = [
    { path: '', component: MainAppComponent,
    children: [
        { path: '', component: MainComponent, pathMatch: 'full' },
        { path: 'Produtos', loadChildren: () => import('../Products/product.module').then(m => m.ProductModule) },
        { path: 'Suporte', loadChildren: () => import('../Chat/chat.module').then(m => m.ChatModule) }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class MainRouterModule {}
