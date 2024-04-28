import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from '@app/pages/cart/cart.service';
import { CheckoutService } from '../checkout.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address, Cart } from '@app/models';

@Component({
    selector: 'app-checkout-payment',
    templateUrl: './checkout-payment.component.html'
})
export class CheckoutPaymentComponent {
    @Input() checkoutFormGroup?: FormGroup;

    constructor(
        private readonly cartService: CartService, 
        private readonly checkoutService: CheckoutService, 
        private readonly toastr: ToastrService, 
        private readonly router: Router
    ) { }
  
    private getOrderToCreate(cart: Cart) {
        const deliveryMethodId = this.checkoutFormGroup?.get('deliveryFormGroup')?.get('deliveryMethod')?.value;
        const shipToAddress = this.checkoutFormGroup?.get('addressFormGroup')?.value as Address;

        console.log(deliveryMethodId);
        console.log(shipToAddress);
        
        if (!deliveryMethodId || !shipToAddress) 
            return;
        
        return {
            cartId: cart.id,
            deliveryMethodId: deliveryMethodId,
            shipToAddress: shipToAddress
        }
    }

    submitOrder() {
        const cart = this.cartService.getCurrentCartValue();
        
        if (!cart) 
            return;
        
        const orderToCreate = this.getOrderToCreate(cart);
        
        if (!orderToCreate) 
            return;
        
        this.checkoutService.createOrder(orderToCreate)
            .subscribe(order => {
                this.toastr.success('Заказ создан успешно');
                this.cartService.deleteLocalCart();
                
                const navigationExtras: NavigationExtras = { state: order };
                this.router.navigate(['checkout/success'], navigationExtras);
            });
    }
}
