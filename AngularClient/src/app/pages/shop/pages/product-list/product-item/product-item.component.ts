import { Component, Input } from '@angular/core';
import { Product } from '@app/models';
import { CartService } from '@app/pages/cart/cart.service';
import { environment } from '@src/environments/environment';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
    @Input() product!: Product;
    baseUrl = environment.baseUrl;

    constructor(private readonly cartService: CartService) {}

    addItemToCart(): void {
        this.product && this.cartService.addItemToCart(this.product);
    }
}
