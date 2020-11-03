import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/Cart';

export interface State {
    cart: Cart;
    cep: string;
}

const state: State = {
    cart: {},
    cep: ''
};

export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable();

    get value(){
        return this.subject.value;
    }

    set(name: string, state: any){
        this.subject.next({
            ...this.value, [name]: state
        });
    }

    setCep(cepS){
        this.subject.next({
            ...this.value, cep: cepS
        });
    }

    public getCep(): Observable<string>{
        return this.store
            .pipe(map(store => store.cep));
    }

    public getCart(): Observable<Cart>{
        return this.store
            .pipe(map(store => store.cart));
    }
}
