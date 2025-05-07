import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);
console.log("Razorpay Currency:", process.env.JWT_SECRET);

import razorpay from "razorpay";
import Transaction from "../models/transaction-model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userData = {
      username,
      email,
      password: passwordHash,
    };

    const newUser = new User(userData);

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//* Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//*userCredits

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//* Razorpay

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  console.log(
    "Payment Razorpay called",
    process.env.RAZORPAY_KEY_ID,
    process.env.RAZORPAY_KEY_SECRET
  );
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        credits = 100;
        plan = "Basic";
        amount = 10;
        date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        break;
      case "Advanced":
        credits = 500;
        plan = "Advanced";
        amount = 50;
        date = new Date(Date.now() + 60 * 24 * 60 * 1000); // 60 days from now
        break;
      case "Business":
        credits = 5000;
        plan = "Business";
        amount = 250;
        date = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid plan ID",
        });
    }

    const transactionDetails = {
      userId: userId,
      plan: plan,
      credits: credits,
      amount: amount,
      date: date,
    };

    const newTransaction = await Transaction.create(transactionDetails);
    console.log(newTransaction);

    await razorpayInstance.orders.create(
      {
        amount: amount * 100, // Amount in INR
        currency: process.env.CURRENCY,
        receipt: newTransaction._id.toString(), // Receipt ID unique to the transaction
        notes: {
          userId: userId,
          planId: planId,
        },
      },
      (err, order) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "Error creating Razorpay order",
          });
        }

        res.status(200).json({
          success: true,
          orderId: order.id,
          amount: amount,
          credits: credits,
          plan: plan,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//*verify razorpay payment

const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    console.log("333333333333333333333333333333333333333333333333333333333Razorpay Order ID:", orderId);

    const orderInfo = await razorpayInstance.orders.fetch(orderId);

    if (orderInfo.status !== "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);

      if (transactionData.payment) {
        return res
          .status(400)
          .json({ success: false, message: "Payment failed" });
      }

      const userData = await User.findById(transactionData.userId);
      userData.creditBalance += transactionData.credits;
      await User.findByIdAndUpdate(userData._id, {
        creditBalance: userData.creditBalance,
      });

      await Transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Payment successful" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { register, login, userCredits, paymentRazorpay, verifyPayment };
