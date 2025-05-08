import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { HeaderCarousel } from "./HeaderCarousel";
const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-between py-32 "
    >
      <div className="flex gap-2 items-center justify-evenly max-sm:flex-col">
        <div className="flex flex-col gap-2 max-sm:gap-4">
          <div className="flex    gap-2">
            <h1 className="text-4xl max-w-[300px] sm:text-5xl sm:max-w-[590px] mx-auto mt-10 ">
              <span className=" text-blue-900 font-bold font-serif italic">
                Photext-AI
              </span>{" "}
              Turn text to <span className="text-blue-900">image</span>, in
              seconds.
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 items-start sm:items-center">
            {/* Info Badge */}
            <div className="text-stone-500 flex items-center gap-2 bg-white px-8 py-3 rounded-full border border-neutral-200 shadow-md">
              <p className="text-lg font-semibold whitespace-nowrap">
                Best text to image generator
              </p>
              <img src={assets.star_icon} alt="star icon" className="w-6 h-6" />
            </div>

            {/* Button */}
            <Link to="/result">
              <button className="bg-black flex items-center text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all ease-in-out duration-300 hover:scale-105 shadow-lg whitespace-nowrap">
                Get Started
                <img
                  src={assets.star_group}
                  alt="star group"
                  className="w-8 h-6 ml-2"
                />
              </button>
            </Link>
          </div>
        </div>

        <div>
          <HeaderCarousel />
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <img
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              width={130}
              key={index}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              // className="w-6 h-6"
            />
          ))}
      </div>
      <p className="text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with our advanced text to image generator. Turn
        your imagination into visual art in seconds - just type in your text and
        watch the magic unfold.
      </p>

      <p className="mx-auto mt-2 text-neutral-500 bg-white px-6 p-1 rounded-full border border-neutral-500">
        Generated Images from <span className="text-blue-500">photext-ai</span>
      </p>
    </motion.div>
  );
};

export default Header;
