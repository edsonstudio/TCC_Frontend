import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from 'src/app/Products/cart.store';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class OrderGuard implements CanActivate{

    localStorageUtils = new LocalStorageUtils();

    constructor(
        private router: Router,
        private store: Store){}

    async canActivate(){
        if (this.localStorageUtils.getUserToken()){
          const numb = await this.store.getCart().toPromise().then(cart => cart.items.length);
          if (numb < 1){
              this.router.navigate(['/Inicio/produtos/carrinho']);
          }
          return true;
        }
    }
}
