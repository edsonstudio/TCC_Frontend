import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CommumMethods } from 'src/app/services/commum-methods';
import { environment } from 'src/environments/environment';
import { Store } from '../cart.store';
import { Product } from './../../models/Product';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends CommumMethods implements OnInit, OnDestroy, AfterViewInit {

  images = environment.images;
  product: Product;
  val: number;
  subscription: Subscription;
  logged = false;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private routeS: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private store: Store,
    private router: Router,
    private cart: CartService) {
    super();
  }

  ngOnInit() {
    this.spinner.show();
    if (this.cart.LocalStorage.getUser()){
      this.logged = true;
    }
    this.product = this.config.data.product;
    this.subscription = this.cart.getCart$.subscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearMessages(){
    this.messageService.clear('c');
  }

  showConfirm() {
    this.clearMessages();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Necessário Login', detail: 'Fazer Login ?'});
  }

   buyItem(){
      this.cart.getCart$.pipe(map(cart => cart.items)).toPromise().then(cartItems => {
        const prod = cartItems.find(cartItem => cartItem.productId === this.product.id);
        if (prod) {
          this.ref.close();
          this.routeS.navigate(['/Inicio/produtos/carrinho']);
        }
        else {
          const caartIt: CartItem = {
            amount: 1,
            image: this.product.image,
            name: this.product.name,
            price: this.product.price,
            productId: this.product.id,
            categoryId: this.product.categoryId
          };
          this.cart.postCartItem(caartIt).subscribe(
            success => {
              this.ref.close();
              this.routeS.navigate(['/Inicio/produtos/carrinho']);
            },
            error => {console.log(error); }
          );
        }
      });
    
  }

  navigateToLogin(){
    this.messageService.clear();
    this.router.navigate(['Inicio/conta/entrar']);
  }

}
