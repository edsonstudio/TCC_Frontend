import { Guid } from 'guid-typescript';

export class CartItem {
    productId: Guid;
    name: string;
    price: number;
    image: string;
    amount: number;
    categoryId?: Guid;
}
