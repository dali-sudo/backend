import express from "express";
import { body } from "express-validator";
import { addOnce,getAll,addLike,RemoveLike} from "../controllers/post.js";

const router = express.Router();

router
  .route("/addPost")
  .post(
 
    addOnce
  );
  router
  .route("/getAll")
  .post(
 
    getAll
  );
  router
  .route("/like")
  .post(
    
 addLike
  
  );
  router
  .route("/unlike")
  .post(
    
 
  RemoveLike
  );
  export default router;