import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MessageService, PrimeNGConfig, MenuItem } from 'primeng/api';
import { Product } from 'src/app/models/Product';
import { Profile } from 'src/app/models/User';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { ChatService } from 'src/app/services/Chat/chat.service';
import { CommumMethods } from 'src/app/services/commum-methods';
import { ProductService } from 'src/app/services/Product/product.service';
import { AccountService } from 'src/app/services/User/user.service';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends CommumMethods implements OnInit, AfterViewInit {
  constructor(
    private acts: AccountService,
    private spinner: NgxSpinnerService,
    private chatService: ChatService,
    private cart: CartService,
    private productService: ProductService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {
      super();
     }

  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  uniqueID: string;
  profile: Profile;
  admin: boolean;
  subscription: Subscription;
  products: Product[];
  nwProducst: Product[];
  bread: MenuItem[] = [
    {label: 'Inicio'}
  ];
  urlImg = environment.images;
  sliderOpt: SwiperOptions = {
    direction: 'horizontal',
    mousewheel: true,
    effect: 'fade',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    },
    allowTouchMove: true,
    observer: true
  };
  sliderOpt3: SwiperOptions = {
    direction: 'horizontal',
    mousewheel: true,
    effect: 'coverflow',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    observer: true
  };
  ngOnInit(): void {
    this.spinner.show();
    this.admin = this.isAdmin();
    this.primengConfig.ripple = true;
    this.uniqueID = this.chatService.LocalStorage.getUserToken();
    if (this.uniqueID){
      this.subscription = this.cart.getCart$.subscribe();
      this.chatService.getProfile(this.uniqueID).subscribe(prof => this.profile = prof);
    }
    this.productService.getProducts().subscribe(prs => {
      this.products = prs;
      const px = prs.filter(pr => {
        const diference = new Date().getTime() - new Date(pr.registerDate).getTime();
        const diferenceDays = (diference / ( 1000 * 3600 * 24)).toFixed(0);
        if (Number(diferenceDays) <= 5){
            return pr;
        }
      });
      if (px.length > 5){
          px.length = 5;
      }
      this.nwProducst = px;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  logout(){
    this.acts.LocalStorage.cleanUserLocalData();
  }

  nav(){
    this.router.navigate(['produtos/meu-setup'], {relativeTo: this.route});
  }

  nav2(){
    this.router.navigate(['produtos/todos'], {relativeTo: this.route});
  }

  showConfirm() {
    this.clearMessages();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Necessário Login', detail: 'Fazer Login ?'});
  }

  clearMessages(){
    this.messageService.clear();
  }

  showCustom(product?: Product) {
    this.clearMessages();
    this.messageService.add({severity: 'custom', summary: 'Show!', detail: `${product.name} adicionado ao carrinho`, icon: 'pi-shopping-cart'});
  }

  navigateToLogin(){
    this.messageService.clear();
    this.router.navigate(['Inicio/conta/entrar']);
  }

  buyItem(product: Product){
    if (!this.productService.LocalStorage.getUser()){
      this.showConfirm();
    }
    else {
      this.cart.getCart$.toPromise().then(cartItems => {
        const prod = cartItems.items.find(cartItem => cartItem.productId === product.id);
        if (prod) {
          this.showCustom(product);
          this.subscription.unsubscribe();
          this.router.navigate(['produtos/pedido/carrinho'], {relativeTo: this.route});
        }
        else {
          const caartIt: CartItem = {
            amount: 1,
            image: product.image,
            name: product.name,
            price: product.price,
            productId: product.id,
            categoryId: product.categoryId
          };
          this.cart.postCartItem(caartIt).toPromise().then(() => {
              this.showCustom(product);
              this.subscription.unsubscribe();
              this.router.navigate(['produtos/pedido/carrinho'], {relativeTo: this.route});
          });
        }
      });
    }
  }

  adminN(){
    this.router.navigate(['admin'], {relativeTo: this.route});
  }

  adminS(){
    this.router.navigate(['suporte/chat'], {relativeTo: this.route});
  }
}
