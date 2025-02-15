import express from "express";
import {
  register,
  login,
  userCredits,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/credits", userAuth, userCredits);

export default router;
