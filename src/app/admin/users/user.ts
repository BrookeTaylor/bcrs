/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: roleGuard
 */

export interface User {
  empId: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  email: string;
  role: string;
  password: string;
  securityQuestions?: {
    questionOne: string;
    answerOne: string;
    questionTwo: string;
    answerTwo: string;
    questionThree: string;
    answerThree: string;
  }[];
  isDisabled: boolean;
}