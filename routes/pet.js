import express from "express";
import { addOnce,getAllByUser,getPetTags} from "../controllers/pet.js";

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

  router
  .route("/getPetImages")
  .post(

    getPetTags
  )
 
 
  export default router;