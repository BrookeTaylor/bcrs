/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { roleGuard } from '../shared/role.guard';
import { MyProfileComponent } from '../my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UserListComponent,
        title: "Bob's Computer Repair Shop - User List"
      },
      {
        path: 'users/:empId/view',
        component: UserViewComponent,
        title: "Bob's Computer Repair Shop - User Roles"
      },
      {
        path: 'users/new',
        component: UserNewComponent,
        title: "Bob's Computer Repair Shop - New User"
      }
    ],
    canActivate: [roleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
