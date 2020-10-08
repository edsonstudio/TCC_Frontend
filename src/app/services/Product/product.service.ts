import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { v4 as Guid } from 'uuid';
import { BaseService } from '../base.service';

@Injectable({
    providedIn: 'root'
})

export class ProductService extends BaseService{

    constructor(private http: HttpClient) {
        super();
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.UrlAPIV1}/Products`, super.GetJsonAuthHeader());
    }

    getProductsByCategory(id: typeof Guid){
        return this.http.get<Product[]>(`${this.UrlAPIV1}/ProductsByCategory/${id}`, super.GetJsonAuthHeader());
    }

    getProduct(id: typeof Guid): Observable<Product>{
    return this.http.get<Product>(`${this.UrlAPIV1}/products/${id}`, super.GetJsonAuthHeader());
    }

    postProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.UrlAPIV1}/products`, product, super.GetJsonAuthHeader());
    }

    deleteProduct(id: typeof Guid): Observable<Product> {
       return this.http.delete<Product>(`${this.UrlAPIV1}/products/${id}`, super.GetJsonAuthHeader());
    }

    putProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.UrlAPIV1}/products/${product.id}`,
        product, this.GetJsonAuthHeader());
    }
}
