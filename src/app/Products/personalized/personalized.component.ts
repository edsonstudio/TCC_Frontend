import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssociatedProducts } from 'src/app/models/AssociatedProducts';
import { CartItem } from 'src/app/models/CartItem';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CategoryService } from 'src/app/services/Category/category.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { SwiperOptions } from 'swiper';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss']
})
export class PersonalizedComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router) { }

  amountForm: FormGroup;
  images = environment.images;
  showMotherboards = false;
  showConfig = false;
  brand: string;
  products: Product[];
  associatedProducts: AssociatedProducts[];
  categories: Category[];
  productPersonalized: CartItem[];
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
    loop: true
  };

  ngOnInit(): void {
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
    this.productPersonalized = [];
    this.amountForm = this.fb.group({
      amountPr: ''
    });
  }

  filterProductsCat(categoryName: string): Product[]{
    return this.categories.find(cat => this.removeAccent(cat.name) === this.removeAccent(categoryName)).products
    .filter(product => product.brand.toLowerCase() === this.brand.toLowerCase());
  }

  filterAssociatedProducts(product: Product): Product[]{
    this.showConfig = true;
    return product.associatedProduct.map(associated => associated.productSon);
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
 }

 addToCart(product: Product){
  const amountPr = this.amountForm.get(`amountPr`).value;
  console.log(amountPr);

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

    const brItem = {
      nome: product.name,
      quantidade: amountPr,
      imagem: product.image,
      valor: product.price,
      produtoId: product.id
    };

    // this.cartService.postCartItem(brItem).subscribe();
  }

 }

 navigate(){
   this.route.navigate(['Inicio/produtos/carrinho']);
 }
}
