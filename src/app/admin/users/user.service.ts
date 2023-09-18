/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { UserViewModel } from './user-view-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/api/users')
  }

  getUser(empId: number) {
    return this.http.get('api/users/' + empId)
  }

  createUser(user: User) {
    return this.http.post('/api/users/', {
      user
    })
  }

  updateUser(empId: number, user: UserViewModel) {
    return this.http.put('/api/users/' + empId, {
      user
    })
  }

  deleteUser(empId: number) {
    return this.http.delete('/api/users/' + empId)
  }

}
