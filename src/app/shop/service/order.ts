/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/28/2023
 *  Description: order class
 */

import { Product } from "./product";

export class Order {

  email: string = '';
  fullName: string = '';

  lineItems: Array<Product>
  id: number
  date: string
  lineItemTotal: number
  partsAmount: number
  laborAmount: number
  invoiceTotal: number

  constructor() {
    this.lineItems = []
    this.lineItemTotal = 0
    this.partsAmount = 0
    this.laborAmount = 0
    this.invoiceTotal = 0

    this.id = Math.floor(Math.random() * 90000) + 10000

    this.date = new Date().toLocaleDateString()


  }


  itemsTotal() {
    let total = 0;

    for (const product of this.lineItems) {
      total += product.price;
    }
    this.lineItemTotal = parseFloat(total.toFixed(2));
  }



  getOrderTotal() {
    let total = 0

    for (let product of this.lineItems) {
      total += product.price
    }

    console.log('Menu Items Total: ', total)

    total = total + parseFloat(this.partsAmount.toString())
    total = total + parseFloat(this.laborAmount.toString())

    console.log('Total after parts and labor: ', total)

    return total.toFixed(2)

  }

}