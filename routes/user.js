import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";
import auth from '../middlewares/auth.js'
import { signin, signup, putOnce } from "../controllers/user.js";

const router = express.Router();

router
  .route("/signup")
  .post(
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email"),
    signup
  );

router.route("/signin").post(signin);

router
  .route("/:id")
  .put(
  
    body("username").isLength({ min: 5 }),
    body("username").isLength({ min: 5 }),
    body("email"),
    putOnce
  );

  

export default router;