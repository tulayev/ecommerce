import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@app/pages/cart/cart.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product!: Product;
    quantity = 1;
    quantityInCart = 0;

    constructor(
        private readonly cartService: CartService,
        private readonly shopService: ShopService,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getProduct();
    }

    getProduct(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.shopService.getProduct(Number(id)).subscribe(product => {
                this.product = product;
                this.cartService.cartSource$.pipe(take(1))
                    .subscribe(cart => {
                        const item = cart?.items.find(x => x.id === +id);
                        if (item) {
                            this.quantity = item.quantity;
                            this.quantityInCart = item.quantity;
                        }
                    });
            });
        }
    }

    incrementQuantity(): void {
        this.quantity++;
    }
    
    decrementQuantity(): void {
        this.quantity--;
    }
    
    updateCart(): void {
        if (this.product) {
            if (this.quantity > this.quantityInCart) {
                const itemsToAdd = this.quantity - this.quantityInCart;
                
                this.quantityInCart += itemsToAdd;
                this.cartService.addItemToCart(this.product, itemsToAdd);
            } else {
                const itemsToRemove = this.quantityInCart - this.quantity;
                
                this.quantityInCart -= itemsToRemove;
                this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
            }
        }
    }
    
    get buttonText(): string {
        return this.quantityInCart === 0 ? 'Добавить в корзину' : 'Обновить корзину';
    }
}
