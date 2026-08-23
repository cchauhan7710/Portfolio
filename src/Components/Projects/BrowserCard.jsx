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
        <div className="bg-black/10 dark:bg-white/[0.04] border-b border-[var(--glass-border)] px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Controls + Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {/* macOS Red / Yellow / Green Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0 pr-1">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
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
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {projects.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.title}
                    onClick={() => onSelectProject(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-t-lg text-[11px] sm:text-xs font-semibold transition-all shrink-0 border-t border-x ${
                      isActive
                        ? "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--glass-border)] shadow-sm"
                        : "text-[var(--text-secondary)] opacity-60 hover:opacity-100 hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        proj.isLive ? "bg-emerald-400 animate-pulse" : "bg-[var(--accent)]"
                      }`}
                    />
                    <span className="max-w-[90px] sm:max-w-[110px] truncate">{proj.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="w-full sm:max-w-md flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-full px-3 py-1 text-xs text-[var(--text-secondary)] shadow-inner">
            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            
            <span className="truncate text-[var(--text-primary)] font-mono text-[10px] sm:text-[11px] flex-1 tracking-tight">
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
        <div className="relative bg-[var(--bg-primary)] min-h-[440px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden group">
          
          {/* Top Navbar inside Website Viewport */}
          <div className="relative z-20 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]/90 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[var(--accent)] flex items-center justify-center text-black font-extrabold text-xs sm:text-sm shadow-md">
                {current.title.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-[var(--text-primary)] tracking-tight block">
                  {current.title}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] block truncate max-w-[130px] sm:max-w-none">
                  {current.subtitle || "Web Application"}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {current.isLive && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
              {current.badge && (
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 truncate max-w-[100px] sm:max-w-none">
                  {current.badge}
                </span>
              )}
            </div>
          </div>

          {/* ── Website Screenshot Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Desktop Full Bleed Background / Mobile Top Screenshot */}
              <div className="relative w-full h-44 sm:h-auto sm:absolute sm:inset-0 z-0 overflow-hidden border-b sm:border-b-0 border-[var(--glass-border)]">
                <img
                  src={current.image}
                  alt={current.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top opacity-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                {/* Soft Gradient Overlay for Desktop */}
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent dark:from-black/90 dark:via-black/60" />
              </div>

              {/* Text & Buttons Container (Stacked on mobile, Overlay on desktop) */}
              <div className="relative z-10 p-4 sm:p-10 lg:p-12 max-w-xl space-y-3.5 text-left bg-[var(--bg-secondary)] sm:bg-transparent">
                {/* Brand / Category Header */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {current.title}
                  </span>
                  {current.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                      {current.badge}
                    </span>
                  )}
                </div>

                {/* Big Main Headline */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] sm:text-white tracking-tight leading-tight">
                  {current.subtitle || current.title}
                </h2>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {current.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-[10px] font-semibold rounded-md text-[var(--text-secondary)] sm:text-white/80 border border-[var(--glass-border)] sm:border-white/20 bg-black/10 sm:bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description Paragraph */}
                <p className="text-[var(--text-secondary)] sm:text-white/85 text-xs sm:text-sm leading-relaxed max-w-lg">
                  {current.description}
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
                  {current.link && (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Open Website</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}

                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-[var(--glass-border)] sm:border-white/20 text-[var(--text-primary)] sm:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
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
          <div className="bg-black/20 dark:bg-white/[0.02] border-t border-[var(--glass-border)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between text-[11px] sm:text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Rendered in 0.04s</span>
              </span>
              <span className="hidden sm:inline opacity-70">
                SSL Secured • 256-bit Encryption
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 font-semibold">
              <button
                onClick={onPrev}
                className="hover:text-[var(--accent)] transition-colors"
              >
                ← Prev
              </button>
              <span>|</span>
              <button
                onClick={onNext}
                className="hover:text-[var(--accent)] transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
