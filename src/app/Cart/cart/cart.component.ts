import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cartm',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  items: MenuItem[];
  bread: MenuItem[] = [
    {label: 'Produtos'},
    {label: 'Pedido'},
  ];
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  ngOnInit() {
    this.spinner.show();
    this.items = [
      {label: 'Carrinho', routerLink: 'carrinho'},
      {label: 'Endereço', routerLink: 'endereco'},
      {label: 'Pagamento', routerLink: 'pagamento'},
      {label: 'Finalizar', routerLink: 'confirmar'}
  ];
    console.log('estou aqui');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

}
