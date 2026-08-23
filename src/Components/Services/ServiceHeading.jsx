import { motion } from "framer-motion";
import Service from "./Services";

const services = [0, 1, 2, 3, 4, 5];

function ServiceHeading() {
  return (
    <div id="services" className="bg-[var(--bg-primary)] min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden transition-colors duration-500">
      {/* Glow */}
      <div className="absolute top-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-yellow-500/[var(--glow-opacity)] blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400/60 text-sm tracking-[0.4em] uppercase font-medium mb-4"
        >
          — What I Offer —
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
           className="flex flex-row items-baseline justify-center gap-4 select-none"
        >
          <span className="cursive-title text-[var(--accent)] opacity-90 text-5xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-[0_0_15px_rgba(244,180,0,0.2)]">
            Services
          </span>
          <span className="text-3xl sm:text-5xl md:text-7xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_rgba(244,180,0,0.15)]">
            Offer<span className="heading-dot">.</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[var(--text-secondary)] text-base mt-4 max-w-xl mx-auto"
        >
          End-to-end MERN stack development — from database architecture to polished user interfaces.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full"
      >
        {services.map((i) => (
          <Service key={i} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

export default ServiceHeading;