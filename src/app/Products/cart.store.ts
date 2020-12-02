import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../models/Address';
import { Cart } from '../models/Cart';
import { Payment } from '../models/Order';
import { Product } from '../models/Product';

export interface State {
    cart: Cart;
    cep: string;
    products: Product[];
    address: Address;
    payment: Payment;
}

const state: State = {
    cart: {},
    cep: '',
    products: [],
    address: new Address(),
    payment: new Payment()
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

    setProducts(productl: Product[]){
        this.subject.next({
            ...this.value, products: productl
        });
    }

    setAddress(ads: Address){
        this.subject.next({
            ...this.value, address: ads
        });
    }

    public getAddress(): Observable<Address>{
        return this.store
            .pipe(map(store => store.address));
    }

    setPayment(paym: Payment){
        this.subject.next({
            ...this.value, payment: paym
        });
    }

    public getPayment(): Observable<Payment>{
        return this.store
            .pipe(map(store => store.payment));
    }

    public getProducts(): Observable<Product[]>{
        return this.store
            .pipe(map(store => store.products));
    }

    public getCart(): Observable<Cart>{
        return this.store
            .pipe(map(store => store.cart));
    }
}
