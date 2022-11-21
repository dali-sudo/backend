import express from "express";
import { addOnce,getAllByUser} from "../controllers/pet.js";

const router = express.Router();

router
  .route("/addPet")
  .post(
 
    addOnce
  );
  
  router
  .route("/getAll")
  .post(
 
    getAllByUser
  );
 
 
  export default router;