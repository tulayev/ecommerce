import { Component, OnInit } from '@angular/core';
import { Pagination, Product } from './models';
import { CartService } from './pages/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'ECommerce';
    products!: Product[];

    constructor(private readonly cartService: CartService) {}

    ngOnInit(): void {
        const cartId = localStorage.getItem('cart_id');
        
        if (cartId)
            this.cartService.getCart(cartId);
    }
}
