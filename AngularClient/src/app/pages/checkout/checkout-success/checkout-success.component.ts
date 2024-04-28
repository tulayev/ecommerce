import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '@app/models';

@Component({
    selector: 'app-checkout-success',
    templateUrl: './checkout-success.component.html'
})
export class CheckoutSuccessComponent {
    order?: Order;

    constructor(private readonly router: Router) {
        const navigation = this.router.getCurrentNavigation();
        this.order = navigation?.extras?.state as Order;
    }
}
