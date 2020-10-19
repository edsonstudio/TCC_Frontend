import { Address } from './Address';
import { CartItem } from './CartItem';

export class Order {
    code: number;
    status: number;
    date: Date;
    totalPrice: number;
    discount: number;
    codeVoucher: string;
    usedVoucher: boolean;
    itensOrder: CartItem[];
    address: Address;
    cardNumber: string;
    cardName: string;
    cardExp: string;
    cardCVV: string;
}
