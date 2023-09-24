/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/24/2023
 *  Description: admin module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserViewComponent } from './users/user-view/user-view.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    UserNewComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
