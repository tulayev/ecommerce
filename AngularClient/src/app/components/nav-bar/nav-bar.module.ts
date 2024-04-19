import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
    declarations: [
        NavBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BsDropdownModule
    ],
    exports: [
        NavBarComponent
    ]
})
export class NavBarModule { }
