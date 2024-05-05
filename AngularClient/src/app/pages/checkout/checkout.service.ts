import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod, Order, OrderToCreate } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable()
export class CheckoutService {
    private apiUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }
  
    createOrder(order: OrderToCreate) {
        return this.httpClient.post<Order>(`${this.apiUrl}/orders`, order);
    }
  
    getDeliveryMethods(): Observable<DeliveryMethod[]> {
        return this.httpClient.get<DeliveryMethod[]>(`${this.apiUrl}/orders/deliveryMethods`).pipe(
                map(dm => {
                return dm.sort((a, b) => b.price - a.price)
            })
        );
    }
}
