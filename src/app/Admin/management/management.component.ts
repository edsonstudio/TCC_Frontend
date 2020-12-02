import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { Store } from 'src/app/Products/cart.store';
import { ProductService } from 'src/app/services/Product/product.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private store: Store)
    { }

  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  bread: MenuItem[] = [
    {label: 'Administração'}
  ];
  _opened: boolean = false;
  section = 'products';
  products$: Observable<Product[]>;
  subscription: Subscription;

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  ngOnInit() {
    this.products$ = this.store.getProducts();
    this.subscription = this.productService.getProductsStore$.subscribe();
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  reload(){
    this.ngOnInit();
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

}
