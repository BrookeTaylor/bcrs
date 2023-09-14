Title: bcrs    
Author: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn  
Date: 09/10/2023  
Description: Bob's Computer Repair Shop the App.  

---

# Draft NoSQL Data Structure 

    {
      "users": [
        {
          "empId": 1007,
          "firstName": "Wolfgang Amadeus",
          "lastName": "Mozart",
          "phoneNumber": 8001234567,
          "address": "1000 Galvin Rd S, Bellevue, NE 68005",
          "email": "mozart@nodebucket.com",
          "password": "Password01",
          "securityQuestions": [
            {
              "question": "questionOne",
              "answer": "answerOne"
            },
            {
              "question": "questionTwo",
              "answer": "answerTwo"
            },
            {
              "question": "questionThree",
              "answer": "answerThree"
            }
          ],
          "role": "admin",
          "isDisabled": false
        },
        {
          "empId": 1008,
          "firstName": "Johann Sebastian",
          "lastName": "Bach",
          "phoneNumber": 8001234567,
          "address": "1000 Galvin Rd S, Bellevue, NE 68005",
          "email": "bach@nodebucket.com",
          "password": "Password01",
          "securityQuestions": [
            {
              "question": "questionOne",
              "answer": "answerOne"
            },
            {
              "question": "questionTwo",
              "answer": "answerTwo"
            },
            {
              "question": "questionThree",
              "answer": "answerThree"
            }
          ],
          "role": "standard",
          "isDisabled": false
        }
      ]
    }





    {
      "invoices": [
        {
          "email": "bach@nodebucket.com",
          "fullName": "Johann Sebastian Bach",
          "lineItems": [
            {
              "Password Reset": 39.99
            },
            {
              "Spyware Removal": 99.99
            },
            {
              "RAM Upgrade": 129.99
            }
          ],
          "partsAmount": 100,
          "laborAmount": 250,
          "lineItemTotal": 269.97,
          "invoiceTotal": 619.97,
          "orderDate": "date"
        }
      ]
    }



