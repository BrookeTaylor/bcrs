/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/12/2023
 *  Description: user routes
 */

'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utilis/mongo')

/**
 * findAll
 */
router.get('/users', (req, res, next) => {
  try {
    mongo(async (db) => {
      const users = await db.collection('users').find().toArray();

      if (!users) {
        const err = new Error('No users found');
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.send(users);
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