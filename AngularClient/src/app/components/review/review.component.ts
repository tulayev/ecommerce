import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '@app/models';
import { ReviewService } from './review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {
    @Input() reviews!: Review[];
    @Input() productId!: number;
    @Output() reload = new EventEmitter<void>();
    
    reviewFormGroup!: FormGroup;

    constructor(private readonly reviewService: ReviewService, private readonly toastr: ToastrService) { }

    ngOnInit(): void {
        this.reviewFormGroup = new FormGroup({
            body: new FormControl('', Validators.required)
        });
    }

    onSave(): void {
        const model = {
            productId: this.productId,
            body: this.reviewFormGroup.controls['body'].value
        };
        
        this.reviewService.postReview(model)
            .subscribe(() => {
                this.toastr.success('Отзыв опубликован');
                this.reviewFormGroup.patchValue({
                    body: ''
                });
                this.reload.emit();
            });
    }
}
