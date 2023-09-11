Title: bcrs    
Author: Group 2 - Brooke Taylor, Janis Gonzales, & Brett Grashorn  
Date: 09/10/2023  
Description: Bob's Computer Repair Shop the App.  

---

* Please enter a MongoDB connection string: 

      mongodb+srv://bcrs_user:s3cret@bellevueuniversity.kqpr8ra.mongodb.net/bcrsDB?retryWrites=true&w=majority


# Draft NoSQL Data Structure 

    {
      "users": [
        {
          "firstName": "Wolfgang Amadeus",
          "lastName": "Mozart",
          "phoneNumber": 8001234567,
          "address": "1000 Galvin Rd S, Bellevue, NE 68005",
          "email": "mozart@nodebucket.com",
          "password": "Password01",
          "questionOne": "answerOne",
          "questionTwo": "answerTwo",
          "questionThree": "answerThree",
          "role": "admin",
          "timeStamp": "timestamp",
          "isDisabled": false
        },
        {
          "firstName": "Johann Sebastian",
          "lastName": "Bach",
          "phoneNumber": 8001234567,
          "address": "1000 Galvin Rd S, Bellevue, NE 68005",
          "email": "bach@nodebucket.com",
          "password": "Password01",
          "questionOne": "answerOne",
          "questionTwo": "answerTwo",
          "questionThree": "answerThree",
          "role": "standard",
          "timeStamp": "timestamp",
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



