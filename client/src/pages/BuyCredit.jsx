import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {motion} from "framer-motion"
function BuyCredit() {
  const { user } = useContext(AppContext);
  return (
    <motion.div
    
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}

    className="min-h-[80vh] flex flex-col items-center pt-14 mb-10">
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
            className="w-[15rem ] bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="text-3xl font-medium">
              ${plan.price} / <span className="text-sm"> {plan.credits}credits</span>
            </p>
            <button className="w-full bg-gray-800 p-2 text-white rounded-lg mt-4 text-sm min-w-50">
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuyCredit;
