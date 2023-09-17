/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/16/2023
 *  Description: db init
 */

'use strict'

const { MongoClient } = require('mongodb')
const config = require('./server/utilis/config')
const bcrypt = require('bcryptjs')

const MONGO_URL = config.DB_URL
const DB_NAME = config.DB_NAME
const saltRounds = 10

const client = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function dbInit() {
  try {
    const db = client.db(DB_NAME) // connect to bcrsDB

    await db.dropCollection('users') // drop the users collection

    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            empId: { bsonType: 'number' },
            firstName: { bsonType: 'string' },
            lastName: { bsonType: 'string' },
            phoneNumber: { bsonType: 'number' },
            address: { bsonType: 'string' },
            email: { bsonType: 'string' },
            password: { bsonType: 'string' },
            securityQuestions: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  question: { bsonType: 'string' },
                  answer: { bsonType: 'string' },
                },
              },
            },
            role: { bsonType: 'string' },
            isDisabled: { bsonType: 'bool' },
          },
        },
      },
    })


    await db.collection('users').createIndex({ email: 1 }, { unique: true })

    const users = [
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
      },
      {
        empId: 1009,
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'smith1@bcrs.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        selectedSecurityQuestions: [
          {
            questionOne: 'What is your favorite book?',
            answerOne: 'To Kill a Mockingbird',
          },
          {
            questionTwo: 'What is your favorite vacation destination?',
            answerTwo: 'Grand Canyon',
          },
          {
            questionThree: 'What is your favorite food?',
            answerThree: 'Mexican',
          },
        ],
        role: 'admin',
        isDisabled: false,
      },
      {
        empId: 1010,
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'smith2@bcrs.com',
        password: bcrypt.hashSync('Password01', saltRounds),

        selectedSecurityQuestions: [
          {
            questionOne: 'What is your favorite book?',
            answerOne: 'The President Is Missing',
          },
          {
            questionTwo: 'What is your favorite vacation destination?',
            answerTwo: 'Washington, D.C.',
          },
          {
            questionThree: 'What is your favorite food?',
            answerThree: 'Steak',
          },
        ],
        role: 'standard',
        isDisabled: false,
      }
    ]

    // Insert the records into MongoDB Atlas
    await db.collection('users').insertMany(users)
  } catch (err) {
    throw err
  } finally {
    await client.close()
  }
}


function getDateTime() {
  const now = new Date()
  const date = now.toLocaleDateString('en-US')
  const time = now.toLocaleTimeString('en-US')

  return `${date} ${time}`
}

async function run () {
  try {
    await dbInit()

    console.log('\n  End of program ', getDateTime())
  } catch (err) {
    console.error(err)
  }
}

run() // run the main function