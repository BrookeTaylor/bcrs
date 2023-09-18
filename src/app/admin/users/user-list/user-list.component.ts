/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[]
  successMessage: string
  errorMessage: string
  isLoading: boolean

  constructor(private userService: UserService) {
    this.users = []
    this.successMessage = ''
    this.errorMessage = ''
    this.isLoading = true

    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users
        console.log('User List:', this.users)
        this.isLoading = false
      },
      error: (err) => {
        this.errorMessage = err.message
        console.log(err)
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  /**
   * deleteUser
   */
  deleteUser(empId: number) {
    if (!confirm('Are you sure you want to delete user record ' + empId + '?')) {
      return
    }

    this.userService.deleteUser(empId).subscribe({
      next: (res) => {
        this.users = this.users.filter(user => user.empId !== empId)

        this.successMessage = 'User deleted successfully'

        this.hideAlert()
      },
      error: (err) => {
        this.errorMessage = err.message
        console.error(err)
        this.hideAlert()
      }
    })
  }

  hideAlert() {
    setTimeout(() => {
      this.successMessage = ''
      this.errorMessage = ''
    }, 3000)
  }

}
