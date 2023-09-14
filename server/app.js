/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 8/5/2023
 * Description: server setup
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const userRoute = require('./routes/user')
const securityRoute = require('./routes/security')

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))

// Define an object literal named options with the following properties/values
const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "BCRS APIs",
          version: "1.0.0",
      },
  },
  apis: ["./swagger.js"], // files containing annotations for the OpenAPI Specification
};

app.use('/api/users', userRoute)
// fixed typo
app.use('/api/security', securityRoute)


// Create a new variable name openapiSpecification
// and call the swaggerJsdoc library using the options object literal.
const openapiSpecification = swaggerJsdoc(options);

// Wire the openapiSpecification variable to the app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));



// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application