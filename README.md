Title: bcrs    
Author: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn  
Date: 09/17/2023  
Description: Bob's Computer Repair Shop the App.  

---

# Draft NoSQL Data Structure 

    {
      "users": [
{
        empId: 1006,
        firstName: 'Bob',
        lastName: 'Smith',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'smith@bcrs.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        selectedSecurityQuestions: [
          {
            questionOne: 'What is your favorite book?',
            answerOne: 'A working stiffs manifesto',
          },
          {
            questionTwo: 'What is your favorite vacation destination?',
            answerTwo: 'Lake',
          },
          {
            questionThree: 'What is your favorite food?',
            answerThree: 'Cheeseburger',
          },
        ],
        role: 'admin',
        isDisabled: false,
      },
      {
        empId: 1007,
        firstName: 'Wolfgang',
        lastName: 'Mozart',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'mozart@nodebucket.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        selectedSecurityQuestions: [
          {
            questionOne: 'What is your favorite book?',
            answerOne: 'unknown',
          },
          {
            questionTwo: 'What is your favorite vacation destination?',
            answerTwo: 'Italy',
          },
          {
            questionThree: 'What is your favorite food?',
            answerThree: 'sacher torte',
          },
        ],
        role: 'admin',
        isDisabled: false,
      },
      {
        empId: 1008,
        firstName: 'Johann',
        lastName: 'Bach',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'bach@nodebucket.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        selectedSecurityQuestions: [
          {
            questionOne: 'What is your favorite book?',
            answerOne: 'The Bible',
          },
          {
            questionTwo: 'What is your favorite vacation destination?',
            answerTwo: 'Countryside',
          },
          {
            questionThree: 'What is your favorite food?',
            answerThree: 'bratwurst',
          },
        ],
        role: 'standard',
        isDisabled: false,
      }
      ]
    }





    {
      "invoices": [
        {
          "email": "bach@nodebucket.com",
          "fullName": "Johann Bach",
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



