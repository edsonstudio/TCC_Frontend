import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { Store } from '../cart.store';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems$: Observable<Cart>;
  subscription: Subscription;

  constructor(
    private cart: CartService,
    private store: Store,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.getCart();
    this.subscription = this.cart.getCart$.subscribe();
  }

  navigate(){
    this.route.navigate(['Inicio/produtos/pedido']);
  }

}
