/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/26/2023
 *  Description: service component
 */

import { Component } from '@angular/core';
import { Product } from './product';
import { MenuService } from './menu.service';
import { Order } from './order';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  products: Array<Product>
  order: Order
  user: any;

  lineItems: Array<Product>
  id: number
  date: string
  lineItemTotal: number
  partsAmount: number
  laborAmount: number
  invoiceTotal: number

  isLoading: boolean = false;
  errorMessage: string // error message variable

  formSubmitted: boolean = false;


  constructor(
    private menuService: MenuService,
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService) {

      this.lineItems = []
      this.lineItemTotal = 0
      this.partsAmount = 0
      this.laborAmount = 0
      this.invoiceTotal = 0

      this.id = Math.floor(Math.random() * 90000) + 10000

      this.date = new Date().toLocaleDateString()

    this.products = this.menuService.getProducts()
    this.order = new Order()

    console.log('Product Listing: ', this.products)

    const session_user = this.cookieService.get('session_user')
    if (session_user) {
      this.user = JSON.parse(session_user)
      console.log('User:', this.user)
    }

    this.errorMessage = ''

  }



  getOrderTotal() {
    let total = 0

    for (let product of this.lineItems) {
      total += product.price
    }

    console.log('Menu Items Total: ', total)

    total = total + parseFloat(this.partsAmount.toString())
    total = total + parseFloat((this.laborAmount * 50).toString())

    console.log('Total after parts and labor: ', total)

    return total.toFixed(2)

  }







  generateOrder() {

    this.formSubmitted = true;


    console.log('Order', this.order)
    console.log('Products', this.products)

    this.isLoading = true;




    for (let product of this.products) {
      if (product.checked) {
        const { title, price } = product;
        this.order.lineItems.push({ title, price } as any)
      }
    }

    this.order.itemsTotal();


    console.log('Ordered Items:', this.order.lineItems)
    console.log('Ordered Parts:', this.order.partsAmount)
    console.log('Ordered Labor:', this.order.laborAmount)
    console.log('Order Total:', this.order.getOrderTotal())

    this.order.partsAmount = parseFloat(this.order.partsAmount.toString())
    this.order.laborAmount = parseFloat(this.order.laborAmount.toString()) * 50;

    this.order.invoiceTotal = parseFloat(this.order.getOrderTotal())

    console.log('Order', this.order)


    const session_user = this.cookieService.get('session_user')
    const user = JSON.parse(session_user)
    this.order.email = user.email
    this.order.fullName = user.fullName;




  this.httpClient.post('/api/invoices', this.order).subscribe({


    next: (response) => {
      this.isLoading = false;
      console.log('result', response)
      this.router.navigate(['shop/order-summary'], {
        queryParams: { order: JSON.stringify(this.order)}
      })

    },
    error: (err) => {
      if (err.error.message) {
        console.log('db error: ', err.error.message)
        this.errorMessage = err.error.message
        this.isLoading = false;
      } else {
        this.errorMessage = 'Something went wrong'
        console.log(err)
        this.isLoading = false;
      }
    }
  })

//  this.router.navigate(['shop/order-summary'], {queryParams: { order: JSON.stringify(this.order) }})
  }

}



