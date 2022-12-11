import express from "express";
import { addOnce,getMyNotifications} from "../controllers/notification.js";

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
  export default router;