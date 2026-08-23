import { motion } from "framer-motion";

const services = [
  {
    icon: null, emoji: "🌐",
    title: "Fullstack Web Apps",
    desc: "End-to-end MERN stack applications — from MongoDB database design to polished React UIs.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
  {
    icon: "/react.svg",
    title: "React Frontend",
    desc: "Pixel-perfect, responsive React interfaces with smooth animations and optimized state management.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
  {
    icon: "/node-js.svg",
    title: "Node.js Backend",
    desc: "Scalable REST APIs and server-side logic built with Express.js, JWT auth, and best practices.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
  {
    icon: "/mongodb.svg",
    title: "MongoDB Database",
    desc: "Efficient schema design, Mongoose models, indexing, and aggregation pipelines for performance.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
  {
    icon: "/express.svg",
    title: "API Integration",
    desc: "Seamless third-party API integrations — payment gateways, cloud storage, OAuth, and more.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
  {
    // Multiple icons for Deployment card
    icons: [
      { src: "/vercel.svg",  alt: "Vercel",  bg: "bg-white",           label: "Vercel"  },
      { src: "/render.svg",  alt: "Render",  bg: "bg-slate-700/40",    label: "Render"  },
      { src: "/git.svg",     alt: "Git",     bg: "bg-yellow-400/10",   label: "Git"     },
    ],
    title: "Deployment & DevOps",
    desc: "App deployment on Vercel, Render, and Railway — CI/CD pipelines and environment configuration.",
    gradient: "from-[var(--accent)]/15 to-transparent",
    border: "border-[var(--accent)]/20",
    glow: "hover:shadow-[0_0_25px_var(--accent-glow)]",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Service = ({ index = 0 }) => {
  const s = services[index % services.length];
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br ${s.gradient} border ${s.border} backdrop-blur-sm ${s.glow} transition-all duration-300 cursor-default w-full min-h-[200px]`}
    >
      {/* Multiple icons (e.g. Deployment card) */}
      {s.icons ? (
        <div className="flex items-center gap-2">
          {s.icons.map((ic, i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-9 h-9 rounded-lg ${ic.bg} p-1.5`}
              title={ic.label}
            >
              <img
                src={ic.src}
                alt={ic.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      ) : s.icon ? (
        <img src={s.icon} alt={s.title} loading="lazy" decoding="async" className="w-10 h-10 object-contain" />
      ) : (
        <div className="text-4xl">{s.emoji}</div>
      )}

      <h3 className="text-[var(--text-primary)] font-bold text-base leading-snug">{s.title}</h3>
      <p className="text-[var(--text-secondary)] opacity-80 text-xs leading-relaxed">{s.desc}</p>
    </motion.div>
  );
};

export default Service;
