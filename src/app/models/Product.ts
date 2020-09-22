import { v4 as Guid } from 'uuid';

export class ProductVM {
    id: Guid;
    categoryId: Guid;
    categoryName: string;
    name: string;
    active: boolean;
    description: string;
    model: string;
    brand: string;
    price: number;
    amount: number;
    registerDate: Date;
    image: string;
    imageUpload: string;

    associatedProduct: [];
}

export class ProductIN {
    categoryId: Guid;
    name: string;
    active: boolean;
    description: string;
    model: string;
    brand: string;
    price: number;
    amount: number;
    registerDate: Date;
    image: string;
    imageUpload: string;
}

