import { Component, Input } from '@angular/core';
import { Product } from '@app/models';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
    @Input() product!: Product;
}
