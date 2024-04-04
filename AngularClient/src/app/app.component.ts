import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination, Product } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ECommerce';
    products!: Product[];

    constructor(private readonly client: HttpClient) {}

    ngOnInit(): void {
        this.client.get<Pagination<Product[]>>('http://localhost:5000/api/products?pageSize=50').subscribe({
          next: response => this.products = response.data, // what to do next
          error: error => console.log(error), // what to do if there is an error
          complete: () => {
            console.log('request completed');
            console.log('extra statment');
          }
        });
    }
}
