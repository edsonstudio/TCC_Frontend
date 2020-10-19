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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalizedComponent } from './personalized/personalized.component';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { CartComponent } from './cart/cart.component';
import { NgBrazil } from 'ng-brazil';
import { Store } from './cart.store';
import { CartService } from '../services/Cart_Order/cart.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { OrderComponent } from './order/order.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};
@NgModule({
  imports: [
    CommonModule,
    ProductRouterModule,
    FontAwesomeModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    SwiperModule,
    ContentLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    NgBrazil,
    TooltipModule.forRoot()
  ],
  declarations: [
    ProductAppComponent,
    ProductComponent,
    ProductsComponent,
    PersonalizedComponent,
    CartComponent,
    OrderComponent
  ],
  providers: [
    ProductResolve,
    Store,
    CartService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ProductModule { }
