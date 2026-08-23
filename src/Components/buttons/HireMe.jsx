import React from 'react';
import { motion } from 'framer-motion';

const HireMe = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      if (window.lenis) {
        window.lenis.scrollTo(contactEl, { duration: 1.2 });
      } else {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If lazy loaded component isn't mounted yet, scroll toward bottom
      const targetY = document.documentElement.scrollHeight - window.innerHeight;
      if (window.lenis) {
        window.lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          if (window.lenis) window.lenis.scrollTo(el);
          else el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  return (
    <motion.a
      href="#contact"
      onClick={scrollToContact}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-yellow-400 cursor-pointer whitespace-nowrap z-20 relative pointer-events-auto"
    >
      Hire Me
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </motion.a>
  );
};

export default HireMe;
