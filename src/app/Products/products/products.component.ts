import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MenuItem, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { CartItem } from 'src/app/models/CartItem';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CategoryService } from 'src/app/services/Category/category.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { environment } from 'src/environments/environment';
import { Store } from '../cart.store';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductComponent } from '../product/product.component';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommumMethods } from 'src/app/services/commum-methods';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: { "(window:resize)": "onWindowResize($event)" }
})
export class ProductsComponent extends CommumMethods implements OnInit, AfterViewInit {

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private store: Store,
    private cart: CartService,
    private messageService: MessageService,
    private dialogService: DialogService
    ) {
      super();
    }


  val = 0;
  display = true;
  warningLogin = false;
  addItem = false;
  prlength: number;
  win = window;
  actualPag = 1;
  search: string;
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  images = environment.images;
  faSearch = faSearch;
  displayy = false;
  colums: number;
  products: Product[];
  mainProducts: Product[];
  categories: Category[];
  bread: MenuItem[] = [
    {label: 'Produtos'},
    {label: 'Todos'},
  ];
  sortOptions: SelectItem[];
  subscription: Subscription;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  sortOrder: number;
  sortField: string;
  cartItems: number;

  _pag = 4;
  get pag(){
    return this._pag;
  }
  set pag(value){
    this._pag = value;
  }

  ngOnInit() {
    this.spinner.show('initial');
    this.primengConfig.ripple = true;
    this.getAll();
    this.getCategories();
    this.sortOptions = [
      {label: 'Preço Crescente', value: 'price'},
      {label: 'Preço Decrescente', value: '!price'}
  ];
    this.subscription = this.cart.getCart$.subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide('initial');
    }, 1500);
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
}

  filterProducts(category: Category, brand: string){
    this.products = category.products.filter(pr => pr.brand === brand);
  }

  filterPrCategory(category: Category){
    this.products = category.products;
  }

  xx(){
    this.displayy = true;
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  getAll(){
    this.productService.getProducts().subscribe((pr: Product[]) => {
      this.products = pr;
      this.mainProducts = pr;
    });
  }

  Brands(category: Category){
    const strings = new Array<string>();
    category.products.forEach(pr => strings.push(pr.brand));

    return strings.filter((brand, index) => strings.indexOf(brand) === index);
  }

  Navigate(product: Product){
   this.router.navigate([`Inicio/produtos/todos/${product.id}`]);
  }

  onWheel(event: WheelEvent): void {
    (event.target as Element).parentElement.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  show(productt: Product){
    const ref = this.dialogService.open(ProductComponent, {
      data: {
        product: productt
      },
      width: '70%'
    });
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  navigateToLogin(){
    this.messageService.clear();
    this.router.navigate(['Inicio/conta/entrar']);
  }

  showCustom(product?: Product) {
    this.clearMessages();
    this.messageService.add({severity: 'custom', summary: 'Show!', detail: `${product.name} adicionado ao carrinho`, icon: 'pi-shopping-cart'});
  }

  showConfirm() {
    this.clearMessages();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Necessário Login', detail: 'Fazer Login ?'});
  }

  clearMessages(){
    this.messageService.clear();
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
          });
        }
      });
    }
  }

}
