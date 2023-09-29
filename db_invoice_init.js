/**
 *  Title: Bob's Computer Repair Shop
 *  Author: Professor Krasso
 *  Modified by: Brooke Taylor
 *  Date: 09/25/2023
 *  Description: Users for BCRS.
 *
 *  To run:
 *
 *    node db_invoice_init.js
 *
 */

const { MongoClient } = require('mongodb')
const config = require('./server/utilis/config')

const MONGO_URL = config.DB_URL
const DB_NAME = config.DB_NAME

const client = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function dbInit() {

  try {

    const db = client.db(DB_NAME) // connect to bcrsDB

    await db.dropCollection('invoices') // drop the users collection


    await db.createCollection('invoices', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            email: { bsonType: 'string' },
            fullName: { bsonType: 'string' },
            lineItems: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  title: { bsonType: 'string' },
                  price: { bsonType: 'number' }
                },
              },
            },
            partsAmount: { bsonType: 'number' },
            laborAmount: { bsonType: 'number' },
            invoiceTotal: { bsonType: 'number' },
            id: { bsonType: 'number' },
            date: { bsonType: 'string' }
          }
        }
      }
    })


    const invoices = [
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
        "id": 35487,
        "date": "9/28/2023"
      },
      {
        "email": "mozart@nodebucket.com",
        "fullName": "Wolfgang Mozart",
        "lineItems": [
          {
            "title": "Software Installation",
            "price": 49.99
          },
          {
            "title": "PC Tune Up",
            "price": 89.99
          },
          {
            "title": "Keyboard Cleaning",
            "price": 45
          }
        ],
        "partsAmount": 150,
        "laborAmount": 100,
        "lineItemTotal": 184.98,
        "invoiceTotal": 434.98,
        "id": 23609,
        "date": "9/28/2023"
      },
      {
        "email": "smith@bcrs.com",
        "fullName": "Bob Smith",
        "lineItems": [
          {
            "title": "Disk Cleanup",
            "price": 129.99
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
        "partsAmount": 0,
        "laborAmount": 50,
        "lineItemTotal": 359.97,
        "invoiceTotal": 409.97,
        "id": 97523,
        "date": "9/28/2023"
      }
    ]


    await db.collection('invoices').insertMany(invoices)


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