import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod, Order, OrderToCreate } from '@app/models';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs';

@Injectable()
export class CheckoutService {
    baseUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }
  
    createOrder(order: OrderToCreate) {
        return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
    }
  
    getDeliveryMethods() {
        return this.httpClient.get<DeliveryMethod[]>(`${this.baseUrl}/orders/deliveryMethods`).pipe(
                map(dm => {
                return dm.sort((a, b) => b.price - a.price)
            })
        );
    }
}
