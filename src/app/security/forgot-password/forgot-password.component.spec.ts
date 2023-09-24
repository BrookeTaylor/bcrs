/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/24/2023
 *  Description: angular app module
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
