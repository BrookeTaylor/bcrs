/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Janis Gonzalez
 *  Date: 09/27/2023
 *  Description: invoice service
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {}

  getInvoices() {
    return this.http.get('/api/invoices/');
  }

  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }


}