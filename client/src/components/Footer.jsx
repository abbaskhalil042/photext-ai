import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-10">
      <img src={assets.logo} alt="logo" className="w-8" />
      <p className=" flex-1 text-gray-500  border-l-2 border-gray-400 pl-4 text-sm max:sm:hidden">
        Copyright © 2023 | All rights reserved
      </p>

      <div className="flex items-center gap-4">
        <img src={assets.facebook_icon} className="w-8" alt="" />
        <img src={assets.twitter_icon} className="w-8" alt="" />
        <img src={assets.instagram_icon} className="w-8" alt="" />
      </div>
    </div>
  );
};

export default Footer;
