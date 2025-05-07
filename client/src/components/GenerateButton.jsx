import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
const GenerateButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 py-6 lg:text-4xl">
        See the magic. Try Now
      </h1>
      <Link to="/result">
        <button className=" inline-flex items-center gap-2 px-12 py-3  bg-black hover:bg-blue-700 text-white font-bold rounded-full hover:scale-105 transition-transform">
          Generate Images{" "}
          <img src={assets.star_group} alt=" star " className="h-7" />
        </button>
      </Link>
    </motion.div>
  );
};

export default GenerateButton;
