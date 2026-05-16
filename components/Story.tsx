"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Globe, Compass, Anchor, ArrowRight, Quote } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────────────────── */
const HERITAGE_PILLARS = [
  {
    number: "01",
    icon: <Compass size={20} strokeWidth={1.5} />,
    title: "The Silk Road",
    subtitle: "Heritage of Connection",
    body: "For millennia, the Silk Road was not merely a trade route — it was the world's first diplomatic channel. Merchants, envoys, and dignitaries carried more than silk; they carried culture, philosophy, and the foundations of modern statecraft. The Envoy Hotel is named in honour of those who travelled it with purpose.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&q=85&auto=format&fit=crop",
    imageAlt: "Silk Road desert caravanserai architecture",
    stat: { value: "7,000+", label: "Years of Diplomatic Tradition" },
  },
  {
    number: "02",
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: "The Envoy Coin",
    subtitle: "Symbol of Unity",
    body: "Our emblem — the Envoy Coin — is drawn from the ancient tradition of the tessera hospitalis: a token split between host and guest, its reunion a guarantee of sanctuary and mutual respect. Displayed in our lobby and embossed on every suite key, it is our binding covenant with every guest who enters.",
    image: "https://images.unsplash.com/photo-1609780447631-05b93e5a045a?w=900&q=85&auto=format&fit=crop",
    imageAlt: "Gold coin with intricate diplomatic emblem",
    stat: { value: "138", label: "Suites Bound by the Covenant" },
  },
  {
    number: "03",
    icon: <Anchor size={20} strokeWidth={1.5} />,
    title: "Mission of Unity",
    subtitle: "Abuja's Meeting Point",
    body: "Abuja was designed to be Africa's diplomatic capital — a city of arrival, of convergence, of intention. The Envoy Hotel was built to match that ambition. We exist at the intersection of nations: a neutral ground where deals are struck, friendships forged, and Africa's future is quietly negotiated over a meal at Larai.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85&auto=format&fit=crop",
    imageAlt: "Modern Abuja skyline at dusk",
    stat: { value: "60+", label: "Nations Hosted Annually" },
  },
];

const QUOTE = {
  text: "An envoy does not merely deliver messages. He carries the weight of trust between two worlds.",
  attribution: "— Founding Principle, The Envoy Hotel",
};

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.90, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.90, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.90, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.80, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const lineRevealVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.80, ease: [0.77, 0, 0.175, 1] },
  },
};

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.10 },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.70, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   REUSABLE: SECTION REVEAL WRAPPER
   ───────────────────────────────────────────────────────────────────────── */
function RevealOnScroll({
  children,
  variants = fadeUpVariants,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  variants?: typeof fadeUpVariants;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERITAGE PILLAR CARD — alternating left/right layout
   ───────────────────────────────────────────────────────────────────────── */
function HeritagePillar({
  pillar,
  index,
}: {
  pillar: typeof HERITAGE_PILLARS[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  /* Parallax on the image within the card */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-1 lg:grid-cols-2 gap-0
        lg:gap-16 xl:gap-24
        items-center
        ${isEven ? "" : ""}
      `}
    >
      {/* ── IMAGE BLOCK ───────────────────────────────────────────── */}
      <motion.div
        variants={isEven ? fadeLeftVariants : fadeRightVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`
          relative
          aspect-[4/3] lg:aspect-[3/4]
          rounded-2xl overflow-hidden
          ${!isEven ? "lg:order-2" : ""}
        `}
      >
        {/* Image with parallax */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: imageY }}
        >
          <img
            src={pillar.image}
            alt={pillar.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-darker/80 via-transparent to-carbon-darker/20" />

        {/* Tactical corner brackets */}
        {[
          "absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-envoy-red/70 rounded-tl",
          "absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-envoy-red/70 rounded-tr",
          "absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-envoy-red/70 rounded-bl",
          "absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-envoy-red/70 rounded-br",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={cls}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.6 + i * 0.06, duration: 0.40 }}
            aria-hidden
          />
        ))}

        {/* Number badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.50, duration: 0.60 }}
          className="absolute bottom-6 left-6"
        >
          <div className="glass-panel rounded-xl px-4 py-3">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-display-sm text-gradient-red leading-none" style={{ fontWeight: 800 }}>
                {pillar.stat.value}
              </span>
            </div>
            <p className="label-text-muted mt-1">{pillar.stat.label}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── TEXT BLOCK ───────────────────────────────────────────── */}
      <motion.div
        variants={isEven ? fadeRightVariants : fadeLeftVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`
          py-8 lg:py-0
          ${!isEven ? "lg:order-1" : ""}
        `}
      >
        {/* Chapter number */}
        <motion.div
          variants={staggerItemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            className="h-px bg-envoy-red origin-left"
            variants={lineRevealVariants}
            style={{ width: 32 }}
          />
          <span className="coord-text">{pillar.number}</span>
          <div className="w-px h-3 bg-white/10 mx-1" aria-hidden />
          <span className="label-text">{pillar.subtitle}</span>
        </motion.div>

        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="
            flex-shrink-0
            w-12 h-12 rounded-2xl
            flex items-center justify-center
            bg-envoy-red/10 border border-envoy-red/20
            text-envoy-red
          ">
            {pillar.icon}
          </div>
          <h3
            className="font-heading text-display-md text-stone-900 leading-tight"
            style={{ fontWeight: 800 }}
          >
            {pillar.title}
          </h3>
        </div>

        {/* Body text */}
        <p className="font-body text-base text-stone-500 leading-relaxed mb-8 max-w-lg">
          {pillar.body}
        </p>

        {/* Learn more link */}
        <motion.a
          href="https://www.instagram.com/theenvoyabuja/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.20 }}
          className="
            inline-flex items-center gap-2.5
            font-heading text-[0.75rem] uppercase tracking-[0.16em]
            text-envoy-red hover:text-envoy-red-deep
            transition-colors duration-200
            group
          "
          style={{ fontWeight: 700 }}
        >
          <span>Explore Our Heritage</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.a>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TIMELINE CONNECTOR — vertical line between pillars
   ───────────────────────────────────────────────────────────────────────── */
function TimelineConnector() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <div ref={ref} className="flex justify-center py-12 lg:py-16" aria-hidden>
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.60 }}
      >
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-envoy-red/40 to-transparent"
          initial={{ height: 0 }}
          animate={isInView ? { height: 64 } : { height: 0 }}
          transition={{ duration: 0.80, ease: [0.77, 0, 0.175, 1] }}
        />
        <div className="w-1.5 h-1.5 rounded-full bg-envoy-red shadow-red-glow-sm" />
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-envoy-red/40 to-transparent"
          initial={{ height: 0 }}
          animate={isInView ? { height: 64 } : { height: 0 }}
          transition={{ duration: 0.80, delay: 0.10, ease: [0.77, 0, 0.175, 1] }}
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SIGNATURE QUOTE BLOCK
   ───────────────────────────────────────────────────────────────────────── */
function SignatureQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={scaleInVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="
        relative
        mx-auto max-w-3xl
        my-16 lg:my-24
        px-8 lg:px-16 py-12 lg:py-16
        rounded-3xl
        glass-panel
        border border-white/[0.07]
        text-center
        overflow-hidden
      "
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(250,67,56,0.07) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Corner brackets */}
      {[
        "absolute top-5 left-5 w-6 h-6 border-t border-l border-envoy-red/40",
        "absolute top-5 right-5 w-6 h-6 border-t border-r border-envoy-red/40",
        "absolute bottom-5 left-5 w-6 h-6 border-b border-l border-envoy-red/40",
        "absolute bottom-5 right-5 w-6 h-6 border-b border-r border-envoy-red/40",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={cls}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.40 + i * 0.08, duration: 0.40 }}
          aria-hidden
        />
      ))}

      {/* Quote icon */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.20, duration: 0.60 }}
        className="flex justify-center mb-8"
      >
        <div className="
          w-12 h-12 rounded-full
          flex items-center justify-center
          bg-envoy-red/10 border border-envoy-red/25
        ">
          <Quote size={18} className="text-envoy-red" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Quote text */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.30, duration: 0.80 }}
        className="
          font-heading text-display-sm text-stone-900
          leading-snug
          mb-6
        "
        style={{ fontWeight: 300, fontStyle: "italic" }}
      >
        {QUOTE.text}
      </motion.blockquote>

      {/* Attribution */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.60 }}
        className="label-text-muted"
      >
        {QUOTE.attribution}
      </motion.p>

      {/* Red underline */}
      <motion.div
        className="mt-8 mx-auto h-px bg-gradient-to-r from-transparent via-envoy-red/50 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: "60%" } : { width: 0 }}
        transition={{ delay: 0.60, duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MISSION METRICS ROW
   ───────────────────────────────────────────────────────────────────────── */
const METRICS = [
  { value: "2009", label: "Founded in Abuja" },
  { value: "138", label: "Suites & Rooms" },
  { value: "60+", label: "Nations Hosted" },
  { value: "L2", label: "Security Certified" },
  { value: "5★", label: "Forbes Rated" },
];

function MetricsRow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="
        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
        gap-px
        bg-white/[0.05]
        rounded-2xl overflow-hidden
        border border-white/[0.06]
        my-16 lg:my-24
      "
    >
      {METRICS.map((metric, i) => (
        <motion.div
          key={metric.label}
          variants={staggerItemVariants}
          className="
            flex flex-col items-center justify-center
            gap-2 py-8 px-4
            bg-white
            text-center
            group
            hover:bg-carbon-elevated
            transition-colors duration-350
            last:col-span-2 sm:last:col-span-1
          "
        >
          <span
            className="
              font-heading text-display-sm text-gradient-red leading-none
              group-hover:scale-105 transition-transform duration-300
            "
            style={{ fontWeight: 800 }}
          >
            {metric.value}
          </span>
          <span className="label-text-muted text-center">{metric.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN STORY SECTION
   ───────────────────────────────────────────────────────────────────────── */
export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px 0px" });

  /* Ambient parallax for the section background */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-[#FAF8F5] overflow-hidden py-24 lg:py-40"
      aria-labelledby="story-heading"
    >
      {/* ── BACKGROUND DECORATIONS ──────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden
      >
        {/* Tactical grid */}
        <div className="absolute inset-0 bg-tactical-grid opacity-20" />

        {/* Radial ambient glow — left */}
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(250,67,56,0.06) 0%, transparent 65%)" }}
        />
        {/* Radial ambient glow — right */}
        <div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(250,67,56,0.04) 0%, transparent 65%)" }}
        />
      </motion.div>

      <div className="section-container relative z-10">

        {/* ── SECTION HEADER ────────────────────────────────────── */}
        <div ref={headerRef} className="max-w-2xl mb-20 lg:mb-32">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -24 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.70, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="h-px bg-envoy-red origin-left"
              initial={{ width: 0 }}
              animate={isHeaderInView ? { width: 32 } : { width: 0 }}
              transition={{ duration: 0.60, ease: [0.77, 0, 0.175, 1] }}
            />
            <span className="label-text">Our Foundation</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="story-heading"
            className="font-heading text-display-lg text-stone-900 mb-6"
            style={{ fontWeight: 800 }}
            initial={{ opacity: 0, y: 36 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.10, duration: 0.90, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            A Legacy{" "}
            <span className="text-gradient-red">Written in</span>
            {" "}Silk & Steel
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="font-body text-base lg:text-lg text-stone-500 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.20, duration: 0.80, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Envoy Hotel was built not just to provide accommodation, but to embody a philosophy:
            that every great exchange — whether of trade, of ideas, or of trust — begins at a table
            where both parties feel safe. We are that table.
          </motion.p>
        </div>

        {/* ── HERITAGE PILLARS ──────────────────────────────────── */}
        <div className="space-y-0">
          {HERITAGE_PILLARS.map((pillar, index) => (
            <div key={pillar.number}>
              <HeritagePillar pillar={pillar} index={index} />
              {index < HERITAGE_PILLARS.length - 1 && <TimelineConnector />}
            </div>
          ))}
        </div>

        {/* ── METRICS ───────────────────────────────────────────── */}
        <MetricsRow />

        {/* ── SIGNATURE QUOTE ───────────────────────────────────── */}
        <SignatureQuote />

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <RevealOnScroll className="text-center">
          <p className="label-text-muted mb-6">
            Experience the living legacy — in every detail of your stay
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              Explore Our Spaces
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/theenvoyabuja/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost"
            >
              View Gallery
            </motion.a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}