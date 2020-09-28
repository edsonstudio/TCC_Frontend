import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/Category/category.service';
import { ProductService } from 'src/app/services/Product/product.service';
import { environment } from 'src/environments/environment';
import { v4 as Guid } from 'uuid';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: { "(window:resize)":"onWindowResize($event)" }
})
export class ProductsComponent implements OnInit {

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

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAll();
    this.getCategories();
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    console.log(this.width);
}

  filterProducts(id: Guid, brand: string){
    this.categoryService.getCategory(id).subscribe(ct => {
      this.products = ct.products.filter(pr => pr.brand === brand);
    });
  }

  filterPrCategory(id: Guid){
    this.categoryService.getCategory(id).subscribe(ct => {
      this.products = ct.products;
    });
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
      }else {this.colums = pr.length; }
      console.log(this.colums);
    });
  }

  Brands(category: Category){
    const brands: Product[] = [];

    category.products.forEach(vl => {
      if (category.products.filter(pr => pr.brand === vl.brand).length <= 1) { brands.push(vl); }
    });

    return brands;
  }

}
