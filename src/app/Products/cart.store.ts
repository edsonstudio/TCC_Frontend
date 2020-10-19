import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { map } from 'rxjs/operators';

export interface State {
    cartItems: CartItem[];
}

const state: State = {
    cartItems: []
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

    public getCartItems(): Observable<CartItem[]>{
        return this.store
            .pipe(map(store => store.cartItems));
    }
}
