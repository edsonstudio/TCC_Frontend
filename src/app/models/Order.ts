import { Address } from './Address';
import { CartItem } from './CartItem';

export class Order {
    codigo: number;
    status: number;
    data: string;
    valorTotal: number;
    desconto: number;
    voucherCodigo: string;
    voucherUtilizado: boolean;
    pedidoItems: CartItem[];
    Endereco: Address;
    numeroCartao: string;
    nomeCartao: string;
    expiracaoCartao: string;
    cvvCartao: string;
}

export class Payment {
    numeroCartao: string;
    nomeCartao: string;
    expiracaoCartao: string;
    cvvCartao: string;
}
