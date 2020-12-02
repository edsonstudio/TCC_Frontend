import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainAppComponent } from './main-app';
import { NgBrazil } from 'ng-brazil';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../components/shared.module';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/User/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from '../services/Product/product.service';
import { ChatService } from '../services/Chat/chat.service';
import { Store } from '../Products/cart.store';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LocalStorageUtils } from '../utils/localstorage';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../services/Cart_Order/cart.service';

@NgModule({
    declarations: [
        MainComponent,
        MainAppComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        TooltipModule.forRoot(),
        SharedModule,
        NgxSpinnerModule,
        ButtonModule,
        RippleModule,
        CarouselModule,
        NgBrazil,
        SwiperModule,
        SharedModule,
        BreadcrumbModule,
        ToastModule
    ],
    exports: [ MainComponent ],
    providers: [
        AccountService,
        ProductService,
        ChatService,
        Store,
        LocalStorageUtils,
        CartService
    ]
})

export class MainModule {}
