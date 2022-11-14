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

router.use(auth)
  .route("/edit")
  .put(
  
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email"),
    body("profilePic"),
    putOnce
  );

 

  

export default router;