import { AfterViewInit, Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/Cart_Order/order.service';
import { Store } from 'src/app/Products/cart.store';
import { Cart } from 'src/app/models/Cart';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private store: Store,
    private cartService: CartService,
    private order: OrderService,
    private toastr: ToastrService
    ) { }

  cartItems: Cart;
  orderForm: FormGroup;
  addressForm: FormGroup;
  subscription: Subscription;
  isLoader: boolean;
  urlImages = environment.images;
  orderTo = {
    pedidoItems: [],
    endereco: {},
    valorTotal: 0,
    voucherCodigo: '',
    voucherUtilizado: false,
    desconto: 0
  };
  remove = false;
  isLoaderRem = false;
  ngAfterViewInit(): void{
    this.isLoader = true;
  }

 ngOnInit() {
    this.validate();
    this.store.getCart().subscribe((cart) => {
      this.cartItems = cart;
      this.isLoader = false;
      this.orderTo.pedidoItems = cart.items;
    });
    this.subscription = this.cartService.getCart$.subscribe();
  }

  validate(){
    this.orderForm = this.fb.group({
      numeroCartao: ['', [CustomValidators.creditCard]],
      nomeCartao: ['', Validators.minLength(8)],
      expiracaoCartao: ['', [this.expDateValidators, Validators.minLength(4)]],
      cvvCartao: ['', [Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[0-9]*$/)]]
    });
    this.addressForm = this.fb.group({
      logradouro: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [ Validators.minLength(8), Validators.maxLength(9), Validators.required ]],
      cidade: [''],
      estado: ['']
    });
  }

  calcShipping(){
    if (this.addressForm.get('cep').valid){
      const cep = this.addressForm.get('cep').value;

      this.order.CEP(cep).subscribe(
        success => {
          if (success.hasOwnProperty('erro')){
            this.toastr.warning('CEP Inválido', 'Atenção');
          }
          else {
            this.addressForm.setValue({
              logradouro: success.logradouro,
              bairro: success.bairro,
              cidade: success.localidade,
              estado: success.uf,
              numero: '',
              cep: success.cep,
              complemento: ''});
            console.log(this.orderForm.value);
          }
        }
      );
    }

  }
  log(event){
    console.log(event.target.value);
    this.orderForm.get('expiracaoCartao').setValue(event.target.value);
    console.log(this.orderForm.get('expiracaoCartao').value);
   }

  doOrder(){
    if (!this.orderForm.valid || !this.addressForm.valid){
      this.toastr.warning('Preencha corretamente todos os campos obrigatórios', 'Negado');
    }
    else {
      this.orderTo = {...this.orderForm.value};
      this.orderTo.endereco = {...this.addressForm.value};
      this.orderTo.valorTotal = this.cartItems.totalPrice;
      this.orderTo.voucherCodigo = this.cartItems.voucher.codigo;
      this.orderTo.voucherUtilizado = this.cartItems.voucherUtilizado;
      this.orderTo.desconto = this.cartItems.desconto;
      console.log(this.orderTo);
      this.orderService.sentOrder(this.orderTo).subscribe(
        success => {
          console.log(success);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  addUnit(index: number){
    const item = this.cartItems.items[index];
    this.isLoaderRem = true;
    if (item.amount === 5){
      this.toastr.warning('Limite de até 5 unidades', 'Atenção');
      this.isLoaderRem = false;
    }
    else {
      item.amount++;
      this.cartService.updateCartItem(item).subscribe(
        success => {
          this.isLoaderRem = false;
          console.log(success);
        },
        error => {
          this.toastr.error('Ocorreu um erro inesperado, tente novamente mais tarde', 'Ops :(');
          this.isLoaderRem = false;
        }
      );
    }
  }

  removeUnit(index: number){
    const item = this.cartItems.items[index];
    item.amount--;
    this.isLoaderRem = true;
    if (item.amount === 1){
      if (!this.remove){
        this.toastr.warning('Isso irá remover do carrinho', 'Atenção');
        this.remove = true;
        this.isLoaderRem = false;
      }
      else {
        this.cartService.updateCartItem(item).subscribe(
          success => {
            this.remove = false;
            this.isLoaderRem = false;
          },
          error => {
            this.toastr.error('Ocorreu um erro inesperado, tente novamente mais tarde', 'Ops :(');
            this.isLoaderRem = false;
          }
        );
      }
    }
    else {
      this.cartService.updateCartItem(item).subscribe(
        success => {
          this.remove = false;
          this.isLoaderRem = false;
        },
        error => {
          this.isLoaderRem = false;
        }
      );
    }
  }

  removeItem(id){
    this.isLoaderRem = true;
    this.cartService.removeCartItem(id).subscribe(() => { this.isLoaderRem = true; });
  }

  expDateValidators(c: FormControl) {
    const monthAndYear = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

    return monthAndYear.test(c.value)
      ? null
      : {
          validateInput: {
            valid: false,
          },
        };
  }
}
