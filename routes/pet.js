import express from "express";
import { addOnce,getAllByUser,getPetTags,getSingleByUser, deletePet} from "../controllers/pet.js";

const router = express.Router();



/**
 * @swagger
 * tags:
 *   - name: Pets
 *     description: API endpoints for managing pets
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       $ref: '../models/user.js' # Path to the User model definition
 */

/**
 * @swagger
 * /addPet:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Add a new pet
 *     description: Add a new pet to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               race:
 *                 type: string
 *               owner:
 *                 type: string
 *               avatar:
 *                 type: string
 *               sexe:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: New pet added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 race:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 sexe:
 *                   type: string
 *                 age:
 *                   type: number
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: Name of the pet
 *         required: true
 *         type: string
 *       - name: type
 *         in: formData
 *         description: Type of the pet
 *         required: true
 *         type: string
 *       - name: race
 *         in: formData
 *         description: Race of the pet
 *         required: true
 *         type: string
 *       - name: owner
 *         in: formData
 *         description: Owner of the pet
 *         required: true
 *         type: string
 *       - name: avatar
 *         in: formData
 *         description: Avatar of the pet
 *         required: false
 *         type: string
 *       - name: sexe
 *         in: formData
 *         description: Sex of the pet
 *         required: true
 *         type: string
 *       - name: age
 *         in: formData
 *         description: Age of the pet
 *         required: true
 *         type: number
 */

router
  .route("/addPet")
  .post(addOnce);


 /**
 * @swagger
 * /getAllByUser:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Get all pets by user
 *     description: Retrieve all pets owned by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *     responses:
 *        200:
 *          description: Pets retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  
 */

router
.route("/getAll")
.post(getAllByUser);




  /**
 * @swagger
 * /getPetTags:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Get pet tags
 *     description: Get the tags associated with a pet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *        200:
 *          description: Pet tags retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  images:
 *                    type: array
 *                    items:
 *                      type: string
 */

  router
  .route("/getPetImages")
  .post(

    getPetTags
  )


  /**
 * @swagger
 * /getSingleByUser:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Get a single pet by user
 *     description: Retrieve a single pet owned by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *        200:
 *          description: Pet retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *              
 */

  router
  .route("/getSinglePet")
  .post(

    getSingleByUser
  )


  /**
 * @swagger
 * /deletePet:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Delete a pet
 *     description: Delete a pet from the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *        200:
 *          description: Pet deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

  router
  .route("/deletePet")
  .post(

    deletePet
  )
 
 
  export default router;