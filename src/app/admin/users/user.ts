/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Date: 09/14/2023
 *  Description: user interface
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
//  securityQuestions?: { question: string; answer: string }[];
  isDisabled: boolean;
}