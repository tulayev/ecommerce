import { Component, Input } from '@angular/core';
import { Product } from '@app/models';
import { CartService } from '@app/pages/cart/cart.service';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
    @Input() product!: Product;

    constructor(private readonly cartService: CartService) {}

    addItemToCart() {
        this.product && this.cartService.addItemToCart(this.product);
    }
}
