import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [hoverShown, setHoverShown] = useState(false);
  const handleHover = () => {
    setHoverShown(!hoverShown);
    setTimeout(() => {
      setHoverShown(false);
    }, 2000);
  };

  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  console.log(user?.name);
  console.log(credit);

  const navigateTo = useNavigate();
  // const {setShowLogin} = useContext(AppContext);

  return (
    <div className="flex justify-between items-center py-4 ">
      <Link className="flex items-center gap-2 animate-bounce" to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-8 " />
        <span className="text-2xl sm:text-3xl font-semibold">Photext</span>
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigateTo("/buy-credit")}
              className="bg-blue-100 text-white px-4  flex items-center gap-2 sm:px-6 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-transform"
            >
              <img src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                credit left :{credit}
              </p>
            </button>
            <p className="text-xs sm:text-sm mx-sm:hidden pl-4">
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
