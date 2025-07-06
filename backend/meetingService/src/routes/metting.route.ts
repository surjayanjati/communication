import express from "express";
import {
  addPartcipents,
  createMeeting,
} from "../controller/metting.controller";
import { authVerify } from "../middleware/auth.middleware";
const router = express.Router();

///// Function for routes -----------------------------------------/
router.post("/meeting", authVerify, createMeeting);
///// Api route for adding new participents -----------------------/
router.patch("/meeting/participents", authVerify, addPartcipents);
export default router;
