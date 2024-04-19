import { Component, OnInit } from '@angular/core';
import { Product } from './models';
import { CartService } from './pages/cart/cart.service';
import { AccountService } from './pages/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'ECommerce';
    products!: Product[];

    constructor(private readonly cartService: CartService, private readonly accountService: AccountService) { }

    ngOnInit(): void {
        this.loadCart();
        this.loadCurrentUser();
    }

    loadCart() {
        const cartId = localStorage.getItem('cart_id');

        if (cartId) 
            this.cartService.getCart(cartId);
    }
    
    loadCurrentUser() {
        const token = localStorage.getItem('token');
        this.accountService.loadCurrentUser(token).subscribe();
    }
}
