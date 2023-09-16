/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/13/2023
 *  Description: swagger ui
 */


/**
 * @openapi
 * tags:
 *   name: Users
 */

/**
  *
  * @openapi
  * /api/users:
  *   get:
  *     summary: Get a list of all users.
  *     tags: [Users]
  *     responses:
  *       200:
  *         description: A list of users.
  *         content:
  *           application/json:
  *             schema:
  *               type: "array"
  *               description: "An array of user objects."
  *
  */




/**
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
 * @openapi
 * /api/security/signin:
 *   post:
 *     tags:
 *       - Users
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