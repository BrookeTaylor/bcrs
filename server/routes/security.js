/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 09/17/2023
 *  Description: security routes
 */

'use strict'

const express = require('express')
const { mongo } = require('../utilis/mongo')
const bcrypt = require('bcryptjs')
const Ajv = require('ajv')

const router = express.Router()
const ajv = new Ajv()

const saltRounds = 10

const signinSchema = {
  type: 'object',
  properties: {
    email: { type: 'string'},
    password: { type: 'string'}
  },
  required: ['email', 'password'],
  additionalProperties: false
}


const resetPasswordSchema = {
  type: 'object',
  properties: {
    password: { type: 'string' }
  },
  required: ['password'],
  additionalProperties: false
}



/**
 * signin
 */
router.post('/signin', (req, res, next) => {
  try {
    const signin = req.body
    console.log('Sign In object', signin)

    const validator = ajv.compile(signinSchema)
    const valid = validator(signin)

    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validator.errors
      console.log('sign validation errors', validator.errors)
      next(err)
      return
    }

    mongo(async db => {
      const user = await db.collection('users').findOne({ email: signin.email })

      if (!user) {
        const err = new Error('Unauthorized')
        err.status = 401
        err.message = 'Unauthorized: The email or password is invalid'
        console.log('Unauthorized: The email or password is invalid: ', signin.email)
        next(err)
        return
      }

      let passwordIsValid = bcrypt.compareSync(signin.password, user.password)

      if (!passwordIsValid) {
        const err = new Error('Unauthorized')
        err.status = 401
        err.message = 'Unauthorized: The email or password is invalid'
        console.log("Unauthorized: The email or password is invalid", err)
        next(err)
        return
      }

      if (passwordIsValid) {
        res.send(user);
        return;
      }


    }, (err) => {
      console.error(err);
      err.status = 500;
      next(err);

    }, next)
  } catch (err) {
    console.log('err')
    next(err)
  }
})







/**
 * verifyUser
 */
router.post('/verify/users/:email', (req, res, next) => {
  try {

    const email = req.params.email
    console.log('Employee email', email)

    mongo(async db => {
      const user = await db.collection('users').findOne({ email: email })

      if (!user) {
        const err = new Error('Not Found')
        err.status = 400
        console.log('Employee not found', err)
        next(err)
        return
      }

      console.log('selected user', user)

      res.send(user)
    }, next)


  } catch (err) {
    console.error('err', err)
    next(err)
  }
})







/**
 * reset password
 */
router.delete('/users/:email/reset-password', (req, res, next) => {
  try {

    const email = req.params.email
    const user = req.body

    console.log('User email', email)

    const validate = ajv.compile(resetPasswordSchema)
    const valid = validate(user)

    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validate.errors
      console.log('password validation errors', validate.errors)
      next(err)
      return
    }

    mongo (async db => {

      const user = await db.collection('users').findOne({ email: email })

      if (!user) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('Employee not found', err)
        next(err)
        return
      }

      console.log('Selected User', user)

      const hashedPassword = bcrypt.hashSync(user.password, saltRounds)

      const result = await db.collection('users').updateOne(
        { email: email},
        {
          $set:{ password: hashedPassword }
        }
      )

      console.log('MongoDB update result', result)

      res.status(204).send()

    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})




// added export
module.exports = router