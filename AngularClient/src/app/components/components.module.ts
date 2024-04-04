import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { PagerModule } from './pager/pager.module';
import { PagingHeaderModule } from './paging-header/paging-header.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NavBarModule,
        PagerModule,
        PagingHeaderModule
    ], 
    exports: [
        NavBarModule,
        PagerModule,
        PagingHeaderModule
    ]
})
export class ComponentsModule { }
