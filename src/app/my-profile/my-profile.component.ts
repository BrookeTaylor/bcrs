import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserViewModel } from '../shared/user-view-model';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyProfileModule } from './my-profile-module';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  user: UserViewModel
  myProfile: MyProfileModule
  errorMessage: string
  profileOnSaveError: string
  profileOnSaveSuccess: string
  userInitials: string
  role: string
  avatarColors: Array<string> = ['#372e29', '#7D6B5D', '#eeba35', '#ffd25f']
  randomAvatarColor: string

  profileForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(`^[0-9]*$`)])],
    address: [null, Validators.compose([Validators.required])]
  })

  isLoading: boolean = false;

  constructor (private cookieService: CookieService, private userService: UserService, private fb: FormBuilder) {
    this.user = {} as UserViewModel
    this.myProfile = {} as MyProfileModule
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
        this.profileForm.controls['phoneNumber'].setValue(this.user.phoneNumber)
        this.profileForm.controls['address'].setValue(this.user.address)

      }
    })
      } catch (error) {
        console.error('Error parsing session cookie', error)
      }
    }
  }

  saveChanges() {

    this.isLoading = true;

    let myProfile = {} as MyProfileModule

    myProfile.firstName = this.profileForm.controls['firstName'].value
    myProfile.lastName = this.profileForm.controls['lastName'].value
    myProfile.phoneNumber = parseInt(this.profileForm.get('phoneNumber')?.value, 10)
    myProfile.address = this.profileForm.controls['address'].value

    console.log('My Profile Model: ', myProfile)



    this.userService.updateProfile(this.user.email, myProfile.firstName, myProfile.lastName, myProfile.phoneNumber, myProfile.address).subscribe({
      next: (res) => {
        console.log(res)


      },
      error: (err) => {
        this.isLoading = false;
        console.log(err)
        this.profileOnSaveError = err.message
      },
      complete: () => {
        this.isLoading = false;
        /*
        this.profileForm.reset()
        this.profileForm.controls['phoneNumber'].setValue(this.user.phoneNumber)
        this.profileForm.controls['address'].setValue(this.user.address)
        */

        // Unable to refresh results in page.

        // Bandaid fix!
        window.location.reload();

      }
    })
  }

  close() {
    this.profileForm.reset()
    this.profileForm.controls['phoneNumber'].setValue(this.user.phoneNumber)
    this.profileForm.controls['address'].setValue(this.user.address)
    this.profileOnSaveError = ''
    this.profileOnSaveSuccess = ''
  }
}
