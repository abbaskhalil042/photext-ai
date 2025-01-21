import { useState } from "react";
import { assets } from "../assets/assets";

const Result = () => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const onSubmit = (e) => {

  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center min-h-[90vh] ">
      <div>
        <div className="relative">
          <img src={assets.sample_img_1} alt="" className="w-full rounded" />
          <span
            className={`absolute buttom-0 left-o h-1 bg-blue-500 ${
              loading ? " w-full transition-all duration-[10s]" : "w-0"
            }`}
          ></span>
        </div>

        <p className={!loading ? "hidden" : ""}>Loading...</p>
      </div>

      {!imageLoaded && (
        <div className="flex items-center mt-8 text-white w-full max-w-xl bg-neutral-500 rounded-full text-sm p-0.5 ">
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
        <div className="flex gap-2 flex-wrap justify-center text-white text-smp-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setImageLoaded(false);
              setLoading(true);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-transform duration-75"
          >
            Generate another
          </p>
          <a
            download
            href=""
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:scale-105 transition-transform duration-75"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
