import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-10">
      <svg
        width="60"
        height="60"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6E45E2" />
            <stop offset="100%" stop-color="#89D4CF" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="70" fill="url(#gradient)" />

        <circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-dasharray="5,5"
        />

        <path
          d="M100,60 L120,100 L100,140 L80,100 Z"
          fill="white"
          opacity="0.8"
        />
        <path
          d="M60,100 L100,120 L140,100 L100,80 Z"
          fill="white"
          opacity="0.6"
        />

        {/* <text
            x="100"
            y="180"
            text-anchor="middle"
            font-family="Arial"
            font-size="54"
            fill="#333"
          >
            PHOTEXT
          </text> */}
      </svg>
      <p className=" flex-1 text-gray-500  border-l-2 border-gray-400 pl-4 text-sm max:sm:hidden">
        Copyright © 2024 | All rights reserved
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
