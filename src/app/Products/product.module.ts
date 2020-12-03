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
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { NgBrazil } from 'ng-brazil';
import { Store } from './cart.store';
import { CartService } from '../services/Cart_Order/cart.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { OrderService } from '../services/Cart_Order/order.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {NgxLoaderIndicatorModule} from 'ngx-loader-indicator';
import { CartGuard } from '../services/Cart_Order/cart.guard';
import { OrderGuard } from '../services/Cart_Order/order.guard';

// PrimeNG Components
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ListboxModule } from 'primeng/listbox';
import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import {DragDropModule} from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ActionsGuard } from '../services/actions.guard';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    ProductRouterModule,
    ListboxModule,
    FontAwesomeModule,
    SharedModule,
    NgxPaginationModule,
    DynamicDialogModule,
    Ng2SearchPipeModule,
    MenubarModule,
    SwiperModule,
    BreadcrumbModule,
    ContentLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    NgBrazil,
    TooltipModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxLoaderIndicatorModule.forRoot(),
    RatingModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    RippleModule,
    CarouselModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    DialogModule,
    FieldsetModule,
    PanelModule,
    SidebarModule,
    OverlayPanelModule,
    ToastModule,
    StepsModule,
    DragDropModule,
    TableModule,
    InputNumberModule,
    ProgressSpinnerModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProductAppComponent,
    ProductComponent,
    ProductsComponent,
    PersonalizedComponent
  ],
  providers: [
    ProductResolve,
    Store,
    CartService,
    OrderService,
    CartGuard,
    OrderGuard,
    ActionsGuard,
    MessageService,
    DialogService,
    NgxSpinnerService
  ]
})
export class ProductModule { }
