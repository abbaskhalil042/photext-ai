import express from "express";
import {
  register,
  login,
  userCredits,
  paymentRazorpay,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/credits", userAuth, userCredits);
router.post("/payment-razorpay", userAuth, paymentRazorpay);

export default router;
