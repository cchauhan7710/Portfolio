import React from "react";
import { motion } from "framer-motion";

/**
 * ProjectCard - Individual Project Showcase Card styled as a Browser Window frame.
 * Retains the structural layout of the user's card with an elevated browser header & frontpage showcase.
 */
export default function ProjectCard({ project, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative flex flex-col w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
    >
      {/* ── macOS Browser Window Bar ── */}
      <div className="flex items-center justify-between bg-black/20 dark:bg-white/[0.04] border-b border-[var(--glass-border)] px-4 py-2.5">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[200px] sm:max-w-[240px] mx-3 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-full px-3 py-0.5 text-[10px] text-[var(--text-secondary)] font-mono truncate flex items-center gap-1.5 shadow-inner">
          <span className="text-emerald-400">🔒</span>
          <span className="truncate">{project.url || project.link}</span>
        </div>

        {/* Status Dot */}
        <span
          className={`w-2 h-2 rounded-full ${
            project.isLive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
          }`}
          title={project.isLive ? "Live Site" : "Demo Site"}
        />
      </div>

      {/* ── Elevated Project Banner (Browser Frontpage Preview) ── */}
      <div className="relative mx-4 mt-4 h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--glass-border)] flex items-center justify-center p-4 group-hover:border-[var(--accent)]/50 transition-colors duration-500">
        
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* Frontpage Image / Screenshot */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Live Badge Overlay */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          {project.isLive && (
            <span className="px-2.5 py-1 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              ● Live
            </span>
          )}
          {project.badge && (
            <span className="px-2.5 py-1 rounded-full bg-black/60 border border-[var(--glass-border)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              {project.badge}
            </span>
          )}
        </div>

        {/* Quick Visit Button Overlay */}
        <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-black font-bold text-xs shadow-md flex items-center gap-1.5 hover:brightness-110 transition-all"
          >
            Visit ↗
          </a>
        </div>
      </div>

      {/* ── Card Content Body ── */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>

          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[10px] font-medium rounded-md text-[var(--text-secondary)] border border-[var(--glass-border)] bg-black/5 dark:bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Card Action Footer ── */}
        <div className="pt-0 flex items-center justify-between gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 select-none rounded-xl bg-[var(--accent)] py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md transition-all hover:shadow-lg hover:brightness-110 active:opacity-[0.85] flex items-center justify-center gap-2"
          >
            <span>Open Website</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-[var(--glass-border)] bg-white/5 hover:bg-white/10 text-[var(--text-primary)] transition-colors"
              title="View Code on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
