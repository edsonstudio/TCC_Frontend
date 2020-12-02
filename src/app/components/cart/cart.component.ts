import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as convert from 'xml-js';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { OrderService } from 'src/app/services/Cart_Order/order.service';
import { Store } from 'src/app/Products/cart.store';
import { CartItem } from 'src/app/models/CartItem';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orderService: OrderService,
    private store: Store,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };

      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
    }

  shippingPrice: number;
  deliveryIn: number;
  loading = false;
  formCep: FormGroup;
  formVoucher: FormGroup;
  subscription: Subscription;
  mySubscription: any;
  errors: string[];
  urlImages = environment.images;
  remove = false;
  cartItems: Cart;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.store.getCart().subscribe((cart) => {
      this.cartItems = cart;
    });
    this.subscription = this.cartService.getCart$.subscribe();
    this.formCep = this.fb.group({
      cep: ['', [ Validators.minLength(8), Validators.maxLength(9) ]]
    });

    this.formVoucher = this.fb.group({
      voucher: ['', Validators.minLength(2)]
    });
  }

  calcShipping(){
    const cep = this.formCep.get('cep').value;
    this.loading = true;
    this.cart.frete(cep).subscribe(
        succ => {
        const price = JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.Valor._text;
        if (price === '0,00'){
          this.clearToasts();
          this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'CEP Inválido'});
        }
        else {
          this.shippingPrice = price;
          this.store.setCep(cep);

          console.log('Dias:', JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.PrazoEntrega._text);
          const days = JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.PrazoEntrega._text;
          this.deliveryIn = days;
        }
        },
        error => { console.log(error); }
      );
  }

  applyVoucher(){
    const value = this.formVoucher.get('voucher').value;
    if (value){
      this.orderService.applyVoucher(value).subscribe(
        success => {
          this.clearToasts();
          this.messageService.add({severity: 'success', summary: 'Show!', detail: 'Desconto aplicado', life: 2000});
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        },
        error => {
          this.errors = error.error.errors.Mensagens;
          this.clearToasts();
          this.errors.forEach((msgError) => {
            this.messageService.add({severity: 'error', summary: 'Opa :(', detail: `${msgError}`});
          });
        }
      );
    }
    else {
      this.messageService.add({severity: 'warn', summary: 'Opa', detail: 'Insira o código do cupom'});
    }
  }

  addUnit(product: CartItem){
    const item = this.cartItems.items.find(cartI => cartI.productId === product.productId);
    if (item.amount === 5){
      this.clearToasts();
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'Limite de até 5 unidades'});
    }
    else {
      item.amount++;
      this.cartService.updateCartItem(item).subscribe(
        success => {
          this.ngOnInit();
        },
        error => {
          this.clearToasts();
          this.messageService.add({severity: 'error', summary: 'Opa :(', detail: 'Ocorreu um erro inesperado, tente novamente mais tarde'});
        }
      );
    }
  }

  removeUnit(product: CartItem){
    const item = this.cartItems.items.find(cartI => cartI.productId === product.productId);
    if (item.amount === 1){
      if (!this.remove){
        this.messageService.add({severity: 'warn', detail: 'Isso irá remover o item do carrinho', summary: 'Atenção'});
        this.remove = true;
      }
      else {
        item.amount--;
        this.cartService.removeCartItem(item.productId).subscribe(
          success => {
            this.remove = false;
            this.ngOnInit();
          },
          error => {
            this.clearToasts();
            this.messageService.add({
              severity: 'error', summary: 'Opa :(', detail: 'Ocorreu um erro inesperado, tente novamente mais tarde'
            });
          }
        );
      }
    }
    else {
      item.amount--;
      this.cartService.updateCartItem(item).subscribe(
        success => {
          this.remove = false;
          this.ngOnInit()
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeItem(id){
    this.cartService.removeCartItem(id).subscribe(success => this.ngOnInit());
  }

  clearToasts(){
    this.messageService.clear();
  }

  nextPage(){
    this.router.navigate(['/Inicio/produtos/pedido/endereco']);
  }

}
