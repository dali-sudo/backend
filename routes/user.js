import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";
import auth from '../middlewares/auth.js'
import { signin, signup, putOnce ,Find,getUser,Follow,UnFollow} from "../controllers/user.js";

const router = express.Router();
router
  .route("/find")
  .post(
    Find
  );
  router
  .route("/follow")
  .post(
    Follow
  );
  router
  .route("/unfollow")
  .post(
    UnFollow
  );
  router
  .route("/getUser")
  .post(
    getUser
  );

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