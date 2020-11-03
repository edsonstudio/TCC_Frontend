import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as convert from 'xml-js';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { OrderService } from 'src/app/services/Cart_Order/order.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) { }

    @Input()
      cartItems: Cart;

  shippingPrice: number;
  deliveryIn: number;
  imagesUrl = environment.images;
  formCep: FormGroup;
  formVoucher: FormGroup;
  errors: string[];
  urlImages = environment.images;

  ngOnInit(): void {
    this.formCep = this.fb.group({
      cep: ['', [ Validators.minLength(8), Validators.maxLength(9) ]]
    });

    this.formVoucher = this.fb.group({
      voucher: ['']
    });
  }

  calcShipping(){
    const cep = this.formCep.get('cep').value;
    console.log(cep);
    this.cart.frete(cep).subscribe(
        succ => {
        const price = JSON.parse(convert.xml2json(succ, {compact: true, spaces: 4})).Servicos.cServico.Valor._text;
        if (price === '0,00'){
          this.toastr.warning('CEP Inválido', 'Atenção');
        }
        else {
          this.shippingPrice = price;
          console.log('Preço:', this.shippingPrice);

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

    this.orderService.applyVoucher(value).subscribe(
      success => {
        console.log('Deu certo');
        this.toastr.success('Desconto aplicado', 'Show!');
      },
      error => {
        console.log(error.error.errors.Mensagens);
        this.errors = error.error.errors.Mensagens;
        this.errors.forEach((msgError) => {
          this.toastr.error(msgError, 'Opa!:(');
        });
      }
    );
  }
}
