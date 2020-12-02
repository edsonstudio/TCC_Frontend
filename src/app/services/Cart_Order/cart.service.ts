import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from '../base.service';
import { CartItem } from 'src/app/models/CartItem';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/Products/cart.store';
import { Cart } from 'src/app/models/Cart';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class CartService extends BaseService {
    constructor(private http: HttpClient, private store: Store){
        super();
    }

    getCart$: Observable<Cart> = this.http.get<Cart>(`${this.UrlShopping}/carrinho`, this.GetJsonAuthHeader())
        .pipe(tap(next => this.store.set('cart', next)));

    cartAmount(): Observable<number>{
        return this.http.get<number>(`${this.UrlShopping}/carrinho-quantidade`, this.GetJsonAuthHeader());
    }

    postCartItem(item: CartItem): Observable<CartItem>{
       return this.http.post<CartItem>(`${this.UrlShopping}/carrinho/items`, item, this.GetJsonAuthHeader());
    }

    removeCartItem(id: Guid): Observable<CartItem>{
        return this.http.delete<CartItem>(`${this.UrlShopping}/carrinho/items/${id}`, this.GetJsonAuthHeader());
    }

    updateCartItem(item: CartItem): Observable<CartItem>{
        return this.http.put<CartItem>(`${this.UrlShopping}/carrinho/items/${item.productId}`, item, this.GetJsonAuthHeader());
    }

    frete(cepDestino){
        const url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';

        const param = new HttpParams({
            fromObject: {
                nCdEmpresa: '08082650',
                sDsSenha: '564321',
                sCepOrigem: '05888050',
                sCepDestino: cepDestino,
                nVlPeso: '5',
                nCdFormato: '1',
                nVlComprimento: '18',
                nVlAltura: '18',
                nVlLargura: '18',
                nVlValorDeclarado: '0',
                sCdAvisoRecebimento: 'n',
                nCdServico: '04510',
                nVlDiametro: '0',
                StrRetorno: 'xml'
            }
        });
        return this.http.get(url, { params: param, responseType: 'text'});
    }


}
