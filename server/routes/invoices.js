/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/25/2023
 *  Description: invoice routes
 */

const express = require('express')
const router = express.Router()
const { mongo } = require('../utilis/mongo')
const Ajv = require('ajv')
const ajv = new Ajv()


const lineItemsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      price: { type: 'number' }
    }
  }
}


const invoiceSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    fullName: { type: 'string' },
    lineItems: lineItemsSchema,
    partsAmount: { type: 'number' },
    laborAmount: { type: 'number' },
    lineItemTotal: { type: 'number' },
    invoiceTotal: { type: 'number' }
  }
}



/**
 * findAllInvoices
 */
router.get('/', (req, res, next) => {
  try {
    mongo(async (db) => {

      const invoices = await db.collection('invoices').find().toArray();

      if (!invoices) {
        const err = new Error('No invoices found');
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.json(invoices);

    }, next);

  } catch (err) {
    console.log('err', err);

    if (err.name === 'ValidationError') {

      res.status(400).json({
        message: 'Bad Request',
      });

  } else {
    next(err);
  }
}});



/**
 * findByEmail
 */
router.get('/:email', (req, res, next) => {
  try {
    const email = req.params.email;

    if (!email) {
      res.status(400).json({
        message: 'Email is required',
      });
      return;
    }

    mongo(async (db) => {
      const invoices = await db.collection('invoices').find({ email: email }).toArray();

      if (!invoices) {
        const err = new Error(`No invoices found for: ${email}`);
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.json(invoices);
    }, next);
  } catch (err) {
    console.log('err', err);

    if (err.name === 'ValidationError') {
      res.status(400).json({
        message: 'Bad Request',
      });
    } else {
      next(err);
    }
  }
});



/**
 * createInvoice
 */
router.post('/', (req, res, next) => {
  try {
    const invoice = req.body;

    const validate = ajv.compile(invoiceSchema);
    const isValid = validate(invoice);

    if (!isValid) {
      res.status(400).json({
        message: 'Bad Request',
        errors: validate.errors,
      });
      return;
    }

    mongo(async (db) => {
      const result = await db.collection('invoices').insertOne(invoice);

      res.status(201).json({
        message: 'Invoice created successfully',
      });
    }, next);
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});


/**
 * findPurchasesByService
 */
router.get("/purchases-graph", async (req, res, next) => {
  try {


    mongo(async (db) => {
      // Aggregate query
      const pipeline = [
        { $unwind: "$lineItems" },
        {
          $group: {
            _id: {
              title: "$lineItems.title",
              price: "$lineItems.price",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.title": 1 } },
      ];

      console.log("Purchases by Service Graph");

      const result = await db
        .collection('invoices')
        .aggregate(pipeline)
        .toArray(); // Show as array

      res.status(200).json(result);
    }, next);
  } catch (err) {
    console.error("err:", err);
    next(err);
  }
});





module.exports = router