import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("login"); // 'login' or 'signup'
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = state === "login" ? "/api/user/login" : "/api/user/register";
      const payload =
        state === "login"
          ? { username, password }
          : { username, email, password };

      const { data } = await axios.post(`${backendUrl}${url}`, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-filter backdrop-blur-sm bg-opacity-50 bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl shadow-lg text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center">
          {state === "login"
            ? "Welcome back! Please Login to continue"
            : "Create an account to get started"}
        </p>

        {/* Username (Shown in both login & signup) */}
        <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
          <img src={assets.user_icon} alt="" />
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            value={username}
            required
            className="outline-none text-sm"
          />
        </div>

        {/* Email (Only in Signup) */}
        {state === "signup" && (
          <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
            <img src={assets.email_icon} alt="" />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="outline-none text-sm"
            />
          </div>
        )}

        {/* Password (Shown in both login & signup) */}
        <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="outline-none text-sm"
          />
        </div>

        {state === "login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot Password?
          </p>
        )}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="mt-5 text-center">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={() => setState(state === "login" ? "signup" : "login")}
            className="text-blue-600 cursor-pointer"
          >
            {state === "login" ? " Sign Up" : " Login"}
          </span>
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
