import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactCard from "./ContactCard";

const YOUR_EMAIL = "rahulchauhaninbox@gmail.com";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const subject = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Rahul,\n\nMy name is ${form.name} (${form.email}).\n\n${form.message}\n\n— ${form.name}`
    );
    window.open(`mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`, "_blank");

    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const inputClass =
    "w-full h-13 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl px-5 outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 text-[var(--text-primary)] text-sm transition-all placeholder:text-[var(--text-secondary)]/50";

  return (
    <section
      id="contact"
      className="bg-[var(--bg-primary)] py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--accent)]/[var(--glow-opacity)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[var(--accent)]/[var(--glow-opacity)] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[var(--accent)] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-3 opacity-80"
          >
            — Get in Touch —
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row items-baseline justify-center gap-2 sm:gap-3 select-none flex-wrap"
          >
            <span className="cursive-title text-[var(--accent)] opacity-90 text-5xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-[0_0_15px_var(--accent-glow)]">
              Let's
            </span>
            <span className="text-4xl sm:text-5xl md:text-8xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_var(--accent-glow)]">
              Connect<span className="heading-dot">.</span>
            </span>
          </motion.div>
        </div>

        {/* ── Main Layout Grid (50/50 Equal Height Balance) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* ── Left Column: Profile Card & Quick Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between items-center lg:items-start space-y-5 p-6 sm:p-8 rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--glass-border)] backdrop-blur-xl shadow-2xl"
          >
            {/* Interactive Profile Card */}
            <div className="w-full flex justify-center lg:justify-start">
              <ContactCard
                onContactClick={() => {
                  const formElement = document.querySelector("form");
                  if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>

            {/* Quick Contact Badges */}
            <div className="w-full space-y-2.5 pt-2">
              {[
                {
                  label: "Email",
                  value: "rahulchauhaninbox@gmail.com",
                  href: `mailto:${YOUR_EMAIL}`,
                  icon: (
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  label: "Phone",
                  value: "+91 77107 48474",
                  href: "tel:+917710748474",
                  icon: (
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
                {
                  label: "Location",
                  value: "Ludhiana, Punjab 141013",
                  href: null,
                  icon: (
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.href && window.open(item.href)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl bg-black/10 dark:bg-white/5 border border-[var(--glass-border)] transition-all duration-300 ${
                    item.href ? "hover:border-[var(--accent)]/40 hover:scale-[1.01] cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-[var(--text-secondary)] opacity-60 uppercase tracking-widest font-semibold">{item.label}</p>
                    <p className="text-xs font-medium text-[var(--text-primary)] truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Clean Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--glass-border)] backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold ml-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold ml-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Hiring"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold ml-1">Message *</label>
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl px-5 py-3.5 outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 text-[var(--text-primary)] text-sm transition-all placeholder:text-[var(--text-secondary)]/50 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={status === "idle" ? { scale: 1.01, boxShadow: "0 0 25px var(--accent-glow)" } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`w-full h-13 font-bold uppercase tracking-widest text-xs rounded-2xl shadow-lg transition-all mt-2 flex items-center justify-center gap-2
                  ${status === "sent"
                    ? "bg-emerald-400 text-black cursor-default"
                    : "bg-[var(--accent)] text-black hover:brightness-110 cursor-pointer"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" ? (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Send Message
                    </motion.span>
                  ) : (
                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      ✓ Opening your email client...
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
