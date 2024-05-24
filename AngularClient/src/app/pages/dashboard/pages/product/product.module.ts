import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { DashboardSidebarModule } from '@app/components';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductAddFormComponent } from './product-add-form/product-add-form.component';
import { ProductEditFormComponent } from './product-edit-form/product-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopService } from '@app/pages/shop/shop.service';


@NgModule({
    declarations: [
        ProductComponent,
        ProductListComponent,
        ProductAddFormComponent,
        ProductEditFormComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        DashboardSidebarModule
    ],
    providers: [
        ProductService,
        ShopService
    ]
})
export class ProductModule { }
