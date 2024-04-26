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
                canActivate: [authGuard],
                loadChildren: () => import('./pages/server-error/server-error.module').then(m => m.ServerErrorModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
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
