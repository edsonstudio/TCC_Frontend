import { v4 as Guid } from 'uuid';
import { ProductVM } from './Product';

export class CategoryVM {
    id: Guid;
    name: string;
    products: ProductVM[];
}

export class CategoryIN {
    name: string;
}
