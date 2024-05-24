import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    private apiUrl = environment.apiUrl;
    
    constructor(private readonly httpClient: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.apiUrl}/dashboard/products`);
    }

    createProduct(formData: FormData): Observable<Product> {
        return this.httpClient.post<Product>(`${this.apiUrl}/dashboard/products`, formData);
    }

    deleteProduct(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/dashboard/products/${id}`);
    }
}
