import express from "express";
import {
  register,
  login,
  userCredits,
  paymentRazorpay,
  verifyPayment,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/credits", userAuth, userCredits);
router.post("/payment-razorpay", userAuth, paymentRazorpay);
router.post("/verify-payment", userAuth, verifyPayment);

export default router;
