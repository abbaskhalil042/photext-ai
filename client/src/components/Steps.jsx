import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        How it works ?
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Transform words into stunning images.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stepsData.map((step, index) => (
          <div
            className="flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-105 transform transition-all duration-300 rounded-lg"
            key={index}
          >
            <img src={step.icon} className="w-10" alt="" />
            <div>
              <h2 className="text-xl font-medium">{step.title}</h2>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
