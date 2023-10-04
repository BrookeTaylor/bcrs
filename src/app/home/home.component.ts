/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/24/2023
 *  Description: home.component.ts
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface SessionUser {
  fullName: string
  role: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sessionUser: SessionUser
  isSignedIn: boolean


constructor(private cookieService: CookieService) {
  this.sessionUser = {} as SessionUser
  this.isSignedIn = this.cookieService.get('session_user') ? true : false

  if (this.isSignedIn) {
    this.sessionUser = JSON.parse(this.cookieService.get('session_user'))
    console.log('Session User:', this.sessionUser)
  }
}
}
