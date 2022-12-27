import express from "express";
import { addOnce,getAllByUser,getPetTags,getSingleByUser, deletePet} from "../controllers/pet.js";

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

  router
  .route("/getSinglePet")
  .post(

    getSingleByUser
  )

  router
  .route("/deletePet")
  .post(

    deletePet
  )
 
 
  export default router;