import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/Cart_Order/order.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  event = new Array<any>();
  bread: MenuItem[] = [
    { label: 'Conta' },
    { label: 'Pedidos' }
  ];
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  orders: Order[];
  order = new Order();
  urlImages = environment.images;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.spinner.show('initial');
    this.orderService.getOrder().toPromise().then(orders => {
      this.orders = orders;
      const ord = orders[0];
      this.order = ord;
      this.event.push({
        status: 'Solicitado', date: ord.data, icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0',
        image: `${this.urlImages}/${ord.pedidoItems[0].image}`
      });
      switch (ord.status){
        case 1:
          this.event.push({
            status: 'Autorizado', date: ord.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
          });
          break;
        case 2:
          this.event.push({
            status: 'Autorizado', date: ord.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
          });
          this.event.push({
            status: 'Pago', date: ord.data, icon: PrimeIcons.MONEY_BILL, color: '#22a71d'
          });
          break;

        case 3:
          this.event.push({
            status: 'Recusado', date: ord.data, icon: PrimeIcons.TIMES, color: '#df2323'
          });
          break;

        case 4:
          this.event.push({
            status: 'Autorizado', date: ord.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
          });
          this.event.push({
            status: 'Pago', date: ord.data, icon: PrimeIcons.MONEY_BILL, color: '#22a71d'
          });
          this.event.push({
            status: 'Entregue', date: ord.data, icon: 'fad fa-shopping-cart', color: '#22a71d'
          });
          break;

        case 5:
          this.event.push({
            status: 'Cancelado', date: ord.data, icon: PrimeIcons.TIMES, color: '#22a71d'
          });
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide('initial');
    }, 1500);
  }

  setOrder(order: Order){
    this.event = [];
    this.order = order;
    this.event.push({
      status: 'Solicitado', date: order.data, icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0',
      image: `${this.urlImages}/${order.pedidoItems[0].image}`
    });
    switch (order.status){
      case 1:
        this.event.push({
          status: 'Autorizado', date: order.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
        });
        break;
      case 2:
        this.event.push({
          status: 'Autorizado', date: order.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
        });
        this.event.push({
          status: 'Pago', date: order.data, icon: PrimeIcons.MONEY_BILL, color: '#22a71d'
        });
        break;

      case 3:
        this.event.push({
          status: 'Recusado', date: order.data, icon: PrimeIcons.TIMES, color: 'red'
        });
        break;

      case 4:
        this.event.push({
          status: 'Autorizado', date: order.data, icon: PrimeIcons.CHECK_SQUARE, color: '#22a71d'
        });
        this.event.push({
          status: 'Pago', date: order.data, icon: PrimeIcons.MONEY_BILL, color: '#22a71d'
        });
        this.event.push({
          status: 'Entregue', date: order.data, icon: 'fad fa-shopping-cart', color: '#22a71d'
        });
        break;

      case 5:
        this.event.push({
          status: 'Cancelado', date: order.data, icon: PrimeIcons.TIMES, color: '#22a71d'
        });
    }
  }

  navigatePr(){
    this.router.navigate(['Inicio/produtos/todos']);
  }

}
