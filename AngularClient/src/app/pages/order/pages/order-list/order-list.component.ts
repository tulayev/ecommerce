import { Component, OnInit } from '@angular/core';
import { Order } from '@app/models';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];

    constructor(private readonly orderService: OrderService) { }
  
    ngOnInit(): void {
        this.getOrders();
    }
  
    getOrders(): void {
        this.orderService.getOrdersForUser()
            .subscribe(orders => this.orders = orders);
    }
}
