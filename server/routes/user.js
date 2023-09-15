/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor, Janis Gonzalez
 *  Date: 09/13/2023
 *  Description: user routes
 */

'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utilis/mongo')

/**
 * findAll
 */
router.get('/', (req, res, next) => {
  try {
    mongo(async (db) => {
      const users = await db.collection('users').find({ isDisabled: false }).toArray();

      if (!users) {
        const err = new Error('No users found');
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.json(users);
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
 * findById
 */
router.get('/:email', (req, res, next) => {
  try {

    console.log('email', req.params.email)

    let { email } = req.params; // get the email from the req.params object

    mongo(async (db) => {
      const user = await db.collection('users').findOne(
        { email },
        { projection: { firstName: 1, lastName: 1, email: 1, password: 1, phoneNumber: 1, role: 1, securityQuestions: 1, address: 1, isDisabled: 1 } }
      ) // find user by email

      // if user does not exist
      if (!user) {
        const err = new Error('Unable to find user with email ' + email)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.send(user)
    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * createUser
 */


/**
 * updateUser
 */


/**
 * deleteUser
 */


/**
 * signin
 */



module.exports = router