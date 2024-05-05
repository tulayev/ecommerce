import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }
  
    getOrdersForUser(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(`${this.apiUrl}/orders`);
    }
    
    getOrderDetailed(id: number): Observable<Order> {
        return this.httpClient.get<Order>(`${this.apiUrl}/orders/${id}`);
    }
}
