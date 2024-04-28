import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { ReviewModule } from '@app/components/review/review.module';


@NgModule({
    declarations: [
        ProductDetailsComponent
    ],
    imports: [
        CommonModule,
        ProductDetailsRoutingModule,
        ReviewModule
    ]
})
export class ProductDetailsModule { }
