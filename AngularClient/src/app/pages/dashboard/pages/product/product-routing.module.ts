import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditFormComponent } from './product-edit-form/product-edit-form.component';
import { ProductAddFormComponent } from './product-add-form/product-add-form.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'add',
        component: ProductAddFormComponent
    },
    {
        path: 'edit/:id',
        component: ProductEditFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
