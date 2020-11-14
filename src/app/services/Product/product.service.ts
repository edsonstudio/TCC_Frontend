import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { BaseService } from '../base.service';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/Products/cart.store';
import { AssociatedProducts } from 'src/app/models/AssociatedProducts';

@Injectable({
    providedIn: 'root'
})

export class ProductService extends BaseService{

    constructor(
        private http: HttpClient,
        private store: Store) {
        super();
    }

    getProductsStore$: Observable<Product[]> = this.http.get<Product[]>(`${this.UrlAPIV1}/Products`, super.GetJsonAuthHeader())
        .pipe(tap(next => this.store.setProducts(next)));

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.UrlAPIV1}/Products`, super.GetJsonAuthHeader());
    }

    getProduct(id: Guid): Observable<Product>{
    return this.http.get<Product>(`${this.UrlAPIV1}/products/${id}`, super.GetJsonAuthHeader());
    }

    postProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.UrlAPIV1}/products`, product, super.GetJsonAuthHeader());
    }

    deleteProduct(id: Guid): Observable<Product> {
       return this.http.delete<Product>(`${this.UrlAPIV1}/products/${id}`, super.GetJsonAuthHeader());
    }

    putProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.UrlAPIV1}/products/${product.id}`,
        product, this.GetJsonAuthHeader());
    }

    postAssociate(associate: AssociatedProducts): Observable<AssociatedProducts>{
        return this.http.post<AssociatedProducts>(`${this.UrlAPIV1}/AssociatedProducts`, associate, super.GetJsonAuthHeader());
    }

    getAssociates(): Observable<AssociatedProducts[]>{
        return this.http.get<AssociatedProducts[]>(`${this.UrlAPIV1}/AssociatedProducts`, super.GetJsonAuthHeader());
    }

    deleteAssociates(id: Guid): Observable<AssociatedProducts>{
        return this.http.delete<AssociatedProducts>(`${this.UrlAPIV1}/AssociatedProducts/${id}`, super.GetJsonAuthHeader());
    }
}
