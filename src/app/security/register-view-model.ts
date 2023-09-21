/**
 *  Title: register-view-model.ts
 *  Author: Brett Grashorn
 *  Date: 9/20/23
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