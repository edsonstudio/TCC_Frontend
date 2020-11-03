import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';

const adminRouteConfig: Routes = [
    { path: '', component: ManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(adminRouteConfig)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
