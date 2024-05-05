import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '@app/models';
import { CartService } from '@app/pages/cart/cart.service';
import { environment } from '@src/environments/environment';

@Component({
    selector: 'app-cart-summary',
    templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
    @Output() addItem = new EventEmitter<CartItem>();
    @Output() removeItem = new EventEmitter<{id: number, quantity: number}>();
    @Input() isCart = true;
    baseUrl = environment.baseUrl;
  
    constructor(public readonly cartService: CartService) { }
  
    addCartItem(item: CartItem): void {
        this.addItem.emit(item);
    }
  
    removeCartItem(id: number, quantity = 1): void {
        this.removeItem.emit({ id, quantity });
    }
}
