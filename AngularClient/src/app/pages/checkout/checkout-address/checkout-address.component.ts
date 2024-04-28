import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '@app/pages/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-checkout-address',
    templateUrl: './checkout-address.component.html'
})
export class CheckoutAddressComponent {
    @Input() checkoutFormGroup?: FormGroup;

    constructor(private readonly accountService: AccountService, private readonly toastr: ToastrService) { }
  
    saveUserAddress() {
        this.accountService.updateUserAddress(this.checkoutFormGroup?.get('addressFormGroup')?.value)
            .subscribe(() => {
                this.toastr.success('Адрес сохранён');
                this.checkoutFormGroup?.get('addressFormGroup')?.reset(this.checkoutFormGroup?.get('addressFormGroup')?.value);
            });
    }
}
