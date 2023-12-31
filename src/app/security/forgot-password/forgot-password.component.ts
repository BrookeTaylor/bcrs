/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Brooke Taylor
 *  Date: 09/20/2023
 *  Description: forgot password component
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {


  passwordResetForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
    confirmPassword: ['', [Validators.required]],
  });



  errorMessage: string;
  isLoading: boolean = false;
  emailForm: FormGroup;

  email: string = '';

  // start of reset steps
  step: string = 'start';

  next(nextStep: string) {
    this.step = nextStep;
  }

  questions: any[] = [];
  securityAnswers: { question: string; answer: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.errorMessage = '';
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.securityAnswers = [
      { question: '', answer: '' },
      { question: '', answer: '' },
      { question: '', answer: '' },
    ];

  }

  ngOnInit(): void {}

  emailSubmit() {
    if (this.emailForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.isLoading = true;
    const email = this.emailForm.get('email')?.value;
    this.email = email;

    this.http.get(`/api/users/${email}/security-questions`, {}).subscribe(
      (user: any) => {
        if (user.selectedSecurityQuestions.length === 0) {
          this.errorMessage = "User doesn't have security questions selected. Please contact the system administrator.";
          this.isLoading = false;
        } else {
          this.questions = user.selectedSecurityQuestions;
          this.securityAnswers = this.questions.map((question) => ({
            question: question.question,
            answer: '',
          }));
          this.step = 'security';
          this.isLoading = false;
        }
      },
      (error) => {
        this.errorMessage = 'User not found. Please check your email address.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
        this.isLoading = false;
      }
    );
  }





  submitAnswers() {
    const email = this.email;
    this.isLoading = true;

    let empty = false;

    for (const answer of this.securityAnswers) {
      if (!answer.answer) {
        empty = true;
        break;
      }
    }

    if (empty) {
      this.errorMessage = "All fields must be completed.";
      this.isLoading = false;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const requestData = {
      email: email,
      securityQuestions: this.securityAnswers,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post(`/api/security/verify/users/${email}/security-questions`, requestData, { headers })
      .subscribe(
        (response: any) => {
          console.log('Security questions matched:', response);
          this.step = 'reset';
          this.isLoading = false;
        },
        (error) => {
          console.error('Security questions did not match:');
          this.errorMessage = 'Security questions did not match.';
          this.isLoading = false;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
          return;

        }
      );
  }



  resetPassword() {
    if (this.passwordResetForm.invalid) {
      this.errorMessage = 'Please fill out both password fields.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.isLoading = true;

    const password = this.passwordResetForm.get('password')?.value;
    const confirmPassword = this.passwordResetForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.isLoading = false;
      this.errorMessage = "The Passwords do not match."
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const requestData = {
      password: password,
    };

    const email = this.email;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.delete(`/api/security/users/${email}/reset-password`, { headers, body: requestData }).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Password reset successfully:', response);
        this.router.navigate(['/security/signin']);
      },
      (error) => {
        console.error('Password reset failed:', error);
      }
    );
  }
}
