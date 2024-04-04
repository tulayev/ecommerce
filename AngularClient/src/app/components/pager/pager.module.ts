import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
    declarations: [
        PagerComponent
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot()
    ],
    exports: [
        PagerComponent
    ]
})
export class PagerModule { }
