import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommumMethods } from 'src/app/services/commum-methods';
import { environment } from 'src/environments/environment';
import { Product } from './../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends CommumMethods implements OnInit {

  images = environment.images;
  product: Product;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private routeS: Router) {
    super();
    this.LoadingSpinner(this.routeS, this.spinner);
  }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

}
