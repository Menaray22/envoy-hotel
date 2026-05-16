"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Shield, Crosshair, Eye, Lock, Wifi } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────────────────── */
const YOUTUBE_EMBED =
  "https://www.youtube.com/embed/YOUR_YOUTUBE_ID?autoplay=0&controls=1&rel=0&modestbranding=1";

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED SVG CORNER BRACKET
   ───────────────────────────────────────────────────────────────────────── */
function AnimatedCornerBracket({
  position,
  delay = 0,
  size = 36,
}: {
  position: "tl" | "tr" | "bl" | "br";
  delay?: number;
  size?: number;
}) {
  const isRight = position === "tr" || position === "br";
  const isBottom = position === "bl" || position === "br";

  const posClass = [
    isBottom ? "bottom-0" : "top-0",
    isRight ? "right-0" : "left-0",
  ].join(" ");

  return (
    <motion.div
      className={`absolute ${posClass} z-20`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.40 }}
      aria-hidden
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        {/* Horizontal arm */}
        <motion.line
          x1={isRight ? size : 0}
          y1={isBottom ? size : 0}
          x2={isRight ? size - size * 0.7 : size * 0.7}
          y2={isBottom ? size : 0}
          stroke="#FA4338"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.15, duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
        />
        {/* Vertical arm */}
        <motion.line
          x1={isRight ? size : 0}
          y1={isBottom ? size : 0}
          x2={isRight ? size : 0}
          y2={isBottom ? size - size * 0.7 : size * 0.7}
          stroke="#FA4338"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.15, duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
        />
        {/* Corner dot */}
        <motion.circle
          cx={isRight ? size : 0}
          cy={isBottom ? size : 0}
          r="2.5"
          fill="#FA4338"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.55, duration: 0.30 }}
        />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CROSSHAIR OVERLAY SVG
   ───────────────────────────────────────────────────────────────────────── */
function CrosshairOverlay({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.40 }}
          className="absolute inset-0 z-[15] pointer-events-none flex items-center justify-center"
          aria-hidden
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Horizontal rule */}
            <motion.line
              x1="0" y1="50" x2="43" y2="50"
              stroke="rgba(250,67,56,0.20)" strokeWidth="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.80, delay: 0.20 }}
            />
            <motion.line
              x1="57" y1="50" x2="100" y2="50"
              stroke="rgba(250,67,56,0.20)" strokeWidth="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.80, delay: 0.20 }}
            />
            {/* Vertical rule */}
            <motion.line
              x1="50" y1="0" x2="50" y2="43"
              stroke="rgba(250,67,56,0.20)" strokeWidth="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.80, delay: 0.20 }}
            />
            <motion.line
              x1="50" y1="57" x2="50" y2="100"
              stroke="rgba(250,67,56,0.20)" strokeWidth="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.80, delay: 0.20 }}
            />
            {/* Center circle */}
            <motion.circle
              cx="50" cy="50" r="7"
              stroke="rgba(250,67,56,0.35)" strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.60, delay: 0.50 }}
            />
            {/* Outer circle */}
            <motion.circle
              cx="50" cy="50" r="14"
              stroke="rgba(250,67,56,0.15)" strokeWidth="0.25"
              strokeDasharray="3 2"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ opacity: { delay: 0.60, duration: 0.40 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
              style={{ transformOrigin: "50px 50px" }}
            />
          </svg>

          {/* Center dot */}
          <div className="w-2 h-2 rounded-full bg-envoy-red shadow-red-glow" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HUD STATUS CHIP
   ───────────────────────────────────────────────────────────────────────── */
function HudChip({ icon, text, pulse = false }: { icon: React.ReactNode; text: string; pulse?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5]er/80 backdrop-blur-sm border border-white/[0.07]">
      <span className={`text-envoy-red flex-shrink-0 ${pulse ? "animate-pulse-glow" : ""}`}>{icon}</span>
      <span className="font-heading text-[0.625rem] uppercase tracking-[0.14em] text-muted-light whitespace-nowrap" style={{ fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN VIDEO SHOWCASE COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isSectionInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });
  const isFrameInView = useInView(frameRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative bg-[#FAF8F5] py-24 lg:py-40 overflow-hidden"
      aria-labelledby="video-heading"
    >
      {/* ── BACKGROUND DECORATIONS ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-tactical-grid opacity-[0.18]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(250,67,56,0.05) 0%, transparent 65%)" }} />
        {/* Top and bottom red gradient bands */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-envoy-red/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-envoy-red/30 to-transparent" />
      </div>

      <div className="section-container relative z-10">

        {/* ── SECTION HEADER ────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.70 }}
          >
            <div className="h-px w-8 bg-envoy-red" />
            <span className="label-text">The Envoy Experience</span>
            <div className="h-px w-8 bg-envoy-red" />
          </motion.div>

          <motion.h2
            id="video-heading"
            className="font-heading text-display-lg text-stone-900 mb-5"
            style={{ fontWeight: 800 }}
            initial={{ opacity: 0, y: 30 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.10, duration: 0.85 }}
          >
            See{" "}
            <span className="text-gradient-red">The Sanctuary</span>
            {" "}In Motion
          </motion.h2>

          <motion.p
            className="font-body text-base text-muted-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.20, duration: 0.80 }}
          >
            A visual tour of Abuja's most distinguished address — from the Diplomatic Presidential Suite to the Larai dining room at golden hour.
          </motion.p>
        </div>

        {/* ── VIDEO FRAME ───────────────────────────────────────── */}
        <motion.div
          ref={frameRef}
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isFrameInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-5xl mx-auto"
        >

          {/* ── OUTER TACTICAL FRAME ──────────────────────────── */}
          <div
            className="
              relative
              rounded-2xl
              p-[3px]
            "
            style={{
              background: "linear-gradient(135deg, rgba(250,67,56,0.55) 0%, rgba(255,255,255,0.06) 30%, rgba(250,67,56,0.10) 70%, rgba(250,67,56,0.45) 100%)",
            }}
          >
            {/* ── INNER FRAME BODY ──────────────────────────────── */}
            <div
              ref={frameRef}
              className="relative rounded-[calc(1rem-3px)] overflow-hidden bg-[#FAF8F5]er"
              onMouseEnter={() => setIsFrameHovered(true)}
              onMouseLeave={() => setIsFrameHovered(false)}
            >
              {/* Animated corner brackets — positioned at the outer frame corners */}
              <AnimatedCornerBracket position="tl" delay={0.60} size={40} />
              <AnimatedCornerBracket position="tr" delay={0.70} size={40} />
              <AnimatedCornerBracket position="bl" delay={0.80} size={40} />
              <AnimatedCornerBracket position="br" delay={0.90} size={40} />

              {/* ── VIDEO IFRAME ───────────────────────────────── */}
              <div className="relative aspect-video w-full">
                <iframe
                  src={YOUTUBE_EMBED}
                  title="The Envoy Hotel Abuja — Experience Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-[5]"
                  loading="lazy"
                  onLoad={() => setIsPlaying(false)}
                />

                {/* Crosshair overlay — shows on hover before play */}
                <CrosshairOverlay isActive={isFrameHovered && !isPlaying} />

                {/* Scan line — always running over the iframe */}
                <div
                  className="absolute inset-0 z-[12] pointer-events-none scan-line-container"
                  aria-hidden
                />

                {/* Top HUD bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 z-[16] px-4 py-3 flex items-center justify-between pointer-events-none"
                  initial={{ opacity: 0, y: -12 }}
                  animate={isFrameInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.10, duration: 0.60 }}
                  aria-hidden
                >
                  {/* Left: classification */}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-envoy-red animate-pulse-glow" />
                    <span className="coord-text">REC · LIVE PREVIEW</span>
                  </div>
                  {/* Right: timestamp */}
                  <div className="flex items-center gap-3">
                    <span className="coord-text">ABUJA · FCT · 09°03′N</span>
                    <div className="security-badge !py-0.5">
                      <span>SEC LVL-2</span>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom HUD bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-[16] px-4 py-3 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(14,17,24,0.90) 0%, transparent 100%)" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isFrameInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.20, duration: 0.60 }}
                  aria-hidden
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading text-[0.625rem] uppercase tracking-[0.16em] text-stone-900/60" style={{ fontWeight: 600 }}>
                      The Envoy Hotel Abuja
                    </span>
                    <div className="w-px h-3 bg-white/[0.12]" />
                    <span className="coord-text">THE DIPLOMAT'S SANCTUARY</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── FRAME EDGE LABELS (tactical, decorative) ──────── */}
          {/* Left edge */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 hidden lg:flex flex-col items-end gap-1"
            initial={{ opacity: 0, x: 16 }}
            animate={isFrameInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.30, duration: 0.60 }}
            aria-hidden
          >
            <span className="coord-text -rotate-90 whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              ENVOY · ABUJA · 2009
            </span>
          </motion.div>

          {/* Right edge */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 hidden lg:flex flex-col items-start gap-1"
            initial={{ opacity: 0, x: -16 }}
            animate={isFrameInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.30, duration: 0.60 }}
            aria-hidden
          >
            <span className="coord-text" style={{ writingMode: "vertical-rl" }}>
              VID · CLASSIFIED
            </span>
          </motion.div>

          {/* ── BOTTOM HUD CHIPS ──────────────────────────────── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={isFrameInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.40, duration: 0.60 }}
          >
            <HudChip icon={<Eye size={12} strokeWidth={2} />} text="360° CCTV Active" pulse />
            <HudChip icon={<Shield size={12} strokeWidth={2} />} text="DSS Level 2 Certified" />
            <HudChip icon={<Lock size={12} strokeWidth={2} />} text="Encrypted Perimeter" />
            <HudChip icon={<Wifi size={12} strokeWidth={2} />} text="Secure Network" />
          </motion.div>
        </motion.div>

        {/* ── BELOW VIDEO — Instagram CTA ───────────────────────── */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.50, duration: 0.70 }}
        >
          <p className="label-text-muted mb-5">
            Want more? Follow our visual story on Instagram.
          </p>
          <motion.a
            href="https://www.instagram.com/theenvoyabuja/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            <Play size={14} strokeWidth={2.5} />
            Follow @theenvoyabuja
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}