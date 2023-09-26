/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent {

  step: string = 'start';

  next(nextStep: string) {
    this.step = nextStep;
  }

  personalRequired(): boolean {
    const firstName = this.userForm.get('firstName')?.value;
    const lastName = this.userForm.get('lastName')?.value;
    const phoneNumber = this.userForm.get('phoneNumber')?.value;
    const address = this.userForm.get('address')?.value;

    return !!firstName && !!lastName && !!phoneNumber && !!address;

  }


  isLoading: boolean = false;

  errorMessage: string

  userForm: FormGroup = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    role: [null, Validators.compose([Validators.required])],
//    selectedSecurityQuestions: [],
    isDisabled: false
  })

  constructor (private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.errorMessage = ''
  }

  createUser() {

    this.isLoading = true;
    const user: User = {

      empId: parseInt(this.userForm.controls['empId'].value, 10),
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      phoneNumber: parseInt(this.userForm.controls['phoneNumber'].value, 10),
      address: this.userForm.controls['address'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value,
      selectedSecurityQuestions:  [],
      isDisabled: false
    }

    this.userService.createUser(user).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/admin/users'])
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message
          this.isLoading = false;
        } else {
          this.errorMessage = 'Something went wrong, please contact system admin'
          this.isLoading = false;
        }
      }
    })
  }


}
