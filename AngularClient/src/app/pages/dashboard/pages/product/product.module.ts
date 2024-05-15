import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { DashboardSidebarModule } from '@app/components';


@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        DashboardSidebarModule
    ]
})
export class ProductModule { }
