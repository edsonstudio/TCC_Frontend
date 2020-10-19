import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { Store } from '../cart.store';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import * as convert from 'xml-js';
import { CustomValidators } from 'ngx-custom-validators';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private store: Store,
    private cart: CartService,
    private fb: FormBuilder) { }

  shippingPrice: number;
  deliveryIn: number;
  formVouncher: FormGroup;
  product: Product = {
    active: true,
    amount: 90,
    brand: 'Qualquer',
    categoryName: 'pc',
    description: 'string',
    image: '6c7da2d1-ba53-42a3-bcb9-398836c7d647_pcgame.png',
    imageUpload: null,
    model: 'ULTRAXT',
    name: 'PCFAEERS',
    price: 900.1,
    registerDate: new Date('2020-09-26T14:34:38.1599866')
  };
  cartItems$: Observable<CartItem[]>;
  imagesUrl = environment.images;
  subscription: Subscription;
  formCep: FormGroup;

  ngOnInit(): void {
    this.cartItems$ = this.store.getCartItems();
    this.subscription = this.store.getCartItems().subscribe();
    this.formCep = this.fb.group({
      cep: ['', [ Validators.minLength(8) ]]
    });
  }

  calcShipping(){
    const cep = this.formCep.get('cep').value;
    console.log(cep);
    this.cart.frete('05888050', cep, 5, 18, 18, 18, '04510').subscribe(
        succ => {
        const price = JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.Valor._text;
        this.shippingPrice = price;
        console.log('Preço:', this.shippingPrice);

        console.log('Dias:', JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.PrazoEntrega._text);
        const days = JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.PrazoEntrega._text;
        this.deliveryIn = days;
        },
        error => { console.log(error); }
      );
  }

}
