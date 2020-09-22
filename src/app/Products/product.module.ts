import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductAppComponent } from './product-app';
import { ProductRouterModule } from './product-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from '../components/card/card.component';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRouterModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: [
    ProductAppComponent,
    ProductComponent,
    ProductsComponent
  ]
})
export class ProductModule { }
