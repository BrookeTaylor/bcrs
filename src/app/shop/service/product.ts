/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/28/2023
 *  Description: product interface
 */

export interface Product {
  id: number
  title: string
  price: number
  desc: string
  imgUrl: string
  checked: boolean
}