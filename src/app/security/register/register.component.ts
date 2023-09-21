import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from '../register-view-model';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // variables for the register component
  securityQuestions: string[]
  qArr1: string[]
  qArr2: string[]
  qArr3: string[]

  user: RegisterViewModel // User variable
  errorMessage: string // error message variable

  registerForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(`^[0-9]*$`)])],
    address: [null, Validators.compose([Validators.required, Validators.required])],
    question1: [null, Validators.compose([Validators.required])],
    answer1: [null, Validators.compose([Validators.required])],
    question2: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    question3: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {
    // array of Security Questions
    this.securityQuestions = [
      "What is your mother's maiden name?",
      "What is the name of your first pet?",
      "What is your favorite color?",
      "What is your favorite movie?",
      "What is your favorite food?",
      "What is your favorite song?"
    ]

    this.qArr1 = this.securityQuestions
    this.qArr2 = []
    this.qArr3 = []

    this.user ={} as RegisterViewModel
    this.errorMessage = ''
  }

  ngOnInit(): void {
    this.registerForm.get('question1')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 1', val)
      this.qArr2 = this.qArr1.filter(q => q !== val)
    })

    this.registerForm.get('question2')?.valueChanges.subscribe(val => {
      console.log('Value changed from Question 2', val)
      this.qArr3 = this.qArr2.filter(q => q !== val)
    })
  }

  register() {

    this.user = {

      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      phoneNumber: parseInt(this.registerForm.get('phoneNumber')?.value, 10),
      address: this.registerForm.get('address')?.value,
      selectedSecurityQuestions: [
        {
          question: this.registerForm.get('question1')?.value,
          answer: this.registerForm.get('answer1')?.value
        },
        {
          question: this.registerForm.get('question2')?.value,
          answer: this.registerForm.get('answer2')?.value
        },
        {
          question: this.registerForm.get('question3')?.value,
          answer: this.registerForm.get('answer3')?.value
        }
      ]
    }

    console.log('Registering new user', this.user)

     this.securityService.register(this.user).subscribe({
       next: (result) => {
         console.log("Result from Register API call: ", result)
         this.router.navigate(['/security/signin'])
       },
       error: (err) => {
         if (err.error.message) {
           console.log('db error: ', err.error.message)
           this.errorMessage = err.error.message
         } else {
           this.errorMessage = 'Something went wrong. Please contact the system administrator'
           console.log(err)
         }
       }
     })
  }
}
