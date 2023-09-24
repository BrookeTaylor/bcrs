/**
 *  Title: Bob's Computer Repair Shop
 *  Author: Professor Krasso
 *  Modified by: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/24/2023
 *  Description: main
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
