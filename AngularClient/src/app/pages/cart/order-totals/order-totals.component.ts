import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-order-totals',
    templateUrl: './order-totals.component.html'
})
export class OrderTotalsComponent {
    constructor(public readonly cartService: CartService) {}
}
