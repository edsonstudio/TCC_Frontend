import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/app/Products/cart.store';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'ngx-custom-validators';
import { Payment } from 'src/app/models/Order';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('inpCard') someInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  orderForm: FormGroup;
  subscription: Subscription;
  payment: Payment;

 ngOnInit() {
    this.validate();
    this.store.getPayment().subscribe(payment => {
      if (payment.numeroCartao){
        this.orderForm.setValue({
          numeroCartao: payment.numeroCartao,
          nomeCartao: payment.nomeCartao,
          expiracaoCartao: payment.expiracaoCartao,
          cvvCartao: payment.cvvCartao
        });

      }
    });
  }

  ngAfterViewInit(): void {
    this.someInput.nativeElement.focus();
  }

  nextPage(){
    const form: Payment = this.orderForm.value;
    const paym = new Payment();
    paym.cvvCartao = form.cvvCartao,
    paym.expiracaoCartao = form.expiracaoCartao,
    paym.nomeCartao = form.nomeCartao,
    paym.numeroCartao = form.numeroCartao;
    this.store.setPayment(paym);
    this.router.navigate(['/Inicio/produtos/pedido/confirmar']);
  }

  validate(){
    this.orderForm = this.fb.group({
      numeroCartao: ['', [Validators.required, CustomValidators.creditCard]],
      nomeCartao: ['', [Validators.required, Validators.minLength(8)]],
      expiracaoCartao: ['', [Validators.required, this.expDateValidators, Validators.minLength(4)]],
      cvvCartao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  log(event){
    console.log(event.target.value);
    this.orderForm.get('expiracaoCartao').setValue(event.target.value);
    console.log(this.orderForm.get('expiracaoCartao').value);
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

  prevPage(){
    this.router.navigate(['../endereco'], {relativeTo: this.route});
  }
}
