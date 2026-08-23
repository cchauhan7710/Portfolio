import { motion } from "framer-motion";

function AboutHeading() {
  return (
    <div id="about" className="bg-[var(--bg-primary)] flex items-center justify-center px-4 sm:px-6 py-20 md:py-0 md:min-h-screen relative overflow-hidden transition-colors duration-500">


      <div className="text-center flex flex-col items-center gap-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--accent)] opacity-40 text-[10px] tracking-[0.5em] uppercase font-medium mb-2"
          >
            — Who I Am —
          </motion.div>

        <div className="relative flex flex-row items-baseline gap-4 select-none">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="cursive-title text-[var(--accent)] opacity-90 text-5xl sm:text-8xl md:text-[9rem] tracking-tight drop-shadow-[0_0_15px_rgba(244,180,0,0.2)]"
          >
            About
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_rgba(244,180,0,0.15)]"
          >
            Me<span className="heading-dot">.</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutHeading;
