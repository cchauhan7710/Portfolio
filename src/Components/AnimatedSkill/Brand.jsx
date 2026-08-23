import { motion } from "framer-motion";

function Brand() {
  const techIcons = [
    { name: "MongoDB",    icon: "/mongodb.svg",     bg: "from-[var(--accent)]/30 to-transparent",  border: "border-[var(--accent)]/20",  glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "Express",    icon: "/express.svg",      bg: "from-[var(--accent)]/30 to-transparent",    border: "border-[var(--accent)]/20",   glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "React",      icon: "/react.svg",        bg: "from-[var(--accent)]/30 to-transparent",    border: "border-[var(--accent)]/20",   glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "Node.js",    icon: "/node-js.svg",      bg: "from-[var(--accent)]/30 to-transparent",  border: "border-[var(--accent)]/20",  glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "JavaScript", icon: "/js.svg",           bg: "from-[var(--accent)]/30 to-transparent",border: "border-[var(--accent)]/20", glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "Git",        icon: "/git.svg",          bg: "from-[var(--accent)]/30 to-transparent",border: "border-[var(--accent)]/20", glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "Tailwind",   icon: "/tailwindcss.svg",  bg: "from-[var(--accent)]/30 to-transparent",      border: "border-[var(--accent)]/20",    glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
    { name: "Postman",    icon: null, emoji: "🔥",   bg: "from-[var(--accent)]/30 to-transparent",   border: "border-[var(--accent)]/20", glow: "hover:shadow-[0_0_20px_var(--accent-glow)]" },
  ];

  return (
    <div className="bg-[var(--bg-primary)] py-16 sm:py-20 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Glow */}
      <div className="absolute top-[30%] left-[30%] w-[400px] h-[300px] rounded-full bg-yellow-400/4 blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400/60 text-sm tracking-[0.4em] uppercase font-medium mb-4"
        >
          — Tech I Work With —
        </motion.div>

        <div className="flex flex-row items-baseline justify-center gap-4 select-none">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="cursive-title text-[var(--accent)] opacity-80 text-5xl sm:text-7xl md:text-9xl leading-none"
          >
            My
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl text-[var(--accent)] font-bold font-heading tracking-tighter"
          >
            Stack<span className="heading-dot">.</span>
          </motion.div>
        </div>
      </div>

      {/* Tech Icons Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 relative z-10"
      >
        {techIcons.map((tech, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.5, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring" } } }}
            whileHover={{ scale: 1.15, y: -6 }}
            className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-gradient-to-b ${tech.bg} border ${tech.border} ${tech.glow} transition-all duration-300 cursor-default`}
          >
            {tech.icon ? (
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            ) : (
              <span className="text-2xl sm:text-3xl">{tech.emoji}</span>
            )}
            <span className="text-[var(--text-secondary)] opacity-70 text-[9px] sm:text-[10px] font-medium tracking-wide text-center leading-tight">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}

export default Brand;
