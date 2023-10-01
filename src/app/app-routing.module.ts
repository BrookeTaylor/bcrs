/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: app-routing module
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './shared/auth.guard';
import { DirectoryComponent } from './directory/directory.component';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { GraphComponent } from './graph/graph.component';
import { roleGuard } from './shared/role.guard';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'BCRS: About'
      },
      {
        path: 'directory',
        component: DirectoryComponent,
        title: 'BCRS: Directory'
      },
      {
        // 404 page
        path: 'not-found',
        component: NotFoundComponent,
        title: 'Page 404'
      },
      {
        // FAQ Page
        path: 'faq',
        component: FaqComponent,
        title: 'FAQ Page'
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [authGuard]
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [authGuard],
        loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        title: 'My Profile Page'
      },
      {
        path: 'graph',
        component: GraphComponent,
        title: 'Graph Page',
        canActivate: [roleGuard]
      }
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
