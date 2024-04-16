import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, CartItem, CartTotals, Product } from '@app/models';
import { environment } from '@src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private baseUrl = environment.apiUrl;
    private cartSource = new BehaviorSubject<Cart | null>(null);
    private cartTotalSource = new BehaviorSubject<CartTotals | null>(null);
    
    cartSource$ = this.cartSource.asObservable();
    cartTotalSource$ = this.cartTotalSource.asObservable();

    constructor(private readonly httpClient: HttpClient) { }

    private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {
        const item = items.find(x => x.id === itemToAdd.id);
        
        if (item) {
            item.quantity += quantity;
        }
        else {
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }

        return items;
    }

    private createCart(): Cart {
        const cart = new Cart();
        localStorage.setItem('cart_id', cart.id);
        return cart;
    }

    private mapProductItemToCartItem(item: Product): CartItem {
        return {
            id: item.id,
            productName: item.name,
            price: item.price,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            brand: item.productBrand,
            type: item.productType
        }
    }

    private calculateTotals() {
        const cart = this.getCurrentCartValue();
        
        if (!cart) 
            return;
        
        const shipping = 0;
        const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
        const total = subtotal + shipping;
        
        this.cartTotalSource.next({ shipping, total, subtotal });
    }

    private isProduct(item: Product | CartItem): item is Product {
        return (item as Product).productBrand !== undefined;
    }

    getCart(id: string) {
        return this.httpClient.get<Cart>(`${this.baseUrl}/cart?id=${id}`)
            .subscribe(cart => {
                this.cartSource.next(cart);
                this.calculateTotals();
            });
    }
    
    setCart(cart: Cart) {
        return this.httpClient.post<Cart>(`${this.baseUrl}/cart`, cart)
            .subscribe(cart => {
                this.cartSource.next(cart);
                this.calculateTotals();
            });
    }

    getCurrentCartValue() {
        return this.cartSource.value;
    }

    addItemToCart(item: Product | CartItem, quantity = 1) {
        if (this.isProduct(item)) 
            item = this.mapProductItemToCartItem(item);

        const cart = this.getCurrentCartValue() ?? this.createCart();
        cart.items = this.addOrUpdateItem(cart.items, item, quantity);
        this.setCart(cart);
    }

    removeItemFromCart(id: number, quantity = 1) {
        const cart = this.getCurrentCartValue();
        
        if (!cart) 
            return;
        
        const item = cart.items.find(x => x.id === id);
        
        if (item) {
            item.quantity -= quantity;
            
            if (item.quantity === 0) 
                cart.items = cart.items.filter(x => x.id !== id);

            cart.items.length > 0 ? this.setCart(cart) : this.deleteBasket(cart);
        }
    }

    deleteBasket(cart: Cart) {
        return this.httpClient.delete(`${this.baseUrl}/cart?id=${cart.id}`)
            .subscribe(() => {
                this.cartSource.next(null);
                this.cartTotalSource.next(null);
                localStorage.removeItem('cart_id');
            });
    }
}
