import { assets, testimonialsData } from "../assets/assets";
import {motion} from "framer-motion"
const Testimonials = () => {
  return (
    <motion.div 
    
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center my-20  py-12 rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="text-lg text-gray-500 mb-12">
        What our customers have to say
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            className="flex flex-col items-center gap-6 p-8 bg-white/20 shadow-md border cursor-pointer hover:scale-105 transform transition-all duration-300 rounded-lg"
            key={index}
          >
            <img src={testimonial.image} className="w-16 rounded-full" alt="" />

            <h2 className="text-xl font-medium">{testimonial.name}</h2>
            <p className="text-gray-700">{testimonial.role}</p>
            <div className="flex mb-4">
              {Array(testimonial.stars)
                .fill("")
                .map((_, index) => (
                  <img
                    src={assets.star_icon}
                    className="w-6"
                    key={index}
                    alt=""
                  />
                ))}
            </div>
            <p className="text-gray-700">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
