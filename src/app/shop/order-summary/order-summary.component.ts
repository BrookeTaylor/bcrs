import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../service/order';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {

  user: any;
  order: Order

  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService) {


    this.order = {} as Order

    const orderQueryParam = this.route.snapshot.queryParamMap.get('order');

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

}
