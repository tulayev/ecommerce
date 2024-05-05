import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product, ProductBrand, ProductType, ShopQueryParams } from '@app/models';
import { ShopService } from '../../shop.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    @ViewChild('search') searchInput?: ElementRef;
    
    products!: Product[];
    productBrands!: ProductBrand[];
    productTypes!: ProductType[];
    
    shopQueryParams = new ShopQueryParams();

    sortOptions = [
      { name: 'По алфавиту', value: 'name' },
      { name: 'Цена: по возрастанию', value: 'priceAsc' },
      { name: 'Цена: по убыванию ', value: 'priceDesc' },
    ];

    totalCount = 0;
  
    constructor(private readonly shopService: ShopService) { }
  
    ngOnInit(): void {
        this.getProducts();
        this.getProductBrands();
        this.getProductTypes();
    }
  
    getProducts(): void {
        this.shopService.getProducts(this.shopQueryParams).subscribe(response => {
            this.products = response.data;
            this.shopQueryParams.pageNumber = response.pageNumber;
            this.shopQueryParams.pageSize = response.pageSize;
            this.totalCount = response.count;
        });
    }
  
    getProductBrands(): void {
        this.shopService.getProductBrands().subscribe(response => 
            this.productBrands = [{ id: 0, name: 'Все' }, ...response]
        );
    }
  
    getProductTypes(): void {
        this.shopService.getProductTypes().subscribe(response =>
            this.productTypes = [{ id: 0, name: 'Все' }, ...response]
        );
    }
  
    onProductBrandSelected(brandId: number): void {
        this.shopQueryParams.brandId = brandId;
        this.shopQueryParams.pageNumber = 1;
        this.getProducts();
    }
  
    onProductTypeSelected(typeId: number): void {
        this.shopQueryParams.typeId = typeId;
        this.shopQueryParams.pageNumber = 1;
        this.getProducts();
    }
  
    onSortSelected(event: any): void {
        this.shopQueryParams.sort = event.target.value;
        this.getProducts();
    }
  
    onPageChanged(event: any): void {
        if (this.shopQueryParams.pageNumber !== event) {
            this.shopQueryParams.pageNumber = event;
            this.getProducts();
        }
    }
  
    onSearch(): void {
        this.shopQueryParams.search = this.searchInput?.nativeElement.value;
        this.shopQueryParams.pageNumber = 1;
        this.getProducts();
    }
  
    onReset(): void {
        if (this.searchInput) 
            this.searchInput.nativeElement.value = '';

        this.shopQueryParams = new ShopQueryParams();
        this.getProducts();
    }
}
