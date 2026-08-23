import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrowserCard from "./BrowserCard";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "SkillProof",
    subtitle: "AI Resume Analysis & Verification Platform",
    url: "https://skillproof-frontend.onrender.com",
    description:
      "AI-powered resume analysis platform that extracts, validates, and scores skills from resumes. Detects fake or unverifiable skills using NLP, and provides detailed audit reports for candidates and recruiters.",
    tags: ["MERN Stack", "NLP", "Python", "REST APIs", "MongoDB"],
    image: "/skillproof.png",
    badge: "AI / Fullstack",
    badgeColor: "from-yellow-400 to-amber-500",
    link: "https://skillproof-frontend.onrender.com",
    github: "https://github.com/cchauhan7710",
    isLive: true,
  },
  {
    title: "CampusCart",
    subtitle: "Peer-to-Peer Student E-Commerce Marketplace",
    url: "https://campus-cart-interface.vercel.app/",
    description:
      "Full-stack peer-to-peer campus marketplace platform connecting students for buying and selling textbooks, electronics, and essentials with verified student accounts and dynamic search.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/campuscart.png",
    badge: "E-Commerce",
    badgeColor: "from-purple-500 to-pink-500",
    link: "https://campus-cart-interface.vercel.app/",
    github: "https://github.com/cchauhan7710/CampusCart",
    isLive: true,
  },
  {
    title: "Samadhan",
    subtitle: "AI-Driven IT Helpdesk & Ticketing Platform",
    url: "https://samadhan-helpdesk-7ztk.onrender.com",
    description:
      "AI-driven ticketing with intelligent auto-assignment, real-time notifications, and smart analytics — designed for high-performance teams.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI Ticketing"],
    image: "/samadhan.png",
    badge: "AI / Helpdesk",
    badgeColor: "from-blue-500 to-indigo-600",
    link: "https://samadhan-helpdesk-7ztk.onrender.com",
    github: "https://github.com/cchauhan7710",
    isLive: true,
  },
  {
    title: "Gricora",
    subtitle: "Elevated Everyday Curations & Wellness",
    url: "https://www.gricora.com/",
    description:
      "Premium skincare, haircare, and home care e-commerce platform featuring refined formulas, body wellness curations, and seamless checkout experience.",
    tags: ["React", "E-Commerce", "Tailwind CSS", "Node.js", "Payment Gateway"],
    image: "/gricora.png",
    badge: "E-Commerce / Wellness",
    badgeColor: "from-rose-500 to-pink-600",
    link: "https://www.gricora.com/",
    github: "https://github.com/cchauhan7710",
    isLive: true,
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("browser"); // "browser" | "grid"

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Background Lighting & Mesh Glow */}
      <div className="absolute bottom-0 left-[15%] w-[450px] h-[350px] rounded-full bg-[var(--accent)]/[var(--glow-opacity)] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] rounded-full bg-[var(--accent)]/[var(--glow-opacity)] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[var(--accent)] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-3 opacity-80"
          >
            — Featured Work —
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row items-baseline justify-center gap-2 sm:gap-3 select-none flex-wrap"
          >
            <span className="cursive-title text-[var(--accent)] opacity-90 text-5xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-[0_0_15px_var(--accent-glow)]">
              Crafted
            </span>
            <span className="text-4xl sm:text-5xl md:text-8xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_var(--accent-glow)]">
              Projects<span className="heading-dot">.</span>
            </span>
          </motion.div>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="p-1.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] flex items-center gap-1.5 shadow-xl">
            <button
              onClick={() => setViewMode("browser")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "browser"
                  ? "bg-[var(--accent)] text-black shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Interactive Browser View
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-[var(--accent)] text-black shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Website Cards Grid
            </button>
          </div>
        </div>

        {/* ── Main Content Section ── */}
        <AnimatePresence mode="wait">
          {viewMode === "browser" ? (
            /* Interactive Browser Showcase Component */
            <motion.div
              key="browser-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <BrowserCard
                projects={projects}
                currentIndex={currentIndex}
                onSelectProject={(idx) => setCurrentIndex(idx)}
                onPrev={prevSlide}
                onNext={nextSlide}
              />
            </motion.div>
          ) : (
            /* Browser Window Card Grid Component */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onSelect={() => {
                    setCurrentIndex(idx);
                    setViewMode("browser");
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GitHub Call to Action Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-16 space-y-4 relative z-10"
        >
          <p className="text-[var(--text-secondary)] opacity-70 text-sm font-medium">
            Explore complete open-source repositories and live deployments on GitHub
          </p>
          <motion.a
            href="https://github.com/cchauhan7710"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--accent-glow)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent)] text-black font-extrabold shadow-lg text-sm transition-all hover:brightness-110"
          >
            <span>View All Projects on GitHub</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
