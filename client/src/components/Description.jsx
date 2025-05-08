import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { HeaderCarousel } from "./HeaderCarousel";
const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 md:px-28 rounded-lg"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold">Create AI images</h1>
      <p className="text-lg text-gray-500">Turn your imagination into visual</p>

      <div className="flex flex-col mt-10 gap-5 md:gap-14 md:flex-row items-center">
        <HeaderCarousel />
        <div>
          <h2 className="text-3xl font-medium mb-4 max-w-lg">
            Introducing the AI-Powered texst to Image Generator.
          </h2>
          <p className="text-gray-700 mb-4">
            Easiy bring your ideas to life with our free I image generator
            whether you need stunning visuals or unique imagesry, our tools
            transfrom your text into eye-catdhing images with just a few clicks.
            <p className="text-gray-700 mb-4">
              Simply type in a text prompt and our cutting AI will create a
              stunning image
            </p>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
