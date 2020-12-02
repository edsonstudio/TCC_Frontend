import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CartComponent as Cart } from '../components/cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ConfirmComponent } from './confirm/confirm.component';

const cartRouterConfig: Routes = [
    {path: '', component: CartComponent, children: [
        { path: '', redirectTo: 'carrinho', pathMatch: 'full' },
        { path: 'carrinho', component: Cart },
        { path: 'endereco', component: AddressComponent },
        { path: 'pagamento', component: OrderComponent },
        { path: 'confirmar', component: ConfirmComponent }
    ] },

];

@NgModule({
    imports: [ RouterModule.forChild(cartRouterConfig) ],
    exports: [ RouterModule ]
})

export class CartRouterModule {}
