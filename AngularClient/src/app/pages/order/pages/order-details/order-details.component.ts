import { Component, OnInit } from '@angular/core';
import { Order } from '@app/models';
import { OrderService } from '../../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
    order?: Order;
    
    constructor(private readonly orderService: OrderService, private readonly route: ActivatedRoute) { }
  
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        id && this.orderService.getOrderDetailed(+id)
            .subscribe(order => this.order = order);
    }
}
