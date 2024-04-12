import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
        children: [
            {
                path: ':id',
                loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule),
                data: { breadcrumb: {alias: 'productDetails'} }
            },
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
