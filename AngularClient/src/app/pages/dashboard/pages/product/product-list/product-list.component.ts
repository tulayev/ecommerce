import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '@app/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    products$!: Observable<Product[]>;

    constructor(private readonly productService: ProductService) { }

    ngOnInit(): void {
        this.products$ = this.productService.getProducts();
    }

    deleteProduct(id: number): void {
        this.productService.deleteProduct(id)
            .subscribe(() => this.products$ = this.productService.getProducts());
    }
}
