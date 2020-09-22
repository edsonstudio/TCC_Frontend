import { v4 as Guid } from 'uuid';
import { Product } from './Product';

export class Category {
    id?: Guid;
    name: string;
    products?: Product[];
}
