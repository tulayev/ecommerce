import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { OrderTotalsModule, StepperModule } from '@app/components';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { InputModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { CartSummaryModule } from '@app/components/cart-summary/cart-summary.module';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';


@NgModule({
    declarations: [
        CheckoutComponent,
        CheckoutAddressComponent,
        CheckoutDeliveryComponent,
        CheckoutReviewComponent,
        CheckoutPaymentComponent,
        CheckoutSuccessComponent
    ],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        ReactiveFormsModule,
        InputModule,
        OrderTotalsModule,
        StepperModule,
        CdkStepperModule,
        CartSummaryModule
    ],
    providers: [
        CheckoutService
    ]
})
export class CheckoutModule { }
