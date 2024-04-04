import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopService } from './shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { PagerModule, PagingHeaderModule } from '@app/components';


@NgModule({
    declarations: [
        ShopComponent,
        ProductItemComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        PagerModule,
        PagingHeaderModule
    ],
    exports: [
        ShopComponent
    ],
    providers: [
        ShopService
    ]
})
export class ShopModule { }
