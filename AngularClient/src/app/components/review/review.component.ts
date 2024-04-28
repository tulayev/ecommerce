import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '@app/models';
import { ReviewService } from './review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent {
    @Input() reviews!: Review[];
    @Input() productId!: number;
    
    reviewFormGroup = new FormGroup({
        body: new FormControl('', Validators.required)
    });

    constructor(private readonly reviewService: ReviewService, private readonly toastr: ToastrService) { }

    onSubmit(): void {
        const model = {
            productId: this.productId,
            body: this.reviewFormGroup.controls['body'].value
        };
        
        this.reviewService.postReview(model)
            .subscribe(response => {
                this.toastr.success('Отзыв опубликован');
                console.log(response);
            });
    }
}
