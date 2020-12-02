import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  constructor(
    public config: DynamicDialogConfig,
    private cartService: CartService,
    private router: Router
  ) {
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
  mySubscription: any;
  urlImages = environment.images;
  items: CartItem[];
  ngOnInit(): void {
    this.items = this.config.data.cartItems;
  }

  removeItem(id){
    this.cartService.removeCartItem(id).subscribe(success => this.ngOnInit());
  }

}
