import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [hoverShown, setHoverShown] = useState(false);
  const [showCreditText, setShowCreditText] = useState(false);
  const handleHover = () => {
    setHoverShown(!hoverShown);
    setTimeout(() => {
      setHoverShown(false);
    }, 2000);
  };

  const handleShowCreditText = () => {
    setShowCreditText(!showCreditText);
    setTimeout(() => {
      setShowCreditText(false);
    }, 2000);
  };
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  console.log(user?.name);
  console.log(credit);

  const navigateTo = useNavigate();
  // const {setShowLogin} = useContext(AppContext);

  return (
    <div className="flex justify-between items-center py-4 fixed top-0 left-0 right-0 z-10  px-4 sm:px-10 lg:px-20 ">
      <Link className="flex items-center gap-2 animate-bounce" to="/">
        <svg
          width="60"
          height="60"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6E45E2" />
              <stop offset="100%" stop-color="#89D4CF" />
            </linearGradient>
          </defs>

          <circle cx="100" cy="100" r="70" fill="url(#gradient)" />

          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-dasharray="5,5"
          />

          <path
            d="M100,60 L120,100 L100,140 L80,100 Z"
            fill="white"
            opacity="0.8"
          />
          <path
            d="M60,100 L100,120 L140,100 L100,80 Z"
            fill="white"
            opacity="0.6"
          />

          {/* <text
            x="100"
            y="180"
            text-anchor="middle"
            font-family="Arial"
            font-size="54"
            fill="#333"
          >
            PHOTEXT
          </text> */}
        </svg>

        {/* <svg
          width="50"
          height="50"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70,30 L130,30 Q150,50 130,70 L70,70 Q50,50 70,30 Z"
            fill="#4A4A4A"
          />

          <path
            d="M100,70 Q110,90 100,110 Q90,130 100,150"
            stroke="#6E45E2"
            stroke-width="8"
            fill="none"
          />
          <circle cx="100" cy="70" r="5" fill="#89D4CF" />
          <circle cx="100" cy="110" r="5" fill="#89D4CF" />
          <circle cx="100" cy="150" r="5" fill="#89D4CF" />

          <path
            d="M120,160 Q140,150 160,160 Q150,180 130,170 Z"
            fill="#6E45E2"
            opacity="0.7"
          />
          <path
            d="M140,140 Q160,130 170,150 Q160,160 150,150 Z"
            fill="#89D4CF"
            opacity="0.7"
          />

          <text
            x="100"
            y="190"
            text-anchor="middle"
            font-family="Arial"
            font-size="18"
            fill="#333"
          >
            AI IMAGE GENERATOR
          </text>
        </svg> */}
        {/* <span className="lg:text-2xl text-xl font-semibold">Photext</span> */}
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onMouseEnter={handleShowCreditText}
              onClick={() => navigateTo("/buy-credit")}
              className="bg-black  text-white px-4  flex items-center gap-2 sm:px-6 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-transform"
            >
              <img src={assets.credit_star} alt="" />
              <p
                className={`text-xs hidden lg:flex font-medium text-white ${
                  showCreditText ? "flex" : ""
                } `}
              >
                credit left :{credit}
              </p>
            </button>
            <p className={`text-xs sm:text-sm mx-sm:hidden pl-4 `}>
              Hi,{user?.name}
            </p>
            <div className="relative group">
              <img
                onMouseEnter={handleHover}
                src={assets.profile_icon}
                alt=""
                className="w-10 drop-shadow-md cursor-pointer"
              />
              <div
                className={`absolute top-12  ${
                  hoverShown ? "block" : "hidden"
                } right-0 z-10 text-sm border bg-white p-1 rounded-md shadow-lg`}
              >
                <ul className="list-none m-0 px-5 bg-white rounded-md border text-sm">
                  <li onClick={logout} className="py-1 px-2 cursor-pointer">
                    logout
                  </li>
                </ul>
              </div>
            </div>
            <ModeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <p
              className="cursor-pointer"
              onClick={() => navigateTo("/buy-credit")}
            >
              Pricing
            </p>
            <button
              onClick={() => {
                console.log("clicked");
                setShowLogin(true);
              }}
              className="bg-zinc-800 text-white px-4 py-2 rounded-xl"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
