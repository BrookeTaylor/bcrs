/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/20/2023
 *  Description: swagger ui
 */

/**
  *
  * findAll
  *
  * @openapi
  * /api/users:
  *   get:
  *     tags:
  *       - Users
  *     summary: Get a list of all users.
  *     responses:
  *       200:
  *         description: A list of users.
  *         content:
  *           application/json:
  *             schema:
  *               type: "array"
  *               description: "An array of user objects."
  *       400:
  *         description: Bad request
  *       404:
  *         description: Not found
  *       500:
  *         description: Internal Server Error
  *
  */

/**
  *
  * findById
  *
  * @openapi
  * /api/users/{userId}:
  *   get:
  *     tags:
  *       - Users
  *     summary: Get a user by their ID.
  *     parameters:
  *       - in: path
  *         name: userId
  *         required: true
  *         description: The ID of the user to retrieve.
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: The user object.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 _id:
  *                   type: string
  *                 empId:
  *                   type: integer
  *                 firstName:
  *                   type: string
  *                 lastName:
  *                   type: string
  *                 phoneNumber:
  *                   type: integer
  *                 address:
  *                   type: string
  *                 email:
  *                   type: string
  *                 password:
  *                   type: string
  *                 selectedSecurityQuestions:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       questionOne:
  *                         type: string
  *                       answerOne:
  *                         type: string
  *                       questionTwo:
  *                         type: string
  *                       answerTwo:
  *                         type: string
  *                       questionThree:
  *                         type: string
  *                       answerThree:
  *                         type: string
  *
  *       400:
  *         description: Bad Request.
  *       404:
  *         description: Not Found.
  *       500:
  *         description: Internal Server Error
  *
  */




/**
 * createUser
 *
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   empId:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phoneNumber:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *                   selectedSecurityQuestions:
 *                     type: array
 *                     minItems: 3
 *                     maxItems: 3
 *                     items:
 *                       type: object
 *                       properties:
 *                         question:
 *                           type: string
 *                         answer:
 *                           type: string
 *                   isDisabled:
 *                     type: boolean
 *             required:
 *              - empId
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - role
 *              - isDisabled
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error
 */



/**
 * updateUser
 *
 * @openapi
 * /api/users/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by their userId.
 *     description: Update a user's name (firstName or lastName) or their role by their userId.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: A valid userId.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   role:
 *                     type: string
 *             required:
 *              - firstName
 *              - lastName
 *              - role
 *     responses:
 *       201:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: Not Found.
 *       500:
 *         description: Internal Server Error
 */




/**
 *
 * deleteUser
 *
 * @openapi
 * /api/users/{empId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: deleteUser
 *     description: Delete a user by their empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         description: A valid empId.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */


/**
 *
 * signin
 *
 * @openapi
 * /api/security/signin:
 *   post:
 *     tags:
 *       - Security
 *     summary: User Sign In
 *     description: Sign in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       204:
 *         description: Sign In Successful
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */




/**
 * registerUser
 *
 * @openapi
 * /api/security/register:
 *   post:
 *     tags:
 *       - Security
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   password:
 *                     type: string
 *                   selectedSecurityQuestions:
 *                     type: array
 *                     minItems: 3
 *                     maxItems: 3
 *                     items:
 *                       type: object
 *                       properties:
 *                         question:
 *                           type: string
 *                         answer:
 *                           type: string
 *                   isDisabled:
 *                     type: boolean
 *             required:
 *              - firstName
 *              - lastName
 *              - email
 *              - phoneNumber
 *              - address
 *              - password
 *              - isDisabled
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: Not Found.
 *       500:
 *         description: Internal Server Error
 */




/**
 *
 * verifyUsers
 *
 * @openapi
 * /api/security/verify/users/{email}:
 *   post:
 *     tags:
 *       - Security
 *     summary: Verify User by Email
 *     description: Verify a user by their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address of the user to verify.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 empId:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phoneNumber:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 selectedSecurityQuestions:
 *                   type: array
 *                   minItems: 3
 *                   maxItems: 3
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                 role:
 *                   type: string
 *                 isDisabled:
 *                   type: boolean
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */



/**
 *
 * verifySecurityQuestions
 *
 * @openapi
 * /api/security/verify/users/{email}/security-questions:
 *   post:
 *     tags:
 *       - Security
 *     summary: Verify Security Questions for a User
 *     description: Verify a user's security questions by their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               securityQuestions:
 *                 type: array
 *                 minItems: 3
 *                 maxItems: 3
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *             required:
 *               - securityQuestions
 *     responses:
 *       200:
 *         description: User's security questions verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 empId:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phoneNumber:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 selectedSecurityQuestions:
 *                   type: array
 *                   minItems: 3
 *                   maxItems: 3
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                 role:
 *                   type: string
 *                 isDisabled:
 *                   type: boolean
 *       400:
 *         description: Bad Request. Invalid request format.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */




/**
 * Reset Password
 *
 * @openapi
 * /api/security/users/{email}/reset-password:
 *   delete:
 *     tags:
 *       - Security
 *     summary: Reset a user's password by email.
 *     description: Reset a user's password by their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address of the user whose password needs to be reset.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */




/**
 * findSelectedSecurityQuestions
 *
 * @openapi
 * /api/users/{email}/security-questions:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get selected security questions for a user by email.
 *     description: Retrieve the selected security questions for a user based on their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address of the user to retrieve security questions for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Security questions retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 selectedSecurityQuestions:
 *                   type: array
 *                   minItems: 1
 *                   maxItems: 3
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *       400:
 *         description: Bad Request. Invalid request format.
 *       404:
 *         description: User not found. The provided email does not exist in the database.
 *       500:
 *         description: Internal Server Error. An unexpected server error occurred.
 */
