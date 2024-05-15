import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { PagerModule } from './pager/pager.module';
import { PagingHeaderModule } from './paging-header/paging-header.module';
import { OrderTotalsModule } from './order-totals/order-totals.module';
import { StepperModule } from './stepper/stepper.module';
import { CartSummaryModule } from './cart-summary/cart-summary.module';
import { ReviewModule } from './review/review.module';
import { DashboardModule } from '@app/pages/dashboard/dashboard.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DashboardModule,
        NavBarModule,
        PagerModule,
        PagingHeaderModule,
        OrderTotalsModule,
        StepperModule,
        CartSummaryModule,
        ReviewModule
    ], 
    exports: [
        NavBarModule,
        DashboardModule,
        PagerModule,
        PagingHeaderModule,
        OrderTotalsModule,
        StepperModule,
        CartSummaryModule,
        ReviewModule
    ]
})
export class ComponentsModule { }
