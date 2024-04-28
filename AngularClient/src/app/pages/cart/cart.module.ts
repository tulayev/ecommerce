import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderTotalsModule } from '@app/components';
import { CartSummaryModule } from '@app/components/cart-summary/cart-summary.module';


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        CartRoutingModule,
        OrderTotalsModule,
        CartSummaryModule
    ]
})
export class CartModule { }
