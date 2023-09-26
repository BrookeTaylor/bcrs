/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/26/2023
 *  Description: shop service module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';


import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
