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
      className="flex flex-col justify-between items-center text-center my-0"
    >
      <div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 p-1 
    rounded-full border border-neutral-500"
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </div>
      <h1 className="text-4xl max-w-[300px] sm:text-5xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text to <span className="text-blue-500">image</span>, in seconds.
      </h1>
      <HeaderCarousel />
 
      <div className="flex gap-2 mt-10">
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

      <Link to="/result">
        <button className="bg-black flex items-center text-white px-10 py-2 rounded-full mt-10 hover:scale-105 transition-transform">
          Get Started <img src={assets.star_group} alt="" className="w-8 h-6" />
        </button>
      </Link>



      <p className="mt-2 text-neutral-500 bg-white px-6 p-1 rounded-full border border-neutral-500">
        Generated Images from <span className="text-blue-500">photext-ai</span>
      </p>
    </motion.div>
  );
};

export default Header;
