import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Address } from 'src/app/models/Address';

@Injectable()

export class OrderService extends BaseService {
    constructor(private http: HttpClient){
        super();
    }

    postAddress(ads: Address): Observable<Address>{
        return this.http.post<Address>(`${this.UrlClient}`, ads, this.GetJsonAuthHeader());
    }

    applyVoucher(codeV){
        return this.http.post(`${this.UrlShopping}/carrinho/aplicar-voucher`, JSON.stringify(codeV), this.GetJsonAuthHeader())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }

    sentOrder(order){
        console.log( JSON.stringify(order));
        return this.http.post(`${this.UrlShopping}/pedido`, JSON.stringify(order), this.GetJsonAuthHeader());
    }

    CEP(cep: string): Observable<AdResponse> {

        console.log(cep);
        cep = cep.replace(/\D/g, '');
        if (cep !== '') {

          const validacep = /^[0-9]{8}$/;
          // Valida o formato do CEP.
          if (validacep.test(cep)) {
            return this.http.get(`//viacep.com.br/ws/${cep}/json`);
          }
        }
        return of({});
      }
}

interface AdResponse {
    bairro?: string;
    cep?: string;
    complemento?: string;
    ddd?: string;
    gia?: string;
    ibge?: string;
    localidade?: string;
    logradouro?: string;
    siafi?: string;
    uf?: string;
}
