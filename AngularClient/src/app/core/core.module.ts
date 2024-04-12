import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        NgxSpinnerModule
    ],
    exports: [
        NgxSpinnerModule
    ]
})
export class CoreModule { }
