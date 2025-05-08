import { ModeToggle } from "@/components/mode-toggle";
import Description from "../components/Description";
import GenerateButton from "../components/GenerateButton";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div
    className="text-[#435c40]"
   
    >
 
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateButton />
    </div>
  );
};

export default Home;
