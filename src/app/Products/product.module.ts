import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRouterModule } from './product-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../components/shared.module';

import { ProductResolve } from '../services/Product/product.resolve';

import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductAppComponent } from './product-app';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductRouterModule,
    FontAwesomeModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  declarations: [
    ProductAppComponent,
    ProductComponent,
    ProductsComponent
  ],
  providers: [
    ProductResolve
  ]
})
export class ProductModule { }
