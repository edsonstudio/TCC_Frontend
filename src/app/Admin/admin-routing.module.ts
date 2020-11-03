import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from '../services/User/user-access.guard';
import { ManagementComponent } from './management/management.component';

const adminRouteConfig: Routes = [
    { path: '', component: ManagementComponent,
        data: [{claim: {name: 'Products', value: 'Adicionar, Excluir, Editar'}}], canActivate: [UserAccessGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(adminRouteConfig)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
