import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from '@app/models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {

    constructor(public readonly cartService: CartService) {}

    incrementQuantity(item: CartItem) {
        this.cartService.addItemToCart(item);
    }
    
    removeItem(id: number, quantity: number) {
        this.cartService.removeItemFromCart(id, quantity);
    }
}
