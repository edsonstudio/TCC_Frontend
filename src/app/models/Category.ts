import { Guid } from 'guid-typescript';
import { Product } from './Product';

export class Category {
    id?: Guid;
    name?: string;
    products?: Product[];
}
