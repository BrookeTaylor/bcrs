/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Brett Grashorn
 *  Date: 09/24/2023
 *  Description: security.service.ts
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterViewModel } from './register-view-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  // findById
  findUserById(empId: number) {
    return this.http.get('api/users/' + empId)
  }

  /**
   * signin
   */
  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email,
      password
    })
  }


/**
 *  Register
 */
 register(user: RegisterViewModel) {
   return this.http.post('/api/security/register', { user });
 }



}



