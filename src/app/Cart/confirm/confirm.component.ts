import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Order } from 'src/app/models/Order';
import { Store } from 'src/app/Products/cart.store';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { OrderService } from 'src/app/services/Cart_Order/order.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ListItemsComponent } from '../list-items/list-items.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private store: Store,
    private orderService: OrderService,
    private cart: CartService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService
  ) { }

  finalOrder = new Order();
  localSt = new LocalStorageUtils();
  ngOnInit(): void {
    this.store.getPayment().subscribe(payment => {
      this.finalOrder.numeroCartao = payment.numeroCartao;
      this.finalOrder.nomeCartao = payment.nomeCartao;
      this.finalOrder.expiracaoCartao = payment.expiracaoCartao;
      this.finalOrder.cvvCartao = payment.cvvCartao;
    });
    this.store.getAddress().subscribe(address => {
      this.finalOrder.Endereco = address;
    });
    this.cart.getCart$.subscribe(cart => {
      this.finalOrder.valorTotal = cart.totalPrice;
      this.finalOrder.pedidoItems = cart.items;
      this.finalOrder.desconto = cart.desconto;
      this.finalOrder.voucherCodigo = cart.voucher ? cart.voucher.codigo : null;
      this.finalOrder.voucherUtilizado = cart.voucherUtilizado;
    });
  }

   doOrder(){
    this.finalOrder.data = new Date().toISOString();
    this.finalOrder.status = 0;

    this.orderService.sentOrder(this.finalOrder).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
 }

 postAddress(){
   const address = this.finalOrder.Endereco;
   address.clientId = this.localSt.getUser().id;

   this.orderService.postAddress(address).toPromise().then(() => {
     this.doOrder();
   });
 }

  prevPage(){
    this.router.navigate(['../pagamento'], {relativeTo: this.route});
  }

  seeItems(){
    this.dialogService.open(ListItemsComponent, {
      data: {
        cartItems: this.finalOrder.pedidoItems
      },
      width: '70%'
    });
  }

}
