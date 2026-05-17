"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES & CONSTANTS
   ───────────────────────────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Suites",
    href: "#suites",
    children: [
      { label: "Diplomatic Suite", href: "#suites", description: "Our flagship presidential floor" },
      { label: "Ambassador Suite", href: "#suites", description: "Panoramic views of Abuja skyline" },
      { label: "Envoy Classic", href: "#suites", description: "Refined comfort for the discerning" },
    ],
  },
  {
    label: "Dining",
    href: "#services",
    children: [
      { label: "Larai Restaurant", href: "#services", description: "Contemporary West African cuisine" },
      { label: "The Terrace Bar", href: "#services", description: "Sunset cocktails & private events" },
      { label: "In-Suite Dining", href: "#services", description: "24-hour private butler service" },
    ],
  },
  { label: "Pool & Wellness", href: "#services" },
  { label: "Meetings", href: "#services" },
  { label: "Our Story", href: "#story" },
];

/* ─────────────────────────────────────────────────────────────────────────
   FRAMER MOTION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const mobileMenuVariants = {
  closed: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.45 },
  },
  open: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.55 },
  },
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.45 },
  }),
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.18, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28 },
  },
};

const hamburgerLineVariants = {
  closed: { rotate: 0, y: 0, opacity: 1 },
  open: { rotate: 45, y: 8, opacity: 1 },
};
const hamburgerMidVariants = {
  closed: { opacity: 1, x: 0 },
  open: { opacity: 0, x: -8 },
};
const hamburgerBottomVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

/* ─────────────────────────────────────────────────────────────────────────
   LOGO COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
function EnvoyLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Envoy Coin / Emblem SVG */}
      <div className="relative flex-shrink-0">
        <svg
          width={compact ? 36 : 42}
          height={compact ? 36 : 42}
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          {/* Outer ring */}
          <circle cx="21" cy="21" r="20" stroke="#FA4338" strokeWidth="1.5" opacity="0.6" />
          {/* Inner ring */}
          <circle cx="21" cy="21" r="15.5" stroke="#FA4338" strokeWidth="0.75" opacity="0.3" />
          {/* Center medallion */}
          <circle cx="21" cy="21" r="11" fill="#FA4338" opacity="0.10" />
          {/* E monogram paths */}
          <text
            x="21"
            y="26"
            textAnchor="middle"
            fill="#FA4338"
            fontSize="14"
            fontFamily="Montserrat, sans-serif"
            fontWeight="800"
            letterSpacing="-0.5"
          >
            E
          </text>
          {/* Corner tick marks */}
          <line x1="21" y1="1" x2="21" y2="5" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="21" y1="37" x2="21" y2="41" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="1" y1="21" x2="5" y2="21" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="37" y1="21" x2="41" y2="21" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
        {/* Pulse ring on the logo */}
        <span className="absolute inset-0 rounded-full border border-envoy-red/20 animate-pulse-glow pointer-events-none" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-800 text-stone-900 tracking-[0.20em] uppercase"
          style={{ fontSize: compact ? "0.875rem" : "1rem", fontWeight: 800 }}
        >
          The Envoy
        </span>
        <span
          className="font-heading text-muted tracking-[0.30em] uppercase"
          style={{ fontSize: compact ? "0.5rem" : "0.5625rem", fontWeight: 600, letterSpacing: "0.30em" }}
        >
          Hotel · Abuja
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DESKTOP DROPDOWN ITEM
   ───────────────────────────────────────────────────────────────────────── */
function DesktopNavItem({ link }: { link: NavLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 120);
  };

  if (!link.children) {
    return (
      <a
        href={link.href}
        className="
          relative
          font-heading text-[0.75rem] font-600 uppercase tracking-[0.14em]
          text-muted hover:text-stone-900
          transition-colors duration-250
          group
        "
        style={{ fontWeight: 600 }}
      >
        {link.label}
        <span className="
          absolute -bottom-1 left-0 w-0 h-[1px]
          bg-envoy-red
          transition-all duration-350 ease-out
          group-hover:w-full
        " />
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="
          flex items-center gap-1
          font-heading text-[0.75rem] font-600 uppercase tracking-[0.14em]
          text-muted hover:text-stone-900
          transition-colors duration-250
          group
        "
        style={{ fontWeight: 600 }}
        aria-expanded={isOpen}
      >
        {link.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={12} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="
              absolute top-full left-1/2 -translate-x-1/2
              mt-4 w-64
              glass-panel-heavy
              rounded-[14px]
              overflow-hidden
              z-nav
            "
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Dropdown header bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-envoy-red/60 to-transparent" />

            <div className="p-2">
              {link.children.map((child, i) => (
                <a
                  key={child.label}
                  href={child.href}
                  className="
                    flex flex-col gap-0.5
                    px-3 py-2.5
                    rounded-[10px]
                    hover:bg-white/[0.05]
                    transition-colors duration-200
                    group/item
                  "
                  onClick={() => setIsOpen(false)}
                >
                  <span className="
                    font-heading text-[0.75rem] font-600 uppercase tracking-[0.12em]
                    text-stone-900/90 group-hover/item:text-stone-900
                    transition-colors duration-200
                  " style={{ fontWeight: 600 }}>
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="
                      font-body text-[0.6875rem]
                      text-muted group-hover/item:text-stone-500
                      transition-colors duration-200
                    ">
                      {child.description}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN NAVBAR COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Scroll detection */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    setIsScrolled(scrollY > 60);
    setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

    // Active section detection
    const sections = ["hero", "suites", "story", "services", "video", "contact"];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 120) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── MAIN NAVBAR ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.80, delay: 0.10 }}
        className={`
          fixed top-0 left-0 right-0 z-nav
          transition-all duration-500
          ${isScrolled
            ? "py-3"
            : "py-5"
          }
        `}
        role="banner"
      >
        {/* Glass background — appears on scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.40 }}
          aria-hidden
        >
          <div className="
            absolute inset-0
            bg-[#FAF8F5]er/85
            backdrop-blur-glass
            saturate-150
            border-b border-white/[0.06]
            shadow-glass
          " />
          {/* Red accent line at very bottom of navbar */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-envoy-red/40 to-transparent" />
        </motion.div>

        <nav
          className="section-container relative flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── LOGO ─────────────────────────────────────────────── */}
          <a
            href="#hero"
            className="relative z-10 transition-opacity duration-200 hover:opacity-85"
            aria-label="The Envoy Hotel — Home"
          >
            <EnvoyLogo compact={isScrolled} />
          </a>

          {/* ── DESKTOP NAV LINKS ─────────────────────────────────── */}
          <div
            className="hidden lg:flex items-center gap-8"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.label} role="listitem">
                <DesktopNavItem link={link} />
              </div>
            ))}
          </div>

          {/* ── DESKTOP RIGHT ACTIONS ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+234000000000"
              className="
                flex items-center gap-2
                font-heading text-[0.7rem] font-600 uppercase tracking-[0.14em]
                text-muted hover:text-stone-900
                transition-colors duration-250
              "
              style={{ fontWeight: 600 }}
              aria-label="Call The Envoy Hotel"
            >
              <Phone size={13} strokeWidth={2} />
              <span className="hidden xl:block">Reservations</span>
            </a>

            {/* Divider */}
            <div className="w-px h-4 bg-white/10" aria-hidden />

            {/* Book Now CTA */}
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="
                btn-primary
                !py-2.5 !px-5
                text-[0.7rem]
              "
              aria-label="Book your stay at The Envoy"
            >
              <span>Book Now</span>
              {/* Shimmer overlay */}
              <span className="
                absolute inset-0 rounded
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                -translate-x-full
                group-hover:translate-x-full
                transition-transform duration-700
              " aria-hidden />
            </motion.a>
          </div>

          {/* ── MOBILE: Right actions (Instagram + Hamburger) ──── */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://www.instagram.com/theenvoyabuja/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full
                text-muted hover:text-stone-900
                hover:bg-white/[0.06]
                transition-all duration-250
              "
              aria-label="Follow The Envoy on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>

            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="
                relative w-10 h-10
                flex flex-col items-center justify-center gap-[6px]
                rounded-lg
                hover:bg-white/[0.06]
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-envoy-red/50
              "
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                variants={hamburgerLineVariants}
                animate={isMobileOpen ? "open" : "closed"}
                transition={{ duration: 0.30 }}
                className="block w-5 h-[1.5px] bg-arctic rounded-full origin-center"
              />
              <motion.span
                variants={hamburgerMidVariants}
                animate={isMobileOpen ? "open" : "closed"}
                transition={{ duration: 0.20 }}
                className="block w-4 h-[1.5px] bg-muted rounded-full self-end mr-0.5"
              />
              <motion.span
                variants={hamburgerBottomVariants}
                animate={isMobileOpen ? "open" : "closed"}
                transition={{ duration: 0.30 }}
                className="block w-5 h-[1.5px] bg-arctic rounded-full origin-center"
              />
            </button>
          </div>
        </nav>

        {/* ── SCROLL PROGRESS BAR ──────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-envoy-red/60 transition-all duration-100 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </motion.header>

      {/* ── MOBILE MENU OVERLAY ──────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[45] bg-[#FAF8F5]er/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="
                fixed top-0 left-0 right-0 z-[48]
                pt-24 pb-8 px-6
                bg-[#FAF8F5]er/96
                backdrop-blur-glass-lg
                border-b border-white/[0.06]
                lg:hidden
                overflow-y-auto
                max-h-screen
              "
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Tactical grid overlay */}
              <div className="absolute inset-0 bg-tactical-grid bg-tactical-grid opacity-30 pointer-events-none" aria-hidden />

              {/* Red gradient edge */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-envoy-red/60 to-transparent" aria-hidden />

              {/* Navigation items */}
              <nav className="relative z-10" aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      custom={i}
                      variants={mobileNavItemVariants}
                      initial="closed"
                      animate="open"
                      role="listitem"
                    >
                      <a
                        href={link.href}
                        className="
                          flex items-center justify-between
                          py-4 px-4
                          rounded-xl
                          font-heading text-base uppercase tracking-[0.16em]
                          text-stone-900/80 hover:text-stone-900
                          hover:bg-white/[0.05]
                          border border-transparent hover:border-white/[0.06]
                          transition-all duration-250
                          group
                        "
                        style={{ fontWeight: 700 }}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <span>{link.label}</span>
                        <span className="
                          w-6 h-6 rounded-full
                          flex items-center justify-center
                          bg-envoy-red/0 group-hover:bg-envoy-red/10
                          transition-colors duration-250
                        ">
                          <ChevronDown
                            size={14}
                            className="-rotate-90 text-envoy-red opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                          />
                        </span>
                      </a>

                      {/* Mobile sub-items */}
                      {link.children && (
                        <ul className="pl-4 mt-1 space-y-0.5 border-l border-envoy-red/20 ml-4" role="list">
                          {link.children.map((child) => (
                            <li key={child.label} role="listitem">
                              <a
                                href={child.href}
                                className="
                                  block py-2.5 px-3
                                  font-body text-sm
                                  text-muted hover:text-stone-900
                                  hover:bg-white/[0.04] rounded-lg
                                  transition-all duration-200
                                "
                                onClick={() => setIsMobileOpen(false)}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile CTA section */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={mobileNavItemVariants}
                  initial="closed"
                  animate="open"
                  className="mt-8 space-y-3"
                >
                  <div className="h-px bg-white/[0.06]" />

                  {/* Coordinates / classification text */}
                  <div className="flex items-center justify-between px-1">
                    <span className="coord-text">09°03′28″N · 07°29′42″E</span>
                    <span className="security-badge">SEC LVL-2</span>
                  </div>

                  <a
                    href="#booking"
                    className="btn-primary w-full justify-center text-sm"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Reserve Your Suite
                  </a>

                  <div className="flex items-center justify-center gap-6 pt-2">
                    <a
                      href="https://www.instagram.com/theenvoyabuja/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-2
                        font-heading text-[0.7rem] uppercase tracking-[0.14em]
                        text-muted hover:text-envoy-red
                        transition-colors duration-250
                      "
                      style={{ fontWeight: 600 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                      Instagram
                    </a>
                    <a
                      href="tel:+234000000000"
                      className="
                        flex items-center gap-2
                        font-heading text-[0.7rem] uppercase tracking-[0.14em]
                        text-muted hover:text-stone-900
                        transition-colors duration-250
                      "
                      style={{ fontWeight: 600 }}
                    >
                      <Phone size={14} />
                      Call Us
                    </a>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}