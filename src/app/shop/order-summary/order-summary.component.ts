/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 10/01/2023
 *  Description: order-summary ts
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../service/order';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: [
    './order-summary.component.css',
    'print.css'
  ]
})
export class OrderSummaryComponent {

  user: any;
  order: Order
  printing = false;

  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService) {


    this.order = {} as Order

    const orderQueryParam = this.route.snapshot.queryParamMap.get('order');
    console.log('query: ', orderQueryParam)

    if (orderQueryParam !== null) {
      this.order = JSON.parse(orderQueryParam);
    } else {
      this.order = {} as Order;
    }

    if (!this.order.lineItems || this.order.lineItems.length ===0) {
      this.router.navigate(['/'])
    }

    const session_user = this.cookieService.get('session_user')
    if (session_user) {
      this.user = JSON.parse(session_user)
      console.log('User:', this.user)
    }

    console.log('Order Summary:', this.order)
    console.log('Order Total:', this.order.invoiceTotal)

  }

  printPage() {
    this.printing = true;
    window.print();
    this.printing = false;
  }

}
