import { motion } from "framer-motion";

const footerLinks = ["About", "Services", "Projects", "Contact"];
const socialLinks = [
  { label: "GitHub", icon: "𝔾", href: "https://github.com/cchauhan7710" },
  { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/in/rahul-chauhan-6091a8347/" },
  { label: "Instagram", icon: "📷", href: "https://www.instagram.com/vibe_withchauhan/" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-yellow-400/10 relative overflow-hidden transition-colors duration-500">
      {/* Glow */}
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[200px] rounded-full bg-yellow-500/[var(--glow-opacity)] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-400 font-bold text-base">R</div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Rahul</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] opacity-80 max-w-xs">
              MERN Stack Developer & Web Designer — building fast, scalable, and beautiful web applications.
            </p>
          </motion.div>

          {/* Nav Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-5"
          >
            {footerLinks.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase()}`}
                whileHover={{ color: "#F4B400", y: -1 }}
                className="text-sm text-[var(--text-secondary)] opacity-70 transition-colors duration-200"
              >
                {link}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-3"
          >
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, borderColor: "rgba(244,180,0,0.5)", color: "#F4B400" }}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-secondary)] text-sm font-semibold transition-all duration-200"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider + copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 mt-8 border-t border-[var(--glass-border)] text-center"
        >
          <p className="text-sm text-[var(--text-secondary)] opacity-60">
            © 2025 <span className="text-yellow-400/70">Rahul</span>. Built with React & Node.js. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
