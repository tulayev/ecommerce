import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'not-found',
                loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
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
