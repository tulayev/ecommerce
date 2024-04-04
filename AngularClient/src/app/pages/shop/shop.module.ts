import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopService } from './shop.service';


@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
    ],
    providers: [
        ShopService
    ]
})
export class ShopModule { }
