import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductBrand, ProductType } from '@app/models';
import { ShopService } from '@app/pages/shop/shop.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-add-form',
    templateUrl: './product-add-form.component.html'
})
export class ProductAddFormComponent implements OnInit {
    formGroup!: FormGroup;
    productBrands$!: Observable<ProductBrand[]>;
    productTypes$!: Observable<ProductType[]>;

    constructor(private readonly shopService: ShopService) { }
    
    ngOnInit(): void {
        this.productBrands$ = this.shopService.getProductBrands();
        this.productTypes$ = this.shopService.getProductTypes();

        this.formGroup = new FormGroup({
            name: new FormControl(''),
            description: new FormControl(''),
            price: new FormControl(''),
            productBrand: new FormControl(''),
            productType: new FormControl(''),
        });
    }

    onSave(): void {
        const formData = new FormData();
    }
}
