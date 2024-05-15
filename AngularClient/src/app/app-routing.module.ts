import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'not-found',
                loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: 'server-error',
                loadChildren: () => import('./pages/server-error/server-error.module').then(m => m.ServerErrorModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'checkout',
                canActivate: [authGuard],
                loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
            },
            {
                path: 'orders', 
                canActivate: [authGuard],
                loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            }
        ]
    }, 
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
