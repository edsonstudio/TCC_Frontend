import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolve } from '../services/Product/product.resolve';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PersonalizedComponent } from './personalized/personalized.component';
import { ProductAppComponent } from './product-app';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

const productRouterConfig: Routes = [
    { path: '', component: ProductAppComponent,
    children: [
        { path: 'todos', component: ProductsComponent },
        { path: 'todos/:id', component: ProductComponent, resolve: { product: ProductResolve } },
        { path: 'meu-setup', component: PersonalizedComponent },
        { path: 'carrinho', component: CartComponent },
        { path: 'pedido', component: OrderComponent },
        { path: '**', redirectTo: ''}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(productRouterConfig) ],
    exports: [ RouterModule ]
})

export class ProductRouterModule {}
