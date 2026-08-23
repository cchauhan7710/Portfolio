import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Download from "../buttons/download";
import HireMe from "../buttons/HireMe";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import RubiksCube from "../RubiksCube/RubiksCube";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScroll();
  const { isDarkMode, toggleTheme } = useTheme();

  // 🔹 Section Tracking with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedLink = navLinks.find((link) => link.href === `#${id}`);
          if (matchedLink) setActiveLink(matchedLink.label);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navLinks.forEach((link) => {
      if (link.href.startsWith("#")) {
        const el = document.querySelector(link.href);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // 🔹 Scroll for Hide/Show + Scrolled State
  // Uses a ref for lastScrollY so the effect only registers once (no re-attach bug)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY > lastScrollY.current + 8 && currentY > 100) {
        setShowNavbar(false);
      } else if (currentY < lastScrollY.current - 8) {
        setShowNavbar(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // ← empty deps: register once, use ref to track scroll position

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #facc15, #f97316, #ec4899)",
          boxShadow: "0 0 10px rgba(250,204,21,0.5)",
        }}
      />

      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: showNavbar ? 0 : -120,
          opacity: showNavbar ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2 sm:top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 px-2 pointer-events-none"
      >
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
            backgroundColor: scrolled 
              ? (isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.85)") 
              : (isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)"),
            border: scrolled 
              ? "1px solid rgba(250,204,21,0.4)" 
              : (isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)"),
            boxShadow: scrolled
              ? (isDarkMode 
                  ? "0 20px 40px -15px rgba(0,0,0,0.5), 0 0 20px rgba(250,204,21,0.1)" 
                  : "0 20px 40px -15px rgba(0,0,0,0.1), 0 0 20px rgba(250,204,21,0.2)")
              : "0 4px 10px rgba(0,0,0,0.05)",
          }}
          className={`flex items-center justify-between px-3 sm:px-6 ${scrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'} rounded-full pointer-events-auto transition-all duration-300`}
        >
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 group relative cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-yellow-400 group-hover:bg-yellow-400 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all duration-300">
              <span className="text-yellow-400 group-hover:text-white dark:group-hover:text-black font-bold text-lg transition-colors">R</span>
            </div>
            <span className="hidden sm:block text-yellow-400 font-bold tracking-[0.2em] text-xs font-heading">RAHUL</span>
          </motion.a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center bg-[var(--glass-bg)] rounded-full px-2 py-1.5 border border-[var(--glass-border)] backdrop-blur-sm self-center">
            {navLinks.map((link, i) => (
              <li key={i} className="relative">
                <a
                  href={link.href}
                  className={`relative px-4 py-1.5 text-[13px] font-semibold transition-all duration-300 rounded-full flex items-center ${
                    activeLink === link.label ? "text-yellow-400" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-yellow-400/15 border border-yellow-400/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(250,204,21,0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-yellow-400 bg-[var(--glass-bg)] transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(250,204,21,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider transition-all"
            >
              Hire Me
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent)] text-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.span 
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? "✕" : "☰"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-3 p-4 rounded-3xl bg-[var(--bg-primary)] opacity-95 backdrop-blur-2xl border border-[var(--glass-border)] shadow-2xl space-y-2"
            >
              <div className="flex items-center justify-between px-5 py-2 mb-2 border-b border-[var(--glass-border)]">
                <span className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-widest">Theme</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-bg)] text-[var(--accent)]"
                >
                  {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.button>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 ${
                    activeLink === link.label ? "bg-yellow-400/10 text-[var(--accent)] border border-yellow-400/20" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 mt-4 px-5 py-4 rounded-2xl bg-[var(--accent)] text-black text-sm font-bold uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Let's Talk →
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  // Typewriter cycling for MERN roles
  const roles = ["MERN Stack Developer.", "Web Designer.", "React.js Specialist.", "Fullstack Builder."];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, typing, roleIndex]);

  const floatingParticles = Array.from({ length: 18 }, (_, i) => i);

  return (
    <>
      <div id="hero" className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-yellow-500/[var(--glow-opacity)] blur-[120px] will-change-transform" />
          <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/[var(--glow-opacity)] blur-[140px] will-change-transform" />
          <div className="absolute top-[35%] left-[45%] w-[400px] h-[400px] rounded-full bg-yellow-300/[var(--glow-opacity)] blur-[100px] will-change-transform" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingParticles.map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-400/25"
              style={{
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
              }}
              animate={{ y: [0, -28, 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.3) % 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Navbar />

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="pt-32 sm:pt-40 px-4 sm:px-6 pb-12 sm:pb-16 relative z-10">
          <section className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* ── Left: Text ── */}
            <div className="flex flex-col items-start text-left gap-4 sm:gap-6 flex-1 min-w-0 w-full">



              {/* Main Title & Mobile Cube Wrapper */}
              <div className="flex items-center justify-between w-full relative">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-row items-baseline gap-2 sm:gap-4 select-none flex-wrap max-w-[70%]"
                >
                  <span className="cursive-title text-[var(--text-primary)] opacity-95 text-5xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
                    Building
                  </span>
                  <span className="text-4xl sm:text-6xl md:text-8xl text-yellow-400 font-bold font-heading tracking-tighter drop-shadow-[0_0_30px_rgba(250,204,21,0.65)]">
                    the Web<span className="heading-dot text-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]">.</span>
                  </span>
                </motion.h1>

                {/* Mobile-only Rubik's Cube (aside the title) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
                  className="flex md:hidden absolute right-0 top-[-15px]"
                >
                  <div style={{ transform: "scale(0.35)", transformOrigin: "right top" }}>
                    <RubiksCube />
                  </div>
                </motion.div>
              </div>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-[2px] bg-[var(--accent)] opacity-60" />
                <h2 className="text-base sm:text-xl md:text-3xl font-semibold text-[var(--text-secondary)] min-w-0">
                  {displayed}
                  <span className="inline-block w-0.5 h-6 bg-[var(--accent)] ml-1 align-middle animate-[blink_0.8s_step-end_infinite]" />
                </h2>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  { name: "MongoDB",    icon: "/mongodb.svg" },
                  { name: "Express.js", icon: "/express.svg" },
                  { name: "React.js",   icon: "/react.svg" },
                  { name: "Node.js",    icon: "/node-js.svg" },
                  { name: "Tailwind",   icon: "/tailwindcss.svg" },
                  { name: "JavaScript", icon: "/js.svg" },
                ].map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, borderColor: "var(--accent)", color: "var(--text-primary)" }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] border border-[var(--glass-border)] bg-[var(--glass-bg)] cursor-default transition-all"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2"
              >
                <Download />
                <HireMe />
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-4 sm:gap-8 mt-4 pt-4 border-t border-[var(--glass-border)] w-full"
              >
                {[
                  { value: "30+", label: "Projects Built" },
                  { value: "2+", label: "Years Coding" },
                  { value: "15+", label: "Happy Clients" },
                ].map((stat, i) => (
                  <div key={i} className="text-center flex-1">
                    <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent-glow)]">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] opacity-80 mt-0.5 tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Rubik's Cube — desktop only ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex flex-shrink-0 items-center justify-center"
              style={{ width: 320 }}
            >
              <RubiksCube />
            </motion.div>

          </section>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[var(--text-secondary)] text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1"
          >
            <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Hero;
