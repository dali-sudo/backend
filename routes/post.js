import express from "express";
import { body } from "express-validator";
import { addOnce,getAll,addLike,RemoveLike,getPostsByUser,getAllwithimage,getPostByid,pagination,deletepost} from "../controllers/post.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: API endpoints for managing pets
 */


/**
 * @swagger
 * /deletepost:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     description: Delete a post from the system.
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
 *          description: Post deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
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
  .route("/deletePost")
  .post(
 
    deletepost
  );


  /**
 * @swagger
 * /getPostById:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Get a post by ID
 *     description: Retrieve a post by its ID.
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
 *          description: Post retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *               
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



  /**
 * @swagger
 * /getPostById:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Get a post by ID
 *     description: Retrieve a post by its ID.
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
 *          description: Post retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                
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
  .route("/discoverPost")
  .post(
    getPostByid
  );
  /**
 * @swagger
 * /pagination:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Get paginated posts
 *     description: Retrieve paginated posts based on the provided parameters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               skip:
 *                 type: number
 *               limit:
 *                 type: number
 *     responses:
 *        200:
 *          description: Posts retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                 
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
  .route("/getPagination")
  .post(
    pagination
  );

  /**
 * @swagger
 * /getAllwithimage:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts with images
 *     description: Retrieve all posts that have at least one image.
 *     responses:
 *        200:
 *          description: Posts retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
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
  .route("/discover")
  .post(
 
    getAllwithimage
  );



  /**
 * @swagger
 * /addOnce:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: Create a new post with description, images, owner, and tags.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descreption:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               owner:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *        200:
 *          description: Post created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
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
  .route("/addPost")
  .post(
 
    addOnce
  );

  /**
 * @swagger
 * /getAll:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     description: Retrieve all posts sorted by date in descending order.
 *     responses:
 *        200:
 *          description: Posts retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    owner:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                        avatar:
 *                          type: string
 *                    tags:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                    images:
 *                      type: array
 *                      items:
 *                        type: string
 *                    // Add other properties of the Post model here
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
  .route("/getAll")
  .post(
    getAll
  );


  /**
 * @swagger
 * /getPostsByUser:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Get posts by user
 *     description: Retrieve posts owned by a specific user, sorted by date in descending order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *        200:
 *          description: Posts retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    owner:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                        avatar:
 *                          type: string
 *                    tags:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                    images:
 *                      type: array
 *                      items:
 *                        type: string
 *                    // Add other properties of the Post model here
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
  .route("/getPostByUser")
  .post(
    getPostsByUser
  );

  /**
 * @swagger
 * /addLike:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Add a like to a post
 *     description: Add a like to a specific post and update the like count. Also, create a notification for the post owner if the liker is not the owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the post
 *               like:
 *                 type: string
 *                 description: The ID of the user who liked the post
 *     responses:
 *        200:
 *          description: Like added successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  // Add properties of the updated post here
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
  .route("/like")
  .post(
    
 addLike
  
  );

  /**
 * @swagger
 * /RemoveLike:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Remove a like from a post
 *     description: Remove a like from a specific post and update the like count.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the post
 *               like:
 *                 type: string
 *                 description: The ID of the user to remove the like
 *     responses:
 *        200:
 *          description: Like removed successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  // Add properties of the updated post here
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
  .route("/unlike")
  .post(
    
 
  RemoveLike
  );

  
  export default router;