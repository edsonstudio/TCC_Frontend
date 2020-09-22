import { v4 as Guid } from 'uuid';
import { AssociatedProducts } from './AssociatedProducts';

export class Product {
    id?: Guid;
    categoryId?: Guid;
    categoryName?: string;
    name: string;
    active: boolean;
    description: string;
    model: string;
    brand: string;
    price: number;
    amount: number;
    registerDate?: Date;
    image: string;
    imageUpload: string;

    associatedProduct?: AssociatedProducts[];
}

