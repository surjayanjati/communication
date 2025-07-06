import express from "express";
import {
  getUsersData,
  loginUser,
  otpVerify,
  updateUser,
} from "../controller/authController";
import { authVerify } from "../middlewares/authService.middleware";
const router = express.Router();

router.post("/user", loginUser);
//// route for the otp verify --------------------/
router.post("/user/verify", otpVerify);
//// route for the otp update user ---------------/
router.patch("/user", authVerify, updateUser);
//// route for getting the user ------------------/
router.get("/user", getUsersData);
export default router;
