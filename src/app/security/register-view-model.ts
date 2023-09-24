/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Brett Grashorn
 *  Date: 09/24/2023
 *  Description: register-view-model.ts
 */

import { selectedSecurityQuestionsViewModel } from "./selected-security-questions-view-model"


export interface RegisterViewModel {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: number
  address: string
  selectedSecurityQuestions: selectedSecurityQuestionsViewModel[]
}