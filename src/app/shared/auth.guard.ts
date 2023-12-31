/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Brett Grashorn
 *  Date: 09/24/2023
 *  Description: roleGuard
 */

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService)

  // logs in user with correct user ID
  if (cookie.get('session_user')) {
    console.log('You are logged in and have a valid session cookie')
    return true
  } else {
    console.log('You must be logged in to access this page!')
    const router = inject(Router)
    router.navigate(['/security/signin'], {queryParams: { returnUrl: state.url }})
    return false
  }
};
