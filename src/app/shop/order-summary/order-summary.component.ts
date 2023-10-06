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
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: [
    './order-summary.component.css',
    'print.css'
  ]
})
export class OrderSummaryComponent implements OnInit {

 // user: any;
  order: Order
  printing = false;
  isLoading: boolean

  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private http: HttpClient) {

    this.isLoading = true
    this.order = {} as Order


  }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.http.get(`/api/invoices/${id}/invoice`).subscribe((invoice: any) => {
          this.order = invoice;
          this.isLoading = false;

        }, (error) => {
          console.error('Error fetching invoice:', error);
          this.isLoading = false;

        });
      } else {
        console.error('No "id" parameter provided');
        this.isLoading = false;

      }
    });
  }


  printPage() {
    this.printing = true;
    window.print();
    this.printing = false;
  }

}
