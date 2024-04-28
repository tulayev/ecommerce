import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
    checkoutFormGroup!: FormGroup;

    constructor(private readonly fb: FormBuilder, private readonly accountService: AccountService) { }

    ngOnInit(): void {
        this.checkoutFormGroup = this.fb.group({
            addressFormGroup: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                street: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zipcode: ['', Validators.required],
            }),
            deliveryFormGroup: this.fb.group({
                deliveryMethod: ['', Validators.required]
            }),
            paymentFormGroup: this.fb.group({
                nameOnCard: ['', Validators.required]
            })
        });

        this.getAddressFormValues();
    }
  
    getAddressFormValues() {
        this.accountService.getUserAddress()
            .subscribe(address => address && this.checkoutFormGroup.get('addressFormGroup')?.patchValue(address));
    }
}
