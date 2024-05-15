import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSidebarComponent } from './dashboard-sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        DashboardSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DashboardSidebarComponent
    ]
})
export class DashboardSidebarModule { }
