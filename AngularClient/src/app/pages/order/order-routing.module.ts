import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
    {
        path: '',
        component: OrderComponent,
        children: [
            {
                path: ':id',
                loadChildren: () => import('./pages/order-details/order-details.module').then(m => m.OrderDetailsModule)
            },
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('./pages/order-list/order-list.module').then(m => m.OrderListModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
