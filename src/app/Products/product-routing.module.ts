import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartGuard } from '../services/Cart_Order/cart.guard';
import { OrderGuard } from '../services/Cart_Order/order.guard';
import { ProductResolve } from '../services/Product/product.resolve';
import { CartPageComponent } from './cart-page/cart-page.component';
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
        { path: 'carrinho', component: CartPageComponent, canActivate: [CartGuard] },
        { path: 'pedido', component: OrderComponent, canActivate: [OrderGuard] },
        { path: '**', redirectTo: ''}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(productRouterConfig) ],
    exports: [ RouterModule ]
})

export class ProductRouterModule {}
