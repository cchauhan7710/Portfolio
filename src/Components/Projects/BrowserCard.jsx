import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BrowserCard - Displays a project formatted as a realistic website inside a web browser window mockup.
 */
export default function BrowserCard({
  projects,
  currentIndex,
  onSelectProject,
  onPrev,
  onNext,
}) {
  const current = projects[currentIndex];
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    if (current?.url || current?.link) {
      const targetUrl = current.url || current.link;
      navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = (e) => {
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ── Browser Window Frame ── */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-500"
      >
        {/* ── macOS Browser Chrome (Top Navigation Bar) ── */}
        <div className="bg-black/10 dark:bg-white/[0.04] border-b border-[var(--glass-border)] px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Controls + Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {/* macOS Red / Yellow / Green Window Controls */}
            <div className="flex items-center gap-2 shrink-0 pr-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center group cursor-pointer">
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950">✕</span>
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-yellow-600 transition-colors shadow-sm flex items-center justify-center group cursor-pointer">
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950">−</span>
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:bg-emerald-600 transition-colors shadow-sm flex items-center justify-center group cursor-pointer">
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-emerald-950">+</span>
              </span>
            </div>

            {/* Browser Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1 text-[var(--text-secondary)] shrink-0 pl-1 border-l border-[var(--glass-border)]">
              <button
                onClick={onPrev}
                title="Previous Website"
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-[var(--accent)] transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={onNext}
                title="Next Website"
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-[var(--accent)] transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={handleRefresh}
                title="Reload Website"
                className={`p-1.5 rounded-md hover:bg-white/10 hover:text-[var(--accent)] transition-all ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Browser Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pl-1">
              {projects.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.title}
                    onClick={() => onSelectProject(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-all shrink-0 border-t border-x ${
                      isActive
                        ? "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--glass-border)] shadow-sm"
                        : "text-[var(--text-secondary)] opacity-60 hover:opacity-100 hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        proj.isLive ? "bg-emerald-400 animate-pulse" : "bg-[var(--accent)]"
                      }`}
                    />
                    <span className="max-w-[110px] truncate">{proj.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser Address Bar (URL bar with lock & copy) */}
          <div className="flex-1 max-w-md flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-full px-3.5 py-1.5 text-xs text-[var(--text-secondary)] shadow-inner">
            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            
            <span className="truncate text-[var(--text-primary)] font-mono text-[11px] flex-1 tracking-tight">
              {current.url || current.link}
            </span>

            <button
              onClick={handleCopyUrl}
              className="p-1 hover:text-[var(--accent)] transition-colors rounded shrink-0"
              title="Copy Project URL"
            >
              {copied ? (
                <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 opacity-60 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Simulated Website Content Viewport ── */}
        <div className="relative bg-[var(--bg-primary)] min-h-[480px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden group">
          
          {/* Top Navbar inside the Website Viewport */}
          <div className="relative z-20 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]/80 px-6 py-3 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
                {current.title.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight block">
                  {current.title}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] block">
                  {current.subtitle || "Web Application"}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              {current.isLive && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Website
                </span>
              )}
              {current.badge && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  {current.badge}
                </span>
              )}
            </div>
          </div>

          {/* ── Full Website Screenshot Background Preview ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1 flex flex-col justify-center overflow-hidden"
            >
              {/* Full Background Website Screenshot (100% Visible) */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top opacity-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                {/* Soft Gradient Overlay so Image is Clear & Vibrant */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent/10 dark:from-black/85 dark:via-black/50 dark:to-transparent" />
              </div>

              {/* Floating Left Gricora-Style Text & Buttons Overlay with Softened Text Opacity */}
              <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl space-y-4 text-left">
                {/* Brand / Category Header */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)] opacity-90">
                    {current.title}
                  </span>
                  {current.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-md">
                      {current.badge}
                    </span>
                  )}
                </div>

                {/* Big Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] opacity-95 drop-shadow-md">
                  {current.subtitle || current.title}
                </h2>

                {/* Subtitle / Tech Stack Bullet Line */}
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/70 pt-1">
                  {current.tags.join(" • ")}
                </div>

                {/* Description Paragraph with Softer Opacity */}
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-lg drop-shadow-sm font-normal">
                  {current.description}
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  {current.link && (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      <span>Open Website</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}

                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Browser Window Status Bar */}
          <div className="bg-black/20 dark:bg-white/[0.02] border-t border-[var(--glass-border)] px-6 py-3 flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Rendered in 0.04s</span>
              </span>
              <span className="hidden sm:inline opacity-70">
                SSL Secured • 256-bit Encryption
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="hover:text-[var(--accent)] transition-colors font-semibold"
              >
                ← Prev Project
              </button>
              <span>|</span>
              <button
                onClick={onNext}
                className="hover:text-[var(--accent)] transition-colors font-semibold"
              >
                Next Project →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
