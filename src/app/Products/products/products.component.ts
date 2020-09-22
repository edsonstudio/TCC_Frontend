import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  faSearch = faSearch;
  colums = 5;
  product: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((pr: Product[]) => {
      this.product = pr[0];
    });
  }

}
