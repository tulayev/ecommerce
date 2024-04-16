import { createId } from '@paralleldrive/cuid2';

export interface CartItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Cart {
    id: string;
    items: CartItem[];
}

export class Cart implements Cart {
    id = createId();
    items: CartItem[] = [];
}

export interface CartTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
