import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";
import auth from '../middlewares/auth.js'
import { signin, signup, putOnce ,Find,getUser,Follow,UnFollow,googlesignin, sendCodetoMail, CodeVerification,restPassword, getUserProfil} from "../controllers/user.js";

const router = express.Router();
router
  .route("/googleSignin")
  .post(
    googlesignin
  );

  

  /**
 * @swagger
 * /users/find:
 *   post:
 *     tags:
 *       - Users
 *     summary: Find users by username
 *     description: Find users in the system by their username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    username:
 *                      type: string
 *                    avatar:
 *                      type: string (base64-encoded image)
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

router
  .route("/find")
  .post(
    Find
  );

  /**
 * @swagger
 * /users/follow:
 *   post:
 *     tags:
 *       - Users
 *     summary: Follow a user
 *     description: Follow another user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               myid:
 *                 type: string
 *               followed:
 *                 type: string
 *     responses:
 *        200:
 *          description: Follow operation successful
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    myid:
 *                      type: string
 *                    followed:
 *                      type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

  router
  .route("/follow")
  .post(
    Follow
  );

  /**
 * @swagger
 * /users/unfollow:
 *   post:
 *     tags:
 *       - Users
 *     summary: Unfollow a user
 *     description: Unfollow a previously followed user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               myid:
 *                 type: string
 *               followed:
 *                 type: string
 *     responses:
 *        200:
 *          description: Unfollow operation successful
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    myid:
 *                      type: string
 *                    followed:
 *                      type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

  router
  .route("/unfollow")
  .post(
    UnFollow
  );


  /**
 * @swagger
 * /users/getUser:
 *   post:
 *     tags:
 *       - Users
 *     summary: Get user details
 *     description: Retrieve details of a specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *        200:
 *          description: User details retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  followerscount:
 *                    type: number
 *                  followingcount:
 *                    type: number
 *                  avatar:
 *                    type: string
 *                  followers:
 *                    type: array
 *                    items:
 *                      type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

  router
  .route("/getUser")
  .post(
    getUser
  );

  /**
 * @swagger
 * /users/getUserProfil:
 *   post:
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     description: Retrieve the profile of a specific user, including their information and posts.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *        200:
 *          description: User profile retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                      followerscount:
 *                        type: number
 *                      followingcount:
 *                        type: number
 *                      avatar:
 *                        type: string
 *                      followers:
 *                        type: array
 *                        items:
 *                          type: string
 *                  posts:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        images:
 *                          type: array
 *                          items:
 *                            type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

  router
  .route("/getUserProfil")
  .post(
    getUserProfil
  );


  /**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: User signup
 *     description: Create a new user account.
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
 *               username:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *               username: JohnDoe
 *     responses:
 *        200:
 *          description: Account created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      username:
 *                        type: string
 *                      email:
 *                        type: string
 *                      followerscount:
 *                        type: number
 *                      followingcount:
 *                        type: number
 *                      followers:
 *                        type: array
 *                        items:
 *                          type: string
 *                      following:
 *                        type: array
 *                        items:
 *                          type: string
 *                      avatar:
 *                        type: string
 *        409:
 *          description: Account creation failed
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: null
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */

router
  .route("/signup")
  .post(
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email"),
    signup
  );


  /**
 * @swagger
 * /users/code-verification:
 *   post:
 *     tags:
 *       - Users
 *     summary: Code verification
 *     description: Verify the recovery code for a user's account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               code: 123456
 *     responses:
 *        200:
 *          description: Code verified successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        400:
 *          description: Incorrect code
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal server error
 */
  router.route("/verifCode").post(CodeVerification);


  /**
 * @swagger
 * /users/reset-password:
 *   post:
 *     tags:
 *       - Users
 *     summary: Reset password
 *     description: Reset the password for a user's account.
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
 *             example:
 *               email: user@example.com
 *               password: newPassword123
 *     responses:
 *        200:
 *          description: Password reset successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        409:
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        500:
 *          description: Internal server error
 */

  router.route("/resetPassword").post(restPassword);
/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign in
 *     description: Sign in to the user's account.
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
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *        200:
 *          description: Sign in successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                  
 *        400:
 *          description: Bad request - All input is required
 *        401:
 *          description: Unauthorized - Incorrect password or user not found
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        500:
 *          description: Internal server error
 */

router.route("/signin").post(signin);

/**
 * @swagger
 * /users/sendCodetoMail:
 *   post:
 *     tags:
 *       - Users
 *     summary: Send Code to Email
 *     description: Send a verification code to the user's email for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: user@example.com
 *     responses:
 *        200:
 *          description: Email sent successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        409:
 *          description: Email not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          description: Internal server error
 */

router.route("/sendCode").post(sendCodetoMail);


router
  .route("/edit")
  .put(
  
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email"),
    body("profilePic"),
    putOnce
  );

  
  

export default router;