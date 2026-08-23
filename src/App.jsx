import React, { useEffect, lazy, Suspense } from "react";
import Hero from "./Components/Hero/Hero";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "./context/ThemeContext";
import MobileBottomNav from "./Components/Hero/MobileBottomNav";
import CubeParticles from "./Components/CubeVibes/CubeParticles";

// Lazy load below-the-fold components for bundle & performance optimization
const About = lazy(() => import("./Components/About/About"));
const AboutHeading = lazy(() => import("./Components/About/AboutHeading"));
const ServiceHeading = lazy(() => import("./Components/Services/ServiceHeading"));
const ProjectHeading = lazy(() => import("./Components/Projects/ProjectHeading"));
const Projects = lazy(() => import("./Components/Projects/Projects"));
const Brand = lazy(() => import("./Components/AnimatedSkill/Brand"));
const Contact = lazy(() => import("./Components/Contact/Contact"));
const Testimonials = lazy(() => import("./Components/Testimonials/Testimonials"));
const Footer = lazy(() => import("./Components/Footer/Footer"));

function SectionFallback() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin" />
    </div>
  );
}

function MainContent() {
  return (
    <div className="pb-16 md:pb-0">
      <Hero />
      <div className="relative z-10">
        <Suspense fallback={<SectionFallback />}>
          <AboutHeading />
          <About />
          <ServiceHeading />
          <ProjectHeading />
          <Projects />
          <Brand />
          <Contact />
          <Testimonials />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2.0,
    });

    window.lenis = lenis;
    
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.lenis = null;
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-[var(--bg-primary)] min-h-screen selection:bg-yellow-400 selection:text-black">
        {/* ── Global cube particle ambience ── */}
        <CubeParticles />
        <MainContent />
        {/* ── Mobile-only bottom navigation bar ── */}
        <MobileBottomNav />
      </div>
    </ThemeProvider>
  );
}

export default App;
