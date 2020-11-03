import { Guid } from 'guid-typescript';

export class CartItem {
    pedidoId?: Guid;
    productId: Guid;
    name: string;
    price: number;
    image: string;
    amount: number;
    categoryId?: Guid;
}
