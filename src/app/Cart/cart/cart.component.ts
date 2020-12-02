import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cartm',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  bread: MenuItem[] = [
    {label: 'Produtos'},
    {label: 'Pedido'},
  ];
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  ngOnInit() {
    this.items = [
      {label: 'Carrinho', routerLink: 'carrinho'},
      {label: 'Endereço', routerLink: 'endereco'},
      {label: 'Pagamento', routerLink: 'pagamento'},
      {label: 'Finalizar', routerLink: 'confirmar'}
  ];
    console.log('estou aqui');
  }

}
