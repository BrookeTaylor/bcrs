/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Date: 09/14/2023
 *  Description: user role view
 */

import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { UserViewModel } from '../user-view-model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  empId: number
  user: User

  userForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    role: [null, Validators.compose([Validators.required])]
  })



  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {

      this.user = {} as User

      let l_empId = this.route.snapshot.paramMap.get('empId') || ''
      this.empId = parseInt(l_empId, 10)

      console.log(this.empId)


      if (isNaN(this.empId)) {
        this.router.navigate(['/admin/users'])
      }

      this.userService.getUser(this.empId).subscribe({
        next: (user: any) => {
          this.user = user
          console.log(this.user)
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => {
          this.userForm.controls['firstName'].setValue(this.user.firstName)
          this.userForm.controls['lastName'].setValue(this.user.lastName)
          this.userForm.controls['role'].setValue(this.user.role)
        }
      })


    }

    /**
     * updateUser
     */
    updateUser() {
      let user = {} as UserViewModel

      user.firstName = this.userForm.controls['firstName'].value
      user.lastName = this.userForm.controls['lastName'].value
      user.role = this.userForm.controls['role'].value

      console.log('User ViewModel: ', user)

      this.userService.updateUser(this.empId, user).subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/admin/users'])
        },
        error: (err) => {
          console.error(err)
        }
      })
    }


}
