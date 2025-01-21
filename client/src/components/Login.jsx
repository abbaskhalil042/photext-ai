import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [login, setLogin] = useState(false);
  const { setShowLogin } = useContext(AppContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-filter backdrop-blur-sm bg-opacity-50 bg-black/30 flex justify-center items-center">
      <form
        className={`relative bg-white p-10 rounded-xl shadow-lg text-slate-500 `}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {login ? "Login" : " Sign Up"}
        </h1>
        <p className="text-sm">
          Welcome back! Please {login ? "Login" : " Sign Up"} to continue
        </p>
        {login ? (
          ""
        ) : (
          <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
            <img src={assets.user_icon} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm "
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            required
            className="outline-none text-sm "
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm "
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
          Create Account
        </button>
        <p className="mt-5 text-center">
          {login ? "Don't have an Account?" : "Already have an Account?"}

          <span
            onClick={() => {
              setLogin(!login);
            }}
            className="text-blue-600 cursor-pointer"
          >
            {login ? "Sign Up" : "Login"}
          </span>
        </p>

        <img
          onClick={() => {
            setShowLogin(false);
          }}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
