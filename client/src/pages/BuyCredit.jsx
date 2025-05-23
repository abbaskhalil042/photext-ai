import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../public/favicon.svg";

function BuyCredit() {
  const { user, backendUrl, loadCreditData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  console.log("key", import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID);

  // Initialize payment with Razorpay
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const data = await axios.post(
        `http://localhost:4000/api/user/payment-razorpay`,
        { planId },
        {
          headers: { token },
        }
      );

      // Log the backend response to debug the issue
      console.log(data); // This will show the structure of the response.

      if (data.data.success) {
        // Ensure the order object exists and contains the necessary fields
        const order = data.data;
        if (order && order.amount && order.orderId) {
          initPayment(order);
        } else {
          toast.error("Order data is incomplete.");
        }
      } else {
        toast.error("Failed to load payment order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const initPayment = async (order) => {
    console.log(order);
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount * 100, // Convert amount to paise if required (assuming it's in rupees)
      currency: "INR", // Hardcoding currency if it's not sent from backend
      name: "Credit Purchase",
      description: "Purchase credits",
      orderId: order.orderId, // Use orderId instead of id
      receipt: `receipt#${order.orderId}`,
      handler: async function (response) {
        try {
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.orderId, // 👈 Pass it explicitly
          };

          const data = await axios.post(
            `http://localhost:4000/api/user/verify-payment`,
            { ...verifyPayload },
            {
              headers: { token },
            }
          );
          if (data.data.success) {
            loadCreditData();
            navigate("/");
            toast.success("Credit added successfully!");
          } else {
            toast.error("Payment failed!");
          }
        } catch (error) {
          toast.error(error.message || "Something went wrong");
        }
      },
    };

    //* Open Razorpay
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    razorpay.on("payment.failed", function (response) {
      toast.error("Payment failed!");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] flex flex-col items-center lg:10 pt-32 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the Plans
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left sm:gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative w-[15rem] bg-gradient-to-br from-white/80 to-white shadow-md rounded-xl py-10 px-6 text-gray-700 hover:scale-105 hover:shadow-xl transition-all duration-500"
          >
            {/* Optional Badge */}
            {plan.tag && (
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                {plan.tag}
              </span>
            )}

            {/* Logo */}
            <img
              width={40}
              src={logo}
              alt={`${plan.id} logo`}
              className="mb-3"
            />

            {/* Plan Name */}
            <p className="text-lg font-bold text-gray-900">{plan.id}</p>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-1">{plan.desc}</p>

            {/* Pricing Info */}
            <p className="mt-4 text-3xl font-bold text-gray-900">
              ${plan.price}
              <span className="text-sm font-normal text-gray-500">
                {" "}
                / {plan.credits} credits
              </span>
            </p>

            {/* Quick Feature Highlights (optional) */}
            <ul className="mt-4 text-sm space-y-1">
              <li>✔️ Instant activation</li>
              <li>✔️ No hidden fees</li>
              <li>✔️ Secure payments</li>
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-colors p-2.5 text-white rounded-full mt-6 text-sm"
            >
              {user ? "Purchase" : "Get Started"}
            </button>

            {/* Subtle Note */}
            <p className="mt-2 text-xs text-gray-400 text-center">
              Cancel anytime. No questions asked.
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuyCredit;
