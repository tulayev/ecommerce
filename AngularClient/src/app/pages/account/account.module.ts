import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountService } from './account.service';


@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule
    ]
})
export class AccountModule { }
