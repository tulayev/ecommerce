import { Address } from '../user/address';

export interface OrderToCreate {
    cartId: string;
    deliveryMethodId: number;
    shipToAddress: Address;
}
