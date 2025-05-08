import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
const Result = () => {
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Generating image for prompt:", input);

    if (!input.trim()) {
      alert("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const generatedImage = await generateImage(input);
      console.log("Generated Image URL:", generatedImage);

      if (generatedImage) {
        setImage(generatedImage);
        setImageLoaded(true);
        setInput("");
      } else {
        console.error("No image received from API.");
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmit}
      className="flex flex-col items-center min-h-[85vh]"
    >
      <div className="relative w-[20rem] h-[20rem] mt-[8rem] flex items-center justify-center bg-gray-300 rounded">
        {image ? (
          <img
            src={image}
            alt="Generated"
            className="w-[25rem] h-[20rem]  object-cover rounded"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.error("Failed to load image.");
              setImage(null);
              setImageLoaded(false);
            }}
          />
        ) : (
          <p className="text-gray-600">Please Enter the prompt</p>
        )}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
            loading ? "w-full transition-all duration-[10s] ease-linear" : "w-0"
          }`}
        ></span>
      </div>

      {loading && <p>Loading...</p>}

      {!imageLoaded && (
        <div className="flex items-center mt-8 text-white w-full max-w-xl bg-neutral-500 rounded-full text-sm p-0.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Describe what you want to generate?"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {imageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setImage(null);
              setImageLoaded(false);
              setLoading(false);
              setInput("");
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-transform duration-75"
          >
            Generate another
          </p>
          <a
            download="generated-image.png"
            href={image}
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:scale-105 transition-transform duration-75"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
