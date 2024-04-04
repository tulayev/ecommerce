import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product!: Product;

    constructor(
        private readonly shopService: ShopService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getProduct();
    }

    getProduct() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.shopService.getProduct(Number(id)).subscribe(response => this.product = response);
        }
    }
}
