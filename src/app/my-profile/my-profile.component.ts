import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserViewModel } from '../shared/user-view-model';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  user: UserViewModel
  errorMessage: string
  profileOnSaveError: string
  profileOnSaveSuccess: string
  userInitials: string
  role: string
  avatarColors: Array<string> = ['#372e29', '#7D6B5D', '#eeba35', '#ffd25f']
  randomAvatarColor: string

  profileForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])]
  })

  constructor (private cookieService: CookieService, private userService: UserService, private fb: FormBuilder) {
    this.user = {} as UserViewModel
    this.errorMessage = ''
    this.profileOnSaveError = ''
    this.profileOnSaveSuccess = ''
    this.userInitials = ''
    this.role = ''
    this.randomAvatarColor = this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)]

    const session_user = this.cookieService.get('session_user');

    if (session_user) {
      try {
        this.user = JSON.parse(session_user)
        console.log('User:', this.user)

    this.userService.getUserByEmpId(this.user.empId).subscribe({

      next: (res) => {
        this.user = res
        console.log('user', this.user)
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.message
      },
      complete: () => {
        this.userInitials = `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`
        this.role = this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1)

        this.profileForm.controls['firstName'].setValue(this.user.firstName)
        this.profileForm.controls['lastName'].setValue(this.user.lastName)

      }
    })
      } catch (error) {
        console.error('Error parsing session cookie', error)
      }
    }
  }

  saveChanges() {
    const firstName = this.profileForm.controls['firstName'].value
    const lastName = this.profileForm.controls['lastName'].value
    const phoneNumber = this.profileForm.controls['phoneNumber'].value

    console.log(`firstName: ${firstName}, lastName: ${lastName}`)

    this.userService.updateProfile(this.user.email, firstName, lastName).subscribe({

      next: (res) => {
        console.log(`Response from API call: ${res}`)
        this.user.firstName = firstName
        this.user.lastName = lastName
        this.userInitials = `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`
        this.profileOnSaveSuccess = 'Profile saved successfully!'
      },
      error: (err) => {
        console.log(err)
        this.profileOnSaveError = err.message
      },
      complete: () => {
        this.profileForm.reset()
        this.profileForm.controls['firstName'].setValue(this.user.firstName)
        this.profileForm.controls['lastName'].setValue(this.user.lastName)
      }
    })
  }

  close() {
    this.profileForm.reset()
    this.profileForm.controls['firstName'].setValue(this.user.firstName)
    this.profileForm.controls['lastName'].setValue(this.user.lastName)
    this.profileOnSaveError = ''
    this.profileOnSaveSuccess = ''
  }
}
