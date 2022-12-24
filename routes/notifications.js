import express from "express";
import { addOnce,getMyNotifications,getMyNotifications2} from "../controllers/notification.js";

const router = express.Router();
router
  .route("/add")
  .post(
    addOnce
  );
  router
  .route("/get")
  .post(
    getMyNotifications
  );
  router
  .route("/getall")
  .post(
    getMyNotifications2
  );
  export default router;