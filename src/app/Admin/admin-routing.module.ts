import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from '../services/User/user-access.guard';
import { AdmProductsComponent } from './products/admproducts/admproducts.component';

const adminRouteConfig: Routes = [
    { path: '', component: AdmProductsComponent,
        data: [{claim: {name: 'Products', value: 'Editar, Adicionar, Excluir'}}], canActivate: [UserAccessGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(adminRouteConfig)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
