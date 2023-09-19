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

const securityQuestionsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      question: { type: 'string' },
      answer: { type: 'string' }
    },
    required: ['question', 'answer'],
    additionalProperties: false
  }
}

const registerSchema = {
  type: 'object',
  properties: {
    email: { type: 'string'},
    password: { type: 'string'},
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    securityQuestions: securityQuestionsSchema
  },
  required: ['email', 'password', 'firstName', 'lastName', 'securityQuestions'],
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

        const time = new Date();
        await db.collection('users').updateOne(
          { email: signin.email },
          { $set: { lastLogin: time } })

        user.lastLogin = time;
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

//verifySecurityQuestions
router.post('/verify/users/:email/security-questions', (req, res, next) => {
  try {
    const email = req.params.email
    const { securityQuestions } = req.body
    console.log(`Email: ${email}\nSecurityQuestions: ${securityQuestions}`)

    const validate = ajv.compile(securityQuestionsSchema)
    const valid = validate(securityQuestions)

    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validate.errors
      console.log('Security questions validation errors', validate.errors)
      next(err)
      return
    }

    mongo (async db => {
      const user = await db.collection('users').findOne({ email: email })

      if (!user) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('Selected User', user)

      if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
        securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
        securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {
          const err = new Error ('Unauthorized')
          err.status = 401
          err.message = 'Unauthorized: Security  questions do not match.'
          console.log('Unauthorized: Security questions do not match, err')
          next(err)
          return
        }
        res.send(user)
    })
  } catch (err) {
    console.log('err', err)
    next(err)
  }

})



/**
 * register
 */
router.post('/register', (req, res, next) => {
  try {
    const { user } = req.body
    console.log('user', user)

    const validate = ajv.compile(registerSchema)
    const valid = validate(user)

    if(!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validate.errors
      console.log('user validation errors', validate.errors)
      next(err)
      return
    }

    user.password = bcrypt.hashSync(user.password, saltRounds)

    mongo(async db => {

      const users = await db.collection('users')
      .find()
      .sort({ empId: 1 }) //sort the records in ascending order
      .toArray()

      console.log("Employees List", users)

      const userExists = users.find(emp => emp.email === users.email)

      if (userExists) {
        const err = new Error('Bad Request')
        err.status = 400
        err.message = 'User  already exists'
        console.log('User already exists', err)
        next(err)
        return
      }

      const lastUser = users[users.length - 1]
      const newEmpId = lastUser.empId + 1

      const newUser = {
        empId: newEmpId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: 'standard',
        selectedSecurityQuestions: user.selectedSecurityQuestions
      }

      console.log('User to be inserted into MongoDB', newUser)

      const result = await db.collection('users').insertOne(newUser)

      console.log('MongoDB result:', result)

      res.send({ id: result.insertedId })


    }, next)
  } catch(err) {
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

    console.log('Employee email', email)

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

      const trick = await db.collection('users').findOne({ email: email })

      if (!trick) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
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