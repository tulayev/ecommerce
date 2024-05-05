import { Component } from '@angular/core';
import { CartItem } from '@app/models';
import { AccountService } from '@app/pages/account/account.service';
import { CartService } from '@app/pages/cart/cart.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    constructor(public readonly cartService: CartService, public readonly accountService: AccountService) { }

    getCartItemsCount(items: CartItem[]): number {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }
}
