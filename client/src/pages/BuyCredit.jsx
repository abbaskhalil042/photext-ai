import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
      className="min-h-[80vh] flex flex-col items-center pt-14 mb-10"
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
            className="w-[15rem] bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="text-3xl font-medium">
              ${plan.price} /{" "}
              <span className="text-sm"> {plan.credits} credits</span>
            </p>
            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="w-full bg-gray-800 p-2 text-white rounded-lg mt-4 text-sm min-w-50"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuyCredit;
