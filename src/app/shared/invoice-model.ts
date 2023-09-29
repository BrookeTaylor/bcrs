/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Janis Gonzalez
 *  Date: 09/27/2023
 *  Description: invoice model
 */


// imports
import { LineItemsModel } from "./line-items-model"

// export
export interface InvoiceModel {
  email: string
  fullName: string
  partsAmount: number
  laborAmount: number
  lineItemTotal: number
  invoiceTotal: number
  orderDate: string
  lineItems: LineItemsModel[]
}
