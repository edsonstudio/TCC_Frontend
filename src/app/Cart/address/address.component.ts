import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Address } from 'src/app/models/Address';
import { Store } from 'src/app/Products/cart.store';
import { OrderService } from 'src/app/services/Cart_Order/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, AfterViewInit {

  @ViewChild('inpCep') someInput: ElementRef;
  constructor(
    private fb: FormBuilder,
    private order: OrderService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
    ) { }

  addressForm: FormGroup;
  blocked = true;
log(){console.log('oxe')}
  ngOnInit(): void {
    this.validate();
    this.store.getAddress().subscribe(response => {
      if (response.cep){
        this.addressForm.setValue({
          logradouro: response.logradouro,
          bairro: response.bairro,
          cidade: response.cidade,
          cep: response.cep,
          estado: response.estado,
          complemento: response.complemento,
          numero: response.numero
        });
      }
      this.blocked = false;
    });
  }

  ngAfterViewInit(): void {
    this.someInput.nativeElement.focus();
    this.someInput.nativeElement.click();
  }

  calcShipping(){
    if (this.addressForm.get('cep').valid){
      const cep = this.addressForm.get('cep').value;

      this.order.CEP(cep).subscribe(
        success => {
          if (success.hasOwnProperty('erro')){
            this.messageService.add({summary: 'Atenção', detail: 'CEP Inválido', severity: 'warn'});
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
          }
        }
      );
    }

  }

  nextPage(){
    const form = this.addressForm.value;
    const address = new Address();
    address.cep = form.cep,
    address.cidade = form.cidade,
    address.complemento = form.complemento,
    address.numero = form.numero,
    address.logradouro = form.logradouro,
    address.bairro = form.bairro,
    address.estado = form.estado;
    this.store.setAddress(form);
    this.router.navigate(['/Inicio/produtos/pedido/pagamento']);
  }

  prevPage(){
    this.router.navigate(['../carrinho'], {relativeTo: this.route});
  }

  validate(){
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


}
