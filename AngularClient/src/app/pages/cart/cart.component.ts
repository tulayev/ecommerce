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

    incrementQuantity(item: CartItem): void {
        this.cartService.addItemToCart(item);
    }
    
    removeItem(event: {id: number, quantity: number}): void {
        this.cartService.removeItemFromCart(event.id, event.quantity);
    }
}
