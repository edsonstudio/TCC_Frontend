import { v4 as Guid } from 'uuid';
import { Product } from './Product';

export class AssociatedProducts {
    id: typeof Guid;
    productFather: Product;
    productSon: Product;
}
