import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolve implements Resolve<Product>{

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getProduct(route.params.id);
    }
}
