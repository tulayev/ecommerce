import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSummaryComponent } from './cart-summary.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        CartSummaryComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CartSummaryComponent
    ]
})
export class CartSummaryModule { }
