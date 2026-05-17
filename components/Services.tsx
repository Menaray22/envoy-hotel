"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  UtensilsCrossed,
  Waves,
  ArrowRight,
  Star,
  Lock,
  Clock,
  Users,
  ChevronRight,
  Wifi,
  Car,
  Camera,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES & DATA
   ───────────────────────────────────────────────────────────────────────── */
const INSTAGRAM_URL = "https://www.instagram.com/theenvoyabuja/";

const BENTO_DATA = [
  {
    id: "suites",
    label: "Accommodation",
    title: "Diplomatic VIP Suites",
    subtitle: "Presidential · Ambassador · Grand",
    description:
      "Every suite is a secure sanctuary designed for heads of state, C-suite executives, and discerning travellers who require absolute privacy — with butler service, encrypted Wi-Fi, and bespoke minibar curation.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=88&auto=format&fit=crop",
    imageAlt: "Diplomatic VIP suite interior with panoramic city views",
    href: INSTAGRAM_URL,
    tag: "Flagship",
    stat: { value: "138", label: "Suites" },
    features: [
      { icon: <Lock size={12} />, text: "Encrypted suite access" },
      { icon: <Clock size={12} />, text: "24-hr private butler" },
      { icon: <Wifi size={12} />, text: "Secure VPN Wi-Fi" },
    ],
    isFeature: true,
  },
  {
    id: "dining",
    label: "Culinary",
    title: "Larai Restaurant",
    subtitle: "Contemporary West African Cuisine",
    description:
      "Head Chef Emeka Okafor fuses seasonal West African ingredients with classical French technique in an atmosphere of quiet distinction.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=88&auto=format&fit=crop",
    imageAlt: "Larai Restaurant elegant table setting",
    href: INSTAGRAM_URL,
    tag: "Award Winning",
    stat: { value: "80", label: "Covers" },
    features: [
      { icon: <UtensilsCrossed size={12} />, text: "Chef's tasting menu" },
      { icon: <Clock size={12} />, text: "Dinner: 6pm – midnight" },
      { icon: <Users size={12} />, text: "Private dining available" },
    ],
    isFeature: false,
  },
  {
    id: "pool",
    label: "Wellness",
    title: "The Poolside Oasis",
    subtitle: "Infinity Pool · Cabanas · Spa",
    description:
      "A rooftop infinity edge pool with uninterrupted views of the Abuja skyline. Private cabanas, a full-service spa, and a dedicated poolside menu from Larai's kitchen.",
    image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=900&q=88&auto=format&fit=crop",
    imageAlt: "Rooftop infinity pool",
    href: INSTAGRAM_URL,
    tag: null,
    stat: { value: "∞", label: "Horizon" },
    features: [
      { icon: <Waves size={12} />, text: "Infinity edge pool" },
      { icon: <Clock size={12} />, text: "Open 7am – 10pm" },
      { icon: <Car size={12} />, text: "Cabana reservations" },
    ],
    isFeature: false,
  },
  {
    id: "security",
    label: "Corporate · Security",
    title: "Level 2 Certified Security",
    subtitle: "Corporate Security Programme",
    description:
      "The only hotel in Abuja's FCT with DSS-recognised Level 2 Security Certification. Protocol suites, secure conference facilities with RF shielding, and a vetted diplomatic concierge team on every floor.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=88&auto=format&fit=crop",
    imageAlt: "Secure corporate conference facility",
    href: INSTAGRAM_URL,
    tag: "Certified",
    stat: { value: "L2", label: "DSS Security" },
    features: [
      { icon: <Shield size={12} />, text: "DSS Level 2 Certified" },
      { icon: <Camera size={12} />, text: "360° CCTV monitoring" },
      { icon: <Lock size={12} />, text: "RF-shielded boardrooms" },
    ],
    isFeature: false,
    isWide: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const cellVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.10, duration: 0.80 },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   GLASS TAG
   ───────────────────────────────────────────────────────────────────────── */
function GlassTag({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <span className="
      inline-flex items-center gap-1.5 px-2.5 py-1.5
      rounded-full bg-[#FAF8F5]er/75 backdrop-blur-sm
      border border-white/[0.12]
      font-heading text-[0.6rem] uppercase tracking-[0.14em] text-stone-900
      shadow-glass whitespace-nowrap
    " style={{ fontWeight: 700 }}>
      {icon && <span className="text-envoy-red">{icon}</span>}
      {text}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FEATURE CELL (Suites — tall left column)
   ───────────────────────────────────────────────────────────────────────── */
function FeatureCell({ cell, index, isInView }: { cell: typeof BENTO_DATA[0]; index: number; isInView: boolean }) {
  return (
    <motion.article
      custom={index}
      variants={cellVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bento-cell relative overflow-hidden group h-full min-h-[520px]"
      aria-label={cell.title}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] will-change-transform"
          style={{ backgroundImage: `url("${cell.image}")`, backgroundSize: "cover", backgroundPosition: "center" }}
          role="img" aria-label={cell.imageAlt}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-carbon-darker/97 via-carbon-darker/60 to-carbon-darker/15 group-hover:from-carbon-darker/99 transition-all duration-500" aria-hidden />

      {/* Red glow on hover */}
      <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(250,67,56,0.09) 0%, transparent 60%)" }} aria-hidden />

      {/* Tactical corners */}
      {["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2", "bottom-4 right-4 border-b-2 border-r-2"].map((cls, i) => (
        <motion.div key={i} className={`absolute w-5 h-5 ${cls} border-envoy-red/60 rounded-none`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.50 + i * 0.08 }} aria-hidden />
      ))}

      {/* Content */}
      <div className="relative z-[10] flex flex-col justify-between h-full p-7 lg:p-8">
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="label-text-muted">{cell.label}</span>
          {cell.tag && <GlassTag icon={<Star size={10} strokeWidth={2.5} />} text={cell.tag} />}
        </div>

        {/* Bottom */}
        <div>
          {/* Stat */}
          <div className="mb-4">
            <span className="font-heading text-5xl text-gradient-red leading-none" style={{ fontWeight: 800 }}>
              {cell.stat.value}
            </span>
            <span className="label-text-muted ml-2">{cell.stat.label}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-display-md text-stone-900 mb-2 leading-tight" style={{ fontWeight: 800 }}>
            {cell.title}
          </h3>
          <p className="label-text-muted mb-4">{cell.subtitle}</p>

          {/* Description */}
          <p className="font-body text-sm text-stone-500 leading-relaxed mb-6 max-w-sm">
            {cell.description}
          </p>

          {/* Features */}
          <ul className="flex flex-col gap-2 mb-6">
            {cell.features.map(f => (
              <li key={f.text} className="flex items-center gap-2">
                <span className="text-envoy-red flex-shrink-0">{f.icon}</span>
                <span className="font-body text-[0.75rem] text-stone-500">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href={cell.href} target="_blank" rel="noopener noreferrer"
            className="btn-primary !py-3 !px-5 text-[0.75rem]" aria-label={`Reserve a ${cell.title}`}>
            Reserve a Suite
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 z-[3] rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(250,67,56,0.20)" }} aria-hidden />
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   STANDARD CELL (Dining, Pool, Security)
   ───────────────────────────────────────────────────────────────────────── */
function StandardCell({ cell, index, isInView }: { cell: typeof BENTO_DATA[1]; index: number; isInView: boolean }) {
  const isWide = (cell as any).isWide;

  return (
    <motion.article
      custom={index}
      variants={cellVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bento-cell relative overflow-hidden group min-h-[280px]"
      aria-label={cell.title}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07] will-change-transform"
          style={{ backgroundImage: `url("${cell.image}")`, backgroundSize: "cover", backgroundPosition: "center" }}
          role="img" aria-label={cell.imageAlt}
        />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-carbon-darker/97 via-carbon-darker/55 to-carbon-darker/20 group-hover:via-carbon-darker/70 transition-all duration-500" aria-hidden />

      {/* Accent glow on hover */}
      <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(250,67,56,0.08) 0%, transparent 55%)" }} aria-hidden />

      {/* Security scan line */}
      {cell.id === "security" && (
        <div className="absolute inset-0 z-[4] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 scan-line-container" aria-hidden />
      )}

      {/* Content */}
      <div className="relative z-[10] flex flex-col justify-between h-full p-6">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <span className="label-text-muted">{cell.label}</span>
          {cell.tag && (
            <GlassTag
              icon={cell.id === "security" ? <Shield size={10} strokeWidth={2.5} /> : <Star size={10} strokeWidth={2.5} />}
              text={cell.tag}
            />
          )}
        </div>

        {/* Bottom */}
        <div className="mt-auto">
          {/* Stat — slides in on hover */}
          <div className="mb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            <span className="font-heading text-4xl text-gradient-red leading-none" style={{ fontWeight: 800 }}>
              {cell.stat.value}
            </span>
            <span className="label-text-muted ml-2">{cell.stat.label}</span>
          </div>

          {/* Title */}
          <h3 className={`font-heading text-stone-900 mb-1.5 leading-tight ${isWide ? "text-display-sm" : "text-xl"}`} style={{ fontWeight: 800 }}>
            {cell.title}
          </h3>
          <p className="label-text-muted mb-3">{cell.subtitle}</p>

          {/* Description — slides up on hover */}
          <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 group-hover:mb-4">
            <p className={`font-body text-sm text-stone-500 leading-relaxed ${isWide ? "max-w-lg" : "max-w-xs"}`}>
              {cell.description}
            </p>
          </div>

          {/* Glass tags — slide up on hover */}
          <div className="flex flex-wrap gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75 mb-4">
            {cell.features.map(f => (
              <GlassTag key={f.text} icon={f.icon} text={f.text} />
            ))}
          </div>

          {/* CTA */}
          <a
            href={cell.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heading text-[0.7rem] uppercase tracking-[0.14em] text-envoy-red opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 group/link"
            style={{ fontWeight: 700 }}
            onClick={e => e.stopPropagation()}
          >
            Explore
            <ChevronRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Border glow */}
      <div className="absolute inset-0 z-[3] rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(250,67,56,0.18)" }} aria-hidden />
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SERVICES SECTION
   ───────────────────────────────────────────────────────────────────────── */
export default function Services() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px 0px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="services"
      className="relative bg-[#FAF8F5]er py-24 lg:py-40 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-tactical-grid opacity-[0.15]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(250,67,56,0.06) 0%, transparent 55%)" }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px]"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(250,67,56,0.04) 0%, transparent 55%)" }} />
      </div>

      <div className="section-container relative z-10">

        {/* Section header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-xl">
            <motion.div className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -24 }} animate={isHeaderInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.70 }}>
              <motion.div className="h-px bg-envoy-red origin-left"
                initial={{ width: 0 }} animate={isHeaderInView ? { width: 32 } : { width: 0 }} transition={{ duration: 0.60 }} />
              <span className="label-text">Our Pillars</span>
            </motion.div>
            <motion.h2 id="services-heading" className="font-heading text-display-lg text-stone-900" style={{ fontWeight: 800 }}
              initial={{ opacity: 0, y: 30 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.10, duration: 0.85 }}>
              Four{" "}<span className="text-gradient-red">Pillars</span>{" "}of Excellence
            </motion.h2>
          </div>

          <motion.div className="max-w-sm"
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.20, duration: 0.80 }}>
            <p className="font-body text-sm text-stone-500 leading-relaxed mb-5">
              From the diplomatic seclusion of our VIP suites to the vibrant artistry of Larai Restaurant — every space within The Envoy is a world unto itself.
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-red !py-2.5 !px-5 text-xs">
              View All Experiences
              <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>

        {/* Bento grid
            Desktop layout:
            ┌──────────────┬────────────┐
            │              │  Dining    │
            │   Suites     ├────────────┤
            │  (tall)      │  Pool      │
            ├──────────────┴────────────┤
            │     Security (wide)       │
            └───────────────────────────┘
        */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* SUITES — feature, spans 2 rows on desktop */}
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <FeatureCell cell={BENTO_DATA[0]} index={0} isInView={isGridInView} />
          </div>

          {/* DINING */}
          <div className="lg:col-span-1">
            <StandardCell cell={BENTO_DATA[1] as any} index={1} isInView={isGridInView} />
          </div>

          {/* POOL */}
          <div className="lg:col-span-1">
            <StandardCell cell={BENTO_DATA[2] as any} index={2} isInView={isGridInView} />
          </div>

          {/* SECURITY — wide, spans 2 cols on sm+ */}
          <div className="sm:col-span-2">
            <StandardCell cell={BENTO_DATA[3] as any} index={3} isInView={isGridInView} />
          </div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={isGridInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55, duration: 0.70 }}
          className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-7 border-t border-b border-white/[0.05]"
        >
          {[
            { icon: <Shield size={14} />, text: "DSS Level 2 Security" },
            { icon: <Star size={14} />, text: "Forbes Five-Star Rated" },
            { icon: <Users size={14} />, text: "60+ Nations Hosted" },
            { icon: <Clock size={14} />, text: "24-Hour Concierge" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className="text-envoy-red">{item.icon}</span>
              <span className="font-heading text-[0.75rem] uppercase tracking-[0.12em] text-stone-500" style={{ fontWeight: 600 }}>
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}