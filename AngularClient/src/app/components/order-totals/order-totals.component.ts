import { Component } from '@angular/core';
import { CartService } from '@app/pages/cart/cart.service';

@Component({
    selector: 'app-order-totals',
    templateUrl: './order-totals.component.html'
})
export class OrderTotalsComponent {
    constructor(public readonly cartService: CartService) { }
}
