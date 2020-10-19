import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolve implements Resolve<Product>{

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.getProduct(route.params.id);
    }
}
