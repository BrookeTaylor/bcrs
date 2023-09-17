'use strict'

const express = require('express')
const { mongo } = require('../utilis/mongo')
const bcrypt = require('bcryptjs')
const Ajv = require('ajv')

const router = express.Router()
const ajv = new Ajv()

const signinSchema = {
  type: 'object',
  properties: {
    email: { type: 'string'},
    password: { type: 'string'}
  },
  required: ['email', 'password'],
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

// added export
module.exports = router