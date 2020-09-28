import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolve } from '../services/Product/product.resolve';
import { ProductAppComponent } from './product-app';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

const productRouterConfig: Routes = [
    { path: '', component: ProductAppComponent,
    children: [
        { path: '', component: ProductsComponent },
        { path: ':id', component: ProductComponent, resolve: { product: ProductResolve } }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(productRouterConfig) ],
    exports: [ RouterModule ]
})

export class ProductRouterModule {}
