import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { AssociatedProducts } from 'src/app/models/AssociatedProducts';
import { CartItem } from 'src/app/models/CartItem';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CategoryService } from 'src/app/services/Category/category.service';
import { CommumMethods } from 'src/app/services/commum-methods';
import { ProductService } from 'src/app/services/Product/product.service';
import { SwiperOptions } from 'swiper';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss']
})
export class PersonalizedComponent extends CommumMethods implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) {
      super();
      this.LoadingSpinner(this.router, this.spinner);
    }

  private stepper: Stepper;
  amountForm: FormGroup;
  images = environment.images;
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};
  bread: MenuItem[] = [
    {label: 'Produtos', routerLink: '/Inicio/produtos/todos'},
    {label: 'Setup'},
  ];
  showMotherboards = false;
  showConfig = false;
  brand: string;
  products = new Array<Product>();
  associatedProducts = new Array<AssociatedProducts>();
  categories = new Array<Category>();
  productPersonalized = new Array<CartItem>();
  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    effect: 'coverflow',
    allowTouchMove: false,
    loop: true,
    observer: true
  };
  selectedProduct: Product;
  selectedProduct2: Product;
  selectedProduct3: Product;
  selectedProduct4: Product;
  selectedProduct5: Product;
  selectedProduct6: Product;
  selectedProduct7: Product;
  selectedProduct8: Product;
  selectedProduct9: Product;
  selectedProduct10: Product;
  selectedProduct11: Product;
  selectedProduct12: Product;
  selectedProduct13: Product;

  ngOnInit(): void {
    const stepperEl = document.getElementById('stepper2');
    this.stepper = new Stepper(document.querySelector('#stepper2'), {
      linear: true,
      animation: true
    });
    stepperEl.addEventListener('show.bs-stepper', (event: CustomEvent) => {
      // You can call prevent to stop the rendering of your step
      // event.preventDefault()

      console.warn(event.detail);
    });

    this.productService.getProducts().subscribe((prs: Product[]) => {
      this.products = prs;
    });
    this.categoryService.getCategories().subscribe((cts: Category[]) => {
      this.categories = cts;
      const index = this.categories.findIndex(ct => ct.name === 'pc');
      if (index > -1) {
        this.categories.splice(index, 1);
      }
    });
    this.amountForm = this.fb.group({
      amountPr: [1]
    });
  }

  onRowSelect(event){
    console.log(event.data);
    console.log(this.amountForm.get('amountPr').value);
  }

  nex(pr, confi? ){
    if (confi){
      this.stepper.next();
    }
    else {
      this.addToCart(pr);
      this.stepper.next();
    }
  }

  prev(){
    this.stepper.previous();
  }

  filterProductsCat(categoryName: string, mode: number): Product[]{
    switch (mode){
      case 1:
        return this.categories.find(cat => this.removeAccent(cat.name) === this.removeAccent(categoryName))?.products;
        break;

      case 2:
        return this.selectedProduct?.associatedProducts
        .filter(pr => this.removeAccent(pr.productSon.categoryName) === this.removeAccent(categoryName));
        break;

      case 3:
        return this.categories.find(cat => this.removeAccent(cat.name) === this.removeAccent(categoryName))?.products
        .filter(product => product.brand?.toLowerCase() === this.brand?.toLowerCase());
        break;
    }
  }

  filterAssociatedProducts(product: Product): Product[]{
    return product.associatedProducts.map(associated => associated.productSon);
  }

  removeAccent(text: string): string{
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    text = text.replace(' ', '-');
    return text;
}

 chooseBrand(brand: string){
   this.brand = brand;
   this.showMotherboards = true;
   this.stepper.next();
 }

 addToCart(product: Product){
  const amountPr = this.amountForm.get(`amountPr`).value;

  if (amountPr < 1){
    this.toastr.error(`Adicione ao menos 1 ${product.categoryName} a tua máquina`, 'Quantia inválida');
  }
  else{
    const item: CartItem = {
      name: product.name,
      amount: amountPr,
      image: product.image,
      price: product.price,
      productId: product.id,
      categoryId: product.categoryId
    };

    const pr = this.productPersonalized.findIndex(ctI => ctI.categoryId === item.categoryId);
    if (pr > -1){
      this.productPersonalized.splice(pr, 1, item);
    }else {
      this.productPersonalized.push(item);
    }

  }
 }

 doSetup(){
   let confirm = 0;
   this.productPersonalized.forEach((product, index) => {
     const brItem: CartItem = {
      name: product.name,
      amount: 1,
      image: product.image,
      price: product.price,
      productId: product.productId
     };

     this.cartService.postCartItem(brItem).toPromise();
     confirm = index;
   });
   if (confirm === this.productPersonalized.length){
    this.router.navigate(['..pedido/carrinho'], { relativeTo: this.route });
   }
 }

}
