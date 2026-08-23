import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const techStack = [
  { icon: "/mongodb.svg",    name: "MongoDB",    color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
  { icon: "/express.svg",    name: "Express.js", color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
  { icon: "/react.svg",      name: "React.js",   color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
  { icon: "/node-js.svg",    name: "Node.js",    color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
  { icon: "/tailwindcss.svg",name: "Tailwind",   color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
  { icon: "/js.svg",         name: "JavaScript", color: "from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30" },
];

function About() {
  return (
    <motion.div
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 min-h-screen w-full items-center bg-[var(--bg-primary)] px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden transition-colors duration-500"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-yellow-500/[var(--glow-opacity)] blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[250px] h-[250px] rounded-full bg-orange-400/[var(--glow-opacity)] blur-[80px]" />
      </div>

      {/* Left: Avatar */}
      <motion.div variants={fadeInUp} className="flex items-center justify-center">
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-full p-1.5 bg-gradient-to-br from-[var(--accent)]/30 to-[var(--bg-primary)] border border-[var(--accent)]/20"
          >
            <img
              src="/Rahul.jpeg"
              alt="Rahul"
              loading="lazy"
              decoding="async"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover object-top shadow-[0_0_40px_var(--accent-glow)] ring-1 ring-[var(--accent)]/50 bg-[var(--bg-secondary)]"
            />
          </motion.div>

        </div>
      </motion.div>

      {/* Right: Content */}
      <motion.div variants={staggerContainer} className="md:col-span-2 space-y-5 flex flex-col">
        <motion.h1
          variants={fadeInUp}
          className="cursive-title text-[var(--text-primary)] text-4xl sm:text-6xl md:text-8xl tracking-wide drop-shadow-[0_0_12px_rgba(250,204,21,0.2)] leading-none font-heading"
        >
          Hi, I'm{" "}
          <span className="text-[var(--accent)] drop-shadow-[0_0_15px_rgba(250,204,21,0.35)]">Rahul</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
          A passionate <span className="text-[var(--accent)] font-semibold">MERN Fullstack Developer & Web Designer</span> who builds scalable, performant web applications from database to UI — turning ideas into real digital products.
        </motion.p>

        <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] opacity-80 text-base sm:text-lg leading-relaxed">
          Proficient in <span className="text-[var(--accent)] font-medium">MongoDB</span>, <span className="text-[var(--accent)] font-medium">Express.js</span>, <span className="text-[var(--accent)] font-medium">React.js</span>, and <span className="text-[var(--accent)] font-medium">Node.js</span>. I craft clean REST APIs, responsive UIs, and efficient server-side logic that brings products to life.
        </motion.p>

        {/* Tech Stack Cards */}
        <motion.div variants={fadeInUp} className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl bg-gradient-to-b ${tech.color} border backdrop-blur-sm cursor-default transition-all duration-300 hover:scale-105`}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                decoding="async"
                className="w-7 h-7 object-contain"
              />
              <span className="text-[10px] text-[var(--text-secondary)] font-medium text-center leading-tight">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-start gap-4 rounded-2xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] p-5"
        >
          <span className="text-2xl flex-shrink-0">💡</span>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            I'm deeply committed to writing clean, maintainable code and building products that deliver real value — from concept and architecture to deployment and optimization.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
