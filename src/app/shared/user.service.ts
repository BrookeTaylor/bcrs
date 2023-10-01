/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 10/01/2023
 *  Description: user service
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserViewModel } from './user-view-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    /**
     * @description Returns a user by empId
     * @param empId
     * @returns UserViewModel
     */

    getUserByEmpId(empId: string): Observable<UserViewModel> {
      return this.http.get<UserViewModel>('api/users/' + empId)
    }

    updateProfile(email: string, firstName: string, lastName: string, phoneNumber: number, address: string) {
      return this.http.put('/api/users/' + email + '/update-profile', {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
      })
    }
}
