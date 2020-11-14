import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { AdminRoutingModule } from './admin-routing.module';

import { ManagementComponent } from './management/management.component';
import { AdmProductsComponent } from '../Admin/products/admproducts/admproducts.component';
import { AdmUsersComponent } from './users/admusers/admusers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { Store } from '../Products/cart.store';
import { ProductService } from '../services/Product/product.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarModule } from 'ng-sidebar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
registerLocaleData(localePt);

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SidebarModule,
        TabsModule.forRoot(),
        Ng2SearchPipeModule,
        FormsModule,
        ModalModule.forChild(),
        TooltipModule.forRoot(),
        ReactiveFormsModule,
        ImageCropperModule,
        NgSelectModule,
        NgOptionHighlightModule
    ],
    declarations: [
        ManagementComponent,
        AdmProductsComponent,
        AdmUsersComponent
    ],
    providers: [
        Store,
        ProductService
    ]
})
export class AdminModule{}
