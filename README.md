Title: bcrs    
Author: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn  
Date: 09/17/2023  
Description: Bob's Computer Repair Shop the App.  

---

Create your own log in, or use a pre-made one: 

* admin: mozart@nodebucket.com / Password01

* standard: bach@nodebucket.com / Password01 

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
              question: 'What is your favorite book?',
              answer: 'A working stiffs manifesto',
            },
            {
              question: 'What is your favorite vacation destination?',
              answer: 'Lake',
            },
            {
              question: 'What is your favorite food?',
              answer: 'Cheeseburger',
            },
          ],
          role: 'admin',
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
              "title": "Password Reset",
              "price": 39.99
            },
            {
              "title": "Spyware Removal",
              "price": 99.99
            },
            {
              "title": "RAM Upgrade",
              "price": 129.99
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



