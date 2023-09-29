/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/28/2023
 *  Description: menu service class
 */

import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  products: Array<Product>;

  constructor() {

    this.products = [
      {
        id: 100,
        title: 'Password Reset',
        price: 39.99,
        imgUrl: '../../../assets/service/passwordReset.png',
        desc: 'Locked out of your account? It happens to us all.',
        checked: false,
      },
      {
        id: 101,
        title: 'Spyware Removal',
        price: 99.99,
        imgUrl: '../../../assets/service/spywareRemoval.png',
        desc: "Has your computer been running slow? Afraid you've been hacked?",
        checked: false,
      },
      {
        id: 102,
        title: 'RAM Upgrade',
        price: 129.99,
        imgUrl: '../../../assets/service/ramUpgrade.png',
        desc: "One simple price for RAM upgrade. You can't beat that.",
        checked: false,
      },
      {
        id: 103,
        title: 'Software Installation',
        price: 49.99,
        imgUrl: '../../../assets/service/softwareInstall.png',
        desc: "Have us professionally install your software for you.",
        checked: false,
      },
      {
        id: 104,
        title: 'PC Tune-up',
        price: 89.99,
        imgUrl: '../../../assets/service/pcTuneUp.png',
        desc: "Expect more of your PC? Let us optimize your machines performance.",
        checked: false,
      },
      {
        id: 105,
        title: 'Keyboard Cleaning',
        price: 45.00,
        imgUrl: '../../../assets/service/keyboardCleaning.png',
        desc: "You've probably long forgotten what it felt like to type on your new PC. Let us revitalize that experience with a cleaning.",
        checked: false,
      },
      {
        id: 106,
        title: 'Disk Clean-up',
        price: 129.99,
        imgUrl: '../../../assets/service/diskCleanUp.png',
        desc: "Free up space on your computer's hard drive to do more of the things you want.",
        checked: false,
      }
    ]

   }

   getProducts(): Array<Product> {
    return this.products;
   }
}
