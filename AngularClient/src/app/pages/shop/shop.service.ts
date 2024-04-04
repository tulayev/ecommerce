import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, Product, ProductBrand, ProductType, ShopQueryParams } from '@app/models';

@Injectable()
export class ShopService {
    baseUrl = 'http://localhost:5000/api'

    constructor(private readonly httpClient: HttpClient) { }

    getProducts(shopQueryParams: ShopQueryParams) {
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

        return this.httpClient.get<Pagination<Product[]>>(`${this.baseUrl}/products`, { params });
    }

    getProductBrands() {
        return this.httpClient.get<ProductBrand[]>(`${this.baseUrl}/products/brands`);
    }

    getProductTypes() {
        return this.httpClient.get<ProductType[]>(`${this.baseUrl}/products/types`);
    }
}
