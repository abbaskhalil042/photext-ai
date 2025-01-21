import { assets } from "../assets/assets";

const GenerateButton = () => {
  return (
    <div className="pb-16 text-center">
      <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 py-6 lg:text-4xl">
        See the magic. Try Now
      </h1>
      <button className=" inline-flex items-center gap-2 px-12 py-3  bg-black hover:bg-blue-700 text-white font-bold rounded-full hover:scale-105 transition-transform">
        Generate Images{" "}
        <img src={assets.star_group} alt=" star " className="h-7" />
      </button>
    </div>
  );
};

export default GenerateButton;
