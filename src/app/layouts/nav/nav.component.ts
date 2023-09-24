/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/24/2023
 *  Description: nav
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


export interface SessionUser {
  fullName: string
  role: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
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

signout() {
  this.cookieService.deleteAll();
  window.location.href = '/'
  }
}