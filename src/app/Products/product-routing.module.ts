import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsGuard } from '../services/actions.guard';
import { PersonalizedComponent } from './personalized/personalized.component';
import { ProductAppComponent } from './product-app';
import { ProductsComponent } from './products/products.component';

const productRouterConfig: Routes = [
    { path: '', component: ProductAppComponent,
    children: [
        { path: 'todos', component: ProductsComponent },
        { path: 'meu-setup', component: PersonalizedComponent, canActivate: [ActionsGuard] },
        { path: 'pedido', canActivate: [ActionsGuard], loadChildren: () => import('../Cart/cart.module').then(m => m.CartModule)},
        { path: '**', redirectTo: ''}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(productRouterConfig) ],
    exports: [ RouterModule ]
})

export class ProductRouterModule {}
