import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './paging-header.component';



@NgModule({
    declarations: [
        PagingHeaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PagingHeaderComponent
    ]
})
export class PagingHeaderModule { }
