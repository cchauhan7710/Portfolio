import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultTestimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Founder, TechNova",
    avatar: "AS",
    color: "from-yellow-400 to-orange-400",
    rating: 5,
    text: "Rahul delivered a complete MERN stack platform in record time. The code quality was exceptional — clean, well-structured, and easy to maintain. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Product Manager, FinTrack",
    avatar: "PM",
    color: "from-orange-300 to-yellow-400",
    rating: 5,
    text: "Working with Rahul was a fantastic experience. He rebuilt our dashboard from scratch using React and Node.js, resulting in a 40% faster load time and much better UX.",
  },
  {
    id: 3,
    name: "Ravi Kulkarni",
    role: "CEO, StartupLaunch",
    avatar: "RK",
    color: "from-green-400 to-teal-500",
    rating: 5,
    text: "Rahul's attention to detail and design sensibility set him apart. He turned a vague brief into a polished, high-converting web app. Will definitely hire again.",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Marketing Head, GrowthHub",
    avatar: "SP",
    color: "from-pink-400 to-rose-500",
    rating: 4,
    text: "Very professional and communicative throughout the project. The final product exceeded our expectations — modern design, solid backend, and zero bugs on launch.",
  },
  {
    id: 5,
    name: "Akash Verma",
    role: "CTO, CloudBase",
    avatar: "AV",
    color: "from-purple-400 to-indigo-500",
    rating: 5,
    text: "Rahul's full-stack expertise is top-notch. He integrated our REST APIs seamlessly and deployed the app on time. A reliable developer you can count on.",
  },
];

function StarRow({ rating, size = 18, color = "#F4B400", interactive = false, onSelect }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => {
        const active = interactive ? s <= (hoverRating || rating) : s <= rating;
        return (
          <svg
            key={s}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={active ? color : "none"}
            stroke={color}
            strokeWidth={1.5}
            onMouseEnter={() => interactive && setHoverRating(s)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && onSelect && onSelect(s)}
            className={`transition-all ${interactive ? "cursor-pointer hover:scale-125" : ""}`}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultTestimonials;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (isHovered || isModalOpen) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isHovered, isModalOpen, nextSlide]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const initials = name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim() || "Client",
      avatar: initials,
      color: "from-yellow-400 to-orange-400",
      rating,
      text: text.trim(),
    };

    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSuccessMsg("Thank you! Your review has been added.");
    setTimeout(() => {
      setSuccessMsg("");
      setIsModalOpen(false);
      setName("");
      setRole("");
      setRating(5);
      setText("");
      setCurrentIndex(0);
    }, 1200);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const handleDragEnd = (e, { offset }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      nextSlide();
    } else if (swipe > 50) {
      prevSlide();
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-[var(--bg-primary)] py-24 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500"
    >
      {/* Ambient glows */}
      <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-yellow-500/[var(--glow-opacity)] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-orange-400/[var(--glow-opacity)] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--accent)] text-sm tracking-[0.4em] uppercase font-bold mb-4 opacity-80"
          >
            — What Clients Say —
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row items-baseline justify-center gap-2 sm:gap-4 select-none flex-wrap"
          >
            <span className="cursive-title text-[var(--text-primary)] opacity-90 text-5xl sm:text-7xl md:text-9xl tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Client
            </span>
            <span className="text-3xl sm:text-5xl md:text-7xl text-[var(--accent)] font-bold font-heading tracking-tighter drop-shadow-[0_0_10px_rgba(244,180,0,0.15)]">
              Reviews<span className="heading-dot">.</span>
            </span>
          </motion.div>

          {/* Add Review Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_var(--accent-glow)] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Write a Review
          </motion.button>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-2xl mx-auto mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[260px] sm:h-[200px] w-full overflow-hidden perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={testimonials[currentIndex]?.id || currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full flex justify-center items-center cursor-grab active:cursor-grabbing"
              >
                {/* Testimonial Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-[0_15px_40px_rgba(244,180,0,0.08)] backdrop-blur-md flex flex-col justify-between transition-all"
                >
                  {/* Decorative Quote */}
                  <div className="absolute top-4 right-6 text-6xl text-yellow-500/10 font-serif select-none pointer-events-none">
                    "
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed relative z-10 italic pr-8">
                    "{testimonials[currentIndex]?.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonials[currentIndex]?.color || "from-yellow-400 to-orange-400"} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                      {testimonials[currentIndex]?.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        {testimonials[currentIndex]?.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] opacity-80 mb-1">
                        {testimonials[currentIndex]?.role}
                      </p>
                      <StarRow rating={testimonials[currentIndex]?.rating || 5} size={14} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-yellow-500 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(244,180,0,0.15)] transition-all cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === currentIndex 
                      ? "w-8 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-[0_0_10px_rgba(244,180,0,0.5)]" 
                      : "w-2.5 h-2.5 bg-gray-300 dark:bg-white/20 hover:bg-yellow-400/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-yellow-500 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(244,180,0,0.15)] transition-all cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Leave a Review</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6">Share your experience working with me.</p>

              {successMsg ? (
                <div className="p-4 rounded-xl bg-yellow-400/20 text-[var(--accent)] font-semibold text-center text-sm border border-yellow-400/30">
                  {successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CEO at TechFlow"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                      Rating
                    </label>
                    <StarRow rating={rating} size={22} interactive onSelect={(r) => setRating(r)} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                      Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your genuine feedback here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-bold text-sm tracking-wide shadow-md hover:shadow-[0_0_20px_var(--accent-glow)] transition-all cursor-pointer mt-2"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
