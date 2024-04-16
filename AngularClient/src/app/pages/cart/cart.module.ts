import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';


@NgModule({
    declarations: [
        CartComponent,
        OrderTotalsComponent
    ],
    imports: [
        CommonModule,
        CartRoutingModule
    ]
})
export class CartModule { }
