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
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgBrazil } from 'ng-brazil';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InplaceModule } from 'primeng/inplace';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '../components/shared.module';
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
        NgOptionHighlightModule,
        BreadcrumbModule,
        TabViewModule,
        TableModule,
        ButtonModule,
        NgBrazil,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        EditorModule,
        FileUploadModule,
        RadioButtonModule,
        InputSwitchModule,
        InplaceModule,
        InputTextareaModule,
        ToastModule,
        RippleModule,
        SharedModule
    ],
    declarations: [
        ManagementComponent,
        AdmProductsComponent,
        AdmUsersComponent
    ],
    providers: [
        Store,
        ProductService,
        MessageService
    ]
})
export class AdminModule{}
