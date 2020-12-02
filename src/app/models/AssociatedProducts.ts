import { Guid } from 'guid-typescript';
import { Product } from './Product';

export class AssociatedProducts {
    id: Guid;
    productFather: Product;
    productSon: Product;
}
