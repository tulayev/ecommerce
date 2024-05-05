import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, Product, ProductBrand, ProductType, ShopQueryParams } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ShopService {
    private apiUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }

    getProducts(shopQueryParams: ShopQueryParams): Observable<Pagination<Product[]>> {
        let params = new HttpParams();

        if (shopQueryParams.brandId > 0) 
            params = params.append('brandId', shopQueryParams.brandId);
        
        if (shopQueryParams.typeId) 
            params = params.append('typeId', shopQueryParams.typeId);
        
        params = params.append('sort', shopQueryParams.sort);
        params = params.append('pageNumber', shopQueryParams.pageNumber);
        params = params.append('pageSize', shopQueryParams.pageSize);
        
        if (shopQueryParams.search) 
            params = params.append('search', shopQueryParams.search);

        return this.httpClient.get<Pagination<Product[]>>(`${this.apiUrl}/products`, { params });
    }

    getProduct(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.apiUrl}/products/${id}`);
    }

    getProductBrands(): Observable<ProductBrand[]> {
        return this.httpClient.get<ProductBrand[]>(`${this.apiUrl}/products/brands`);
    }

    getProductTypes(): Observable<ProductType[]> {
        return this.httpClient.get<ProductType[]>(`${this.apiUrl}/products/types`);
    }
}
