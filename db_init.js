/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/14/2023
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
        firstName: 'Wolfgang Amadeus',
        lastName: 'Mozart',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'mozart@nodebucket.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        securityQuestions: [
          {
            question: 'questionOne',
            answer: 'answerOne',
          },
          {
            question: 'questionTwo',
            answer: 'answerTwo',
          },
          {
            question: 'questionThree',
            answer: 'answerThree',
          },
        ],
        role: 'admin',
        isDisabled: false,
      },
      {
        firstName: 'Johann Sebastian',
        lastName: 'Bach',
        phoneNumber: 8001234567,
        address: '1000 Galvin Rd S, Bellevue, NE 68005',
        email: 'bach@nodebucket.com',
        password: bcrypt.hashSync('Password01', saltRounds),
        securityQuestions: [
          {
            question: 'questionOne',
            answer: 'answerOne',
          },
          {
            question: 'questionTwo',
            answer: 'answerTwo',
          },
          {
            question: 'questionThree',
            answer: 'answerThree',
          },
        ],
        role: 'standard',
        isDisabled: false,
      },
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