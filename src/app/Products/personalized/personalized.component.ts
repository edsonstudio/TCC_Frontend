import { Component, OnInit } from '@angular/core';
import { AssociatedProducts } from 'src/app/models/AssociatedProducts';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
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

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  images = environment.images;
  showMotherboards = false;
  showConfig = false;
  brand: string;
  products: Product[];
  associatedProducts: AssociatedProducts[];
  categories: Category[];
  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true
  };

  ngOnInit(): void {
    this.productService.getProducts().subscribe((prs: Product[]) => {
      this.products = prs;
    });
    this.categoryService.getCategories().subscribe((cts: Category[]) => {
      this.categories = cts;
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

}
