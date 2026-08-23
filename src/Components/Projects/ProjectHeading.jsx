import React from "react";

function ProjectHeading() {
  return (
    <div id="projects" className="bg-[var(--bg-primary)] text-[var(--accent)] flex p-6 sm:p-8 py-20 md:py-0 md:min-h-screen justify-center items-center transition-colors duration-500 overflow-hidden">
      <div className="flex flex-row items-baseline gap-4 select-none">
        <h1 className="cursive-title text-[var(--accent)] opacity-90 text-5xl sm:text-8xl md:text-[9rem] tracking-tight drop-shadow-[0_0_15px_rgba(244,180,0,0.2)]">
          Project
        </h1>
     
        <div className="text-3xl sm:text-6xl md:text-8xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_rgba(244,180,0,0.15)] h-fit">
          Highlights<span className="heading-dot">.</span>
        </div>
      </div>
      {/* <div className="border-2 border-dashed border-black h-96 w-full border-dash-large"></div> */}
      <div>

      </div>
    </div>
  );
}

export default ProjectHeading;
