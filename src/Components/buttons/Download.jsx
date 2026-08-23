import React from "react";
import Star from "./Star";

function Download() {
  return (
    <a
      href="https://flowcv.com/resume/ksqfo0arug11"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <button
        className="
          group relative cursor-pointer rounded-full border-2 border-yellow-400 bg-white
          py-3 px-8 text-[15px] font-bold text-[#181818]
          shadow-[0_0_0_#F4B400] transition-all duration-300 ease-in-out whitespace-nowrap
          hover:bg-transparent hover:text-yellow-400 hover:shadow-[0_0_25px_#F4B400]
        "
      >
        Resume

        {/* ✨ Animated Stars (Yellow Glow) */}
        <Star
          className="
            absolute top-[20%] left-[20%] z-[-5] h-auto w-[25px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-1000 
            ease-[cubic-bezier(0.05,0.83,0.43,0.96)] 
            group-hover:top-[-80%] group-hover:left-[-30%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
        <Star
          className="
            absolute top-[45%] left-[45%] z-[-5] h-auto w-[15px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-1000 
            ease-[cubic-bezier(0,0.4,0,1.01)]
            group-hover:top-[-25%] group-hover:left-[10%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
        <Star
          className="
            absolute top-[40%] left-[40%] z-[-5] h-auto w-[5px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-1000 
            ease-[cubic-bezier(0,0.4,0,1.01)]
            group-hover:top-[55%] group-hover:left-[25%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
        <Star
          className="
            absolute top-[20%] left-[40%] z-[-5] h-auto w-[8px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-700 
            ease-[cubic-bezier(0,0.4,0,1.01)]
            group-hover:top-[30%] group-hover:left-[80%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
        <Star
          className="
            absolute top-[25%] left-[45%] z-[-5] h-auto w-[15px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-500 
            ease-[cubic-bezier(0,0.4,0,1.01)]
            group-hover:top-[25%] group-hover:left-[115%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
        <Star
          className="
            absolute top-[5%] left-[50%] z-[-5] h-auto w-[5px]
            drop-shadow-[0_0_0_#F4B400] transition-all duration-700 ease-in-out
            group-hover:top-[5%] group-hover:left-[60%] group-hover:z-[2] 
            group-hover:drop-shadow-[0_0_10px_#F4B400]
          "
        />
      </button>
    </a>
  );
}

export default Download;

