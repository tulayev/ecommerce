import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { ReviewService } from './review.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ReviewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ReviewComponent
    ],
    providers: [
        ReviewService
    ]
})
export class ReviewModule { }
