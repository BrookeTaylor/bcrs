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

    updateProfile(email: string, firstName: string, lastName: string) {
      return this.http.put('/api/users/' + email + '/update-profile', {
        firstName: firstName,
        lastName: lastName,
      })
    }
}
