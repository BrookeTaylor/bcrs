/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';

export const roleGuard: CanActivateFn = (route, state) => {

  const cookie = inject(CookieService)
  let sessionUser = JSON.parse(cookie.get('session_user'))

  console.log('Session User:', sessionUser)


  if (!sessionUser) {

    console.log('You must be logged in to access this page!')

    const router = inject(Router)
    router.navigate(['/security/signin'], {queryParams: {returnUrl: state.url }})

    return false
  }


  if (sessionUser.role !== 'admin') {

    return false
  }

  return true;
};
