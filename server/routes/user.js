/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor, Janis Gonzalez
 *  Date: 09/16/2023
 *  Description: user routes
 */

'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utilis/mongo')
const Ajv = require('ajv')
const bcrypt = require('bcryptjs')

const saltRounds = 10
const ajv = new Ajv() // create a new instance of the Ajv class

const userSchema = {
  type: 'object',
  properties: {
    empId: { type: 'number'},
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    phoneNumber: { type: 'number'},
    address: { type: 'string'},
    email: { type: 'string'},
    password: { type: 'string' },
    selectedSecurityQuestions: { type: 'array' },
    role: { type: 'string'},
    isDisabled: { type: 'boolean' }
  },
  required: [
    'empId',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'email',
    'password',
//    'selectedSecurityQuestions',
    'role',
//    'isDisabled'
  ],

/**
 * Setting this to false breaks the app. I haven't been able to address this yet.
 */
  additionalProperties: true
}

const updateUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    role: { type: 'string'},
  },
  required: ['firstName', 'lastName', 'role'],
  additionalProperties: false
}

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
 * findByempId
 */

router.get('/:empId', (req, res, next) => {
  try {

    console.log('empId', req.params.empId)

    let { empId } = req.params // get the empId from the req.params object
    empId = parseInt(empId, 10) // determines if the empId is a numerical value

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {
      const user = await db.collection('users').findOne(
        { empId },
        { projection: { empId: 1, firstName: 1, lastName: 1, email: 1, password: 1, phoneNumber: 1, address: 1, selectedSecurityQuestions: 1, role: 1, isDisabled: 1 } }
      ) // find user by empID

      if (!user) {
        const err = new Error('Unable to find employee with empId ' + empId)
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
router.post('/', (req, res, next) => {
  try {
    const { user } = req.body
    console.log('user', user)

    const validator = ajv.compile(userSchema)
    const valid = validator(user)

    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validator.errors
      console.log('req.body validation failed', err)
      next(err)
      return
    }

    user.password = bcrypt.hashSync(user.password, saltRounds)

    mongo (async db => {
      const result = await db.collection('users').insertOne(user)

      console.log('result', result)

      res.json({ id: result.insertedId})
    }, next)

  } catch (err) {

      console.log('err', err)
      next(err)

  }
})

/**
 * updateUser
 */
router.put('/:empId', (req, res, next) => {
  try {
    let { empId } = req.params
    empId = parseInt(empId, 10)


    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    const { user } = req.body

    const validator = ajv.compile(updateUserSchema)
    const valid = validator(user)

    if (!valid) {
      const err = new Error('Bad request')
      err.status = 400
      err.errors = validator.errors
      console.log('updateUserSchema validation failed', err)
      next(err)
      return
    }

    mongo(async db => {
      const result = await db.collection('users').updateOne(
        { empId },
        { $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }}
      )

      console.log('update user result ', result)

      res.status(204).send()

      })
  } catch (err) {
    console.log('err', err)
    next(err)
  }
});

/**
 * deleteUser
 */
router.delete('/:empId', async (req, res, next) => {
  try {
    const { empId } = req.params;

    if (isNaN(empId)) {
      const err = new Error('Bad Request - Input must be a number');
      err.status = 400;
      console.error(err);
      return next(err);
    }

    mongo(async (db) => {

      const user = await db.collection('users').findOne({ empId: parseInt(empId) });

      if (!user) {
        res.status(404).json({ message: 'Not Found' });

      } else {
        if (user.isDisabled) {
          res.status(204).send();

        } else {
          // Update user isDisabled to true
          await db.collection('users').updateOne(
            { empId: parseInt(empId) },
            { $set: { isDisabled: true } }
          );

          res.sendStatus(204);
            return;
        }
      }
    }, (err) => {
      console.error(err);
      err.status = 500;
      next(err);
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});





module.exports = router