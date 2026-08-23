import React from 'react';
import { motion } from 'framer-motion';

const HireMe = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo("#contact");
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.button
      onClick={scrollToContact}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-yellow-400 cursor-pointer whitespace-nowrap"
    >
      Hire Me
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </motion.button>
  );
};

export default HireMe;
