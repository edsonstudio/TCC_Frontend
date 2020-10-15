import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from '../base.service';
import { CartItem } from 'src/app/models/CartItem';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/Products/cart.store';

@Injectable({
    providedIn: 'root'
})
export class CartService extends BaseService {
    constructor(private http: HttpClient, private store: Store){
        super();
    }

    getCartItems$: Observable<CartItem[]> = this.http.get<CartItem[]>(`${this.UrlShopping}/carrinho`)
    .pipe(tap(next => this.store.set('cartItems', next)));

    postCartItem(item): Observable<CartItem>{
       return this.http.post<CartItem>(`${this.UrlShopping}/carrinho/items`, item, this.GetJsonAuthHeader());
    }

    frete(cepOrigem, cepDestino, peso, comprimento, altura, largura, servico){
        const url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';

        const param = new HttpParams({
            fromObject: {
                nCdEmpresa: '08082650',
                sDsSenha: '564321',
                sCepOrigem: cepOrigem,
                sCepDestino: cepDestino,
                nVlPeso: peso,
                nCdFormato: '1',
                nVlComprimento: comprimento,
                nVlAltura: altura,
                nVlLargura: largura,
                nVlValorDeclarado: '0',
                sCdAvisoRecebimento: 'n',
                nCdServico: servico,
                nVlDiametro: '0',
                StrRetorno: 'xml'
            }
        });
        return this.http.get(url, { params: param, responseType: 'text'});
    }


}
