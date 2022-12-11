import express from "express";
import { addOnce,sendMessage,getChatRoom,getMyChatRooms,get} from "../controllers/chatroom.js";

const router = express.Router();
router
  .route("/findorcreate")
  .post(
    get

   
  );
router
  .route("/add")
  .post(
    addOnce
  );
  router
  .route("/send")
  .post(
    sendMessage
  );
  router
  .route("/get")
  .post(
    getChatRoom
  );
  router
  .route("/getmy")
  .post(
    getMyChatRooms
  );

  export default router;