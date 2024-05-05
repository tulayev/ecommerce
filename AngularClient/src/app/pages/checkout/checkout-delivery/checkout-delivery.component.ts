import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from '@app/pages/cart/cart.service';
import { CheckoutService } from '../checkout.service';
import { DeliveryMethod } from '@app/models';

@Component({
    selector: 'app-checkout-delivery',
    templateUrl: './checkout-delivery.component.html'
})
export class CheckoutDeliveryComponent {
    @Input() checkoutFormGroup?: FormGroup;
    deliveryMethods: DeliveryMethod[] = [];
  
    constructor(private checkoutService: CheckoutService, private cartService: CartService) { }
  
    ngOnInit(): void {
        this.checkoutService.getDeliveryMethods()
            .subscribe(dm => this.deliveryMethods = dm);
    }
  
    setShippingPrice(deliveryMethod: DeliveryMethod): void {
        this.cartService.setShippingPrice(deliveryMethod);
    }
}
