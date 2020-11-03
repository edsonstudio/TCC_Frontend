import { CartItem } from './CartItem';
import { Voucher } from './Voucher';

export class Cart {
    totalPrice?: number;
    voucher?: Voucher;
    voucherUtilizado?: boolean;
    desconto?: number;
    items?: CartItem[];
}
