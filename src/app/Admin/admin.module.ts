import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagementComponent } from './management/management.component';
import { SidebarModule } from 'ng-sidebar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdmProductsComponent } from '../Admin/products/admproducts/admproducts.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdmUsersComponent } from './users/admusers/admusers.component';


@NgModule({
    imports: [
        BrowserModule,
        AdminRoutingModule,
        SidebarModule,
        TabsModule.forRoot()
    ],
    declarations: [
        ManagementComponent,
        AdmProductsComponent,
        AdmUsersComponent
    ]
})
export class AdminModule{}
