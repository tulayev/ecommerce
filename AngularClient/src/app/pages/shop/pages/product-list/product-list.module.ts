import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { PagerModule, PagingHeaderModule } from '@app/components';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductItemComponent
    ],
    imports: [
        CommonModule,
        ProductListRoutingModule,
        RouterModule,
        PagingHeaderModule,
        PagerModule
    ]
})
export class ProductListModule { }
