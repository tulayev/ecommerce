import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { regex } from '@app/shared';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    errors: string[] | null = null;

    constructor(
        private readonly fb: FormBuilder, 
        private readonly accountService: AccountService, 
        private readonly router: Router
    ) { }

    registerForm = this.fb.group({
        displayName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
        password: ['', [Validators.required, Validators.pattern(regex.complexPassword)]],
    });  

    onSubmit() {
        this.accountService.register(this.registerForm.value).subscribe({
            next: () => this.router.navigateByUrl('/shop'),
            error: error => this.errors = error.errors
        });
    }

    validateEmailNotTaken(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(
                debounceTime(1000),
                take(1),
                switchMap(() => {
                    return this.accountService.checkEmailExists(control.value).pipe(
                        map(result => result ? {emailExists: true} : null),
                        finalize(() => control.markAsTouched())
                    );
                })
            );
        }
    }
}
