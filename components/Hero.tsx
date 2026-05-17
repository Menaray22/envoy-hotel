"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Star, MapPin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&q=90&auto=format&fit=crop";

const INSTAGRAM_URL = "https://www.instagram.com/theenvoyabuja/";

const STATS = [
  { value: "2009", label: "Est. Abuja" },
  { value: "138", label: "Suites" },
  { value: "5★", label: "Certified" },
  { value: "L2", label: "Security" },
];

/* ─────────────────────────────────────────────────────────────────────────
   FRAMER MOTION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.55 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.90 },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.70, ease: "easeOut" },
  },
};

const revealVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.0 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: "100%", rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: {
      delay: 0.60 + i * 0.10,
      duration: 0.80,
    },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED WORD — individual word reveal
   ───────────────────────────────────────────────────────────────────────── */
function AnimatedWord({ word, index, className = "" }: {
  word: string;
  index: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden leading-none pb-1">
      <motion.span
        custom={index}
        variants={wordVariants}
        className={`inline-block ${className}`}
        style={{ display: "inline-block" }}
      >
        {word}
      </motion.span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TACTICAL CORNER BRACKET (SVG-drawn)
   ───────────────────────────────────────────────────────────────────────── */
function TacticalBracket({
  position,
  size = 28,
  delay = 0,
}: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  delay?: number;
}) {
  const isRight = position === "tr" || position === "br";
  const isBottom = position === "bl" || position === "br";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8 + delay, duration: 0.50 }}
      className={`absolute ${isBottom ? "bottom-0" : "top-0"} ${isRight ? "right-0" : "left-0"}`}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        {/* Horizontal */}
        <motion.line
          x1={isRight ? size : 0}
          y1={isBottom ? size : 0}
          x2={isRight ? size - size * 0.65 : size * 0.65}
          y2={isBottom ? size : 0}
          stroke="#FA4338"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.0 + delay, duration: 0.60 }}
        />
        {/* Vertical */}
        <motion.line
          x1={isRight ? size : 0}
          y1={isBottom ? size : 0}
          x2={isRight ? size : 0}
          y2={isBottom ? size - size * 0.65 : size * 0.65}
          stroke="#FA4338"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.0 + delay, duration: 0.60 }}
        />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FLOATING STAT CARD
   ───────────────────────────────────────────────────────────────────────── */
function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.60 + index * 0.10,
        duration: 0.60,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="
        flex flex-col items-center gap-1
        px-4 py-3
        rounded-xl
        bg-white/[0.04]
        border border-white/[0.06]
        backdrop-blur-sm
        hover:bg-white/[0.07]
        hover:border-envoy-red/20
        transition-all duration-350
        cursor-default
        group
      "
    >
      <span
        className="
          font-heading text-xl font-800 text-stone-900
          group-hover:text-gradient-red
          transition-all duration-300
        "
        style={{ fontWeight: 800 }}
      >
        {value}
      </span>
      <span className="label-text-muted text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN HERO COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Parallax transforms */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.75, 0.92]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  /* Mouse parallax for image */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX / innerWidth) - 0.5) * 18);
      mouseY.set(((e.clientY / innerHeight) - 0.5) * 12);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  /* Ticker text */
  const tickerItems = [
    "Diplomatic VIP Suites",
    "·",
    "Larai Restaurant",
    "·",
    "Level 2 Security Certified",
    "·",
    "Poolside Oasis",
    "·",
    "Corporate Events",
    "·",
    "The Envoy Experience",
    "·",
  ];

  /* The headline split into words for per-word animation */
  const headline = ["The", "Diplomat's", "Sanctuary", "in", "Abuja."];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF8F5]er"
      aria-label="Hero — The Diplomat's Sanctuary"
    >
      {/* ── BACKGROUND IMAGE — parallax layer ──────────────────── */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY, scale: imageScale, x: springX, rotateY: 0 }}
      >
        {/* The Unsplash hero image */}
        <div
          className="absolute inset-0 animate-drift"
          style={{
            backgroundImage: `url("${HERO_IMAGE}")`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            transformOrigin: "center center",
          }}
          role="img"
          aria-label="The Envoy Hotel Abuja — exterior architectural photograph"
        />
      </motion.div>

      {/* ── LAYERED OVERLAYS ────────────────────────────────────── */}
      {/* Primary dark vignette */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-darker/50 via-carbon-darker/65 to-carbon-darker/95" />
      </motion.div>

      {/* Horizontal gradient — left focus */}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-r from-carbon-darker/70 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />

      {/* Red ambient glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[55vw] h-[55vh] z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 100%, rgba(250,67,56,0.08) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Tactical grid overlay */}
      <div
        className="absolute inset-0 z-[3] bg-tactical-grid opacity-[0.18] pointer-events-none"
        aria-hidden
      />

      {/* ── TOP STATUS BAR ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.30, duration: 0.60 }}
        className="
          absolute top-24 left-0 right-0 z-[10]
          hidden lg:flex items-center justify-between
          section-container
          pointer-events-none
        "
        aria-hidden
      >
        {/* Left — coordinates */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={11} className="text-envoy-red" strokeWidth={2} />
            <span className="coord-text">09°03′N · 07°29′E · ABUJA, FCT</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <span className="coord-text">ALT: 840M ASL</span>
        </div>

        {/* Right — classification badge */}
        <div className="flex items-center gap-3">
          <span className="security-badge pointer-events-auto">
            Clearance Level 2
          </span>
          <span className="coord-text">EST. MCMIX · ABUJA</span>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <motion.div
        className="
          relative z-[10]
          flex flex-col justify-center
          min-h-screen
          section-container
          pt-32 pb-48
          lg:pt-40 lg:pb-56
        "
        style={{ y: contentY, opacity: textOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* ── EYEBROW LABEL ──────────────────────────────────── */}
          <motion.div
            variants={fadeInVariants}
            className="flex items-center gap-3 mb-6"
          >
            {/* Animated dash */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.50, duration: 0.60 }}
              className="h-px bg-envoy-red flex-shrink-0"
            />
            <span className="label-text tracking-[0.22em]">
              The Diplomat's Sanctuary
            </span>
          </motion.div>

          {/* ── MAIN HEADLINE — word-by-word reveal ────────────── */}
          <h1
            className="
              font-heading
              text-display-xl
              text-stone-900
              mb-8
              leading-[1.0]
            "
            aria-label="The Diplomat's Sanctuary in Abuja."
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-4 gap-y-2"
            >
              {headline.map((word, i) => (
                <AnimatedWord
                  key={word + i}
                  word={word}
                  index={i}
                  className={
                    word === "Diplomat's" || word === "Sanctuary"
                      ? "text-gradient-red"
                      : "text-stone-900"
                  }
                />
              ))}
            </motion.div>
          </h1>

          {/* ── DESCRIPTION ────────────────────────────────────── */}
          <motion.p
            variants={fadeUpVariants}
            className="
              font-body text-base lg:text-lg
              text-stone-500
              leading-relaxed
              max-w-xl
              mb-10
            "
          >
            Where West African heritage meets the precision of modern diplomacy.
            An address reserved for those who demand both sanctuary and security
            in equal measure.
          </motion.p>

          {/* ── CTA BUTTONS ────────────────────────────────────── */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            {/* Primary CTA */}
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary group"
            >
              <span>Reserve a Suite</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <ArrowRight size={15} strokeWidth={2.5} />
              </motion.span>
            </motion.a>

            {/* Secondary — Instagram tour */}
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost group flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              <span>View Gallery</span>
            </motion.a>
          </motion.div>

          {/* ── STATS ROW ──────────────────────────────────────── */}
          <motion.div
            variants={fadeInVariants}
            className="flex flex-wrap items-center gap-3"
          >
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-white/[0.07] mx-1" aria-hidden />

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.60 }}
              className="flex items-center gap-2"
            >
              <Shield size={14} className="text-envoy-red" strokeWidth={2} />
              <span className="label-text-muted">Level 2 Security Certified</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── FLOATING IMAGE PEEK — right side (desktop only) ──── */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.20, duration: 1.0 }}
          className="
            hidden xl:block
            absolute right-16 top-1/2 -translate-y-1/2
            z-[12]
          "
          style={{ y: springY }}
          aria-hidden
        >
          {/* Card frame */}
          <div className="
            relative
            w-[260px] h-[340px]
            rounded-2xl overflow-hidden
            shadow-diplomatic-lg
            border border-white/[0.08]
          ">
            {/* Tactical brackets on the image card */}
            <TacticalBracket position="tl" size={22} delay={0} />
            <TacticalBracket position="tr" size={22} delay={0.08} />
            <TacticalBracket position="bl" size={22} delay={0.16} />
            <TacticalBracket position="br" size={22} delay={0.24} />

            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85&auto=format&fit=crop"
              alt="Envoy Hotel suite interior"
              className="w-full h-full object-cover"
              loading="eager"
            />

            {/* Gradient overlay on peek card */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-darker/80 via-transparent to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="label-text-muted mb-1">Featured Suite</p>
              <p className="font-heading text-sm font-700 text-stone-900" style={{ fontWeight: 700 }}>
                Diplomatic Presidential
              </p>
            </div>
          </div>

          {/* Floating rating chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.80, duration: 0.50 }}
            className="
              absolute -bottom-5 -left-5
              glass-panel rounded-xl
              flex items-center gap-2
              px-3 py-2
              shadow-glass-md
            "
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className="fill-envoy-red text-envoy-red"
                />
              ))}
            </div>
            <span className="font-heading text-[0.7rem] font-700 text-stone-900" style={{ fontWeight: 700 }}>
              5.0 · Forbes Rated
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── SCROLL TICKER — bottom marquee ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.20, duration: 0.80 }}
        className="
          absolute bottom-16 left-0 right-0 z-[10]
          overflow-hidden
          border-y border-white/[0.05]
          bg-[#FAF8F5]er/40 backdrop-blur-sm
          py-3
          marquee-wrapper
        "
        aria-hidden
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className={`
                mx-6
                font-heading text-[0.65rem] uppercase tracking-[0.20em]
                ${item === "·" ? "text-envoy-red" : "text-muted"}
              `}
              style={{ fontWeight: 600 }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ────────────────────────────────────── */}
      <motion.a
        href="#booking"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.50, duration: 0.60 }}
        className="
          absolute bottom-4 left-1/2 -translate-x-1/2 z-[10]
          flex flex-col items-center gap-2
          text-muted hover:text-stone-900
          transition-colors duration-250
          group
        "
        aria-label="Scroll to booking section"
      >
        <span className="label-text-muted">Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
          className="
            w-7 h-11 rounded-full
            border border-white/[0.15]
            group-hover:border-envoy-red/40
            flex items-start justify-center
            pt-1.5
            transition-colors duration-250
            relative overflow-hidden
          "
        >
          {/* Mouse scroll dot */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-envoy-red shadow-red-glow-sm"
          />
        </motion.div>
      </motion.a>

      {/* ── SIDE SOCIAL LINKS (desktop) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.60 }}
        className="
          absolute left-6 bottom-1/3
          z-[10]
          hidden lg:flex flex-col items-center gap-4
        "
        aria-label="Social links"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" aria-hidden />
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            -rotate-90
            font-heading text-[0.6rem] uppercase tracking-[0.22em]
            text-muted hover:text-envoy-red
            transition-colors duration-250
            whitespace-nowrap
          "
          style={{ fontWeight: 600 }}
        >
          @theenvoyabuja
        </a>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" aria-hidden />
      </motion.div>
    </section>
  );
}