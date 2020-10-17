import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/Category/category.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: { "(window:resize)":"onWindowResize($event)" }
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) { }

  prlength: number;
  win = window;
  actualPag = 1;
  search: string;
  images = environment.images;
  faSearch = faSearch;
  colums: number;
  products: Product[];
  categories: Category[];
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  _pag = 4;
  get pag(){
    return this._pag;
  }
  set pag(value){
    this._pag = value;
  }

  ngOnInit() {
    this.getAll();
    this.getCategories();
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    console.log(this.width);
}

  filterProducts(category: Category, brand: string){
    this.products = category.products.filter(pr => pr.brand === brand);
  }

  filterPrCategory(category: Category){
    this.products = category.products;
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  getAll(){
    this.productService.getProducts().subscribe((pr: Product[]) => {
      this.products = pr;
      if (pr.length % 2 > 0){
        this.colums = (pr.length + 1) / 2;
      }else {this.colums = pr.length / 2; }
      this.prlength = pr.length;
    });
  }

  Brands(category: Category){
    const brands: Product[] = [];

    category.products.forEach(vl => {
      if (category.products.filter(pr => pr.brand === vl.brand).length <= 1) { brands.push(vl); }
    });

    return brands;
  }

  Navigate(product: Product){
   this.router.navigate([`Inicio/produtos/todos/${product.id}`]);
  }

}
