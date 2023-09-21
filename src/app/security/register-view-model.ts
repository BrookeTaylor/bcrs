/**
 *  Title: register-view-model.ts
 *  Author: Brett Grashorn
 *  Date: 9/20/23
 */
import { selectedSecurityQuestionsViewModel } from "./selected-security-questions-view-model"

/**
 *  Interface for the RegisterModel
 *  @property firstName
 *  @property lastName
 *  @property email
 *  @property password
 *  @property selectedSecurityQuestions
 *  @example
 *  {
 *    firstName: 'John',
 *    lastName: 'Doe',
 *    email: 'doe@bcrs.com',
 *    password: 'Password01',
 *    selectedSecurityQuestions: [
 *        { question: 'What is your favorite color?',
 *          answer: 'red'
 *       }
 *    ]
 *  }
 */

export interface RegisterViewModel {
  firstName: string
  lastName: string
  email: string
  password: string
  selectedSecurityQuestions: selectedSecurityQuestionsViewModel[]
}