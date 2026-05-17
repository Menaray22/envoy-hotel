"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
    href: "https://www.instagram.com/theenvoyabuja/",
    handle: "@theenvoyabuja",
  },
  {
    label: "Facebook",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    href: "https://www.facebook.com/theenvoyabuja",
    handle: "The Envoy Abuja",
  },
  {
    label: "LinkedIn",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    href: "https://www.linkedin.com/company/theenvoyabuja",
    handle: "The Envoy Hotel",
  },
];

const PROTOCOL_LINKS = [
  { label: "Reservation Policy", href: "#" },
  { label: "Privacy & Data Protection", href: "#" },
  { label: "Security Protocol", href: "#" },
  { label: "Diplomatic Concierge Terms", href: "#" },
  { label: "Force Majeure Policy", href: "#" },
];

const NAV_LINKS = [
  { section: "Suites", items: ["Diplomatic Presidential", "Ambassador Suite", "Envoy Grand", "Envoy Classic", "Long Stay"] },
  { section: "Experiences", items: ["Larai Restaurant", "The Terrace Bar", "Poolside Oasis", "Spa & Wellness", "In-Suite Dining"] },
  { section: "Corporate", items: ["Meeting Facilities", "Security Programme", "Executive Transfers", "Protocol Services", "Event Hosting"] },
  { section: "The Envoy", items: ["Our Story", "Silk Road Heritage", "Envoy Coin", "Careers", "Press & Media"] },
];

/* ─────────────────────────────────────────────────────────────────────────
   ENVOY COIN LOGO (footer version)
   ───────────────────────────────────────────────────────────────────────── */
function FooterLogo() {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Emblem + wordmark */}
      <div className="flex items-center gap-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22.5" stroke="#FA4338" strokeWidth="1.5" opacity="0.50" />
          <circle cx="24" cy="24" r="17" stroke="#FA4338" strokeWidth="0.75" opacity="0.25" />
          <circle cx="24" cy="24" r="12" fill="#FA4338" opacity="0.08" />
          <text x="24" y="29" textAnchor="middle" fill="#FA4338" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="800" letterSpacing="-0.5">E</text>
          <line x1="24" y1="1.5" x2="24" y2="6" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <line x1="24" y1="42" x2="24" y2="46.5" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <line x1="1.5" y1="24" x2="6" y2="24" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <line x1="42" y1="24" x2="46.5" y2="24" stroke="#FA4338" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-heading text-stone-900 tracking-[0.20em] uppercase" style={{ fontSize: "1.125rem", fontWeight: 800 }}>
            The Envoy
          </span>
          <span className="font-heading text-muted tracking-[0.28em] uppercase" style={{ fontSize: "0.5625rem", fontWeight: 600 }}>
            Hotel · Abuja
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="font-body text-sm text-muted leading-relaxed max-w-[260px]">
        Abuja's diplomatic sanctuary. Where nations meet and trust is forged.
      </p>

      {/* Security badge */}
      <div className="security-badge">
        <Shield size={9} strokeWidth={2.5} />
        DSS Level 2 Certified
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-3 mt-1">
        {SOCIAL_LINKS.map(s => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-9 h-9 rounded-xl
              flex items-center justify-center
              bg-white/[0.04] border border-white/[0.07]
              text-muted hover:text-stone-900 hover:bg-white/[0.08] hover:border-envoy-red/25
              transition-all duration-250
            "
            aria-label={`Follow us on ${s.label}`}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   NEWSLETTER / CONTACT CTA STRIP
   ───────────────────────────────────────────────────────────────────────── */
function ContactStrip({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.80 }}
      className="
        relative overflow-hidden
        rounded-2xl
        p-8 lg:p-10
        mb-16 lg:mb-20
      "
      style={{
        background: "linear-gradient(135deg, rgba(250,67,56,0.12) 0%, rgba(20,23,31,0.95) 60%, rgba(20,23,31,0.98) 100%)",
        border: "1px solid rgba(250,67,56,0.20)",
        boxShadow: "0 0 0 1px rgba(250,67,56,0.10), 0 20px 60px rgba(0,0,0,0.40)",
      }}
    >
      {/* Tactical grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-[0.20] pointer-events-none" aria-hidden />
      {/* Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(250,67,56,0.10) 0%, transparent 60%)" }} aria-hidden />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <p className="label-text mb-2">Direct Reservations</p>
          <h3 className="font-heading text-display-sm text-stone-900 mb-2" style={{ fontWeight: 800 }}>
            Speak With Our <span className="text-gradient-red">Diplomatic Concierge</span>
          </h3>
          <p className="font-body text-sm text-stone-500 max-w-md">
            For bespoke arrangements, diplomatic protocol requests, and VIP bookings requiring personal attention — our concierge team is available around the clock.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a href="tel:+234000000000" className="btn-primary whitespace-nowrap">
            <Phone size={14} strokeWidth={2} />
            Call Direct
          </a>
          <a href="mailto:reservations@theenvoyabuja.com" className="btn-ghost whitespace-nowrap">
            <Mail size={14} strokeWidth={2} />
            Email Us
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN FOOTER
   ───────────────────────────────────────────────────────────────────────── */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px 0px" });

  const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  transition: { delay: 0.10 + i * 0.06, duration: 0.70 },
});
  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-[#FAF8F5]er border-t border-white/[0.05] overflow-hidden"
      aria-label="Site footer"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-tactical-grid opacity-[0.12]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(250,67,56,0.05) 0%, transparent 65%)" }} />
      </div>

      {/* Top red accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-envoy-red/50 to-transparent" />

      <div className="section-container relative z-10 pt-16 lg:pt-24 pb-8">

        {/* ── CONTACT STRIP ─────────────────────────────────────── */}
        <ContactStrip isInView={isInView} />

        {/* ── MAIN FOOTER GRID ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-white/[0.05]">

          {/* Logo column — takes 2 cols on lg */}
          <motion.div className="sm:col-span-2 lg:col-span-2" {...staggerItem(0)}>
            <FooterLogo />
          </motion.div>

          {/* Nav link columns */}
          {NAV_LINKS.map((col, i) => (
            <motion.div key={col.section} className="lg:col-span-1" {...staggerItem(i + 1)}>
              <h4 className="font-heading text-[0.7rem] uppercase tracking-[0.18em] text-muted mb-4" style={{ fontWeight: 700 }}>
                {col.section}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a
                      href="https://www.instagram.com/theenvoyabuja/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        font-body text-sm text-muted
                        hover:text-stone-900
                        transition-colors duration-200
                        flex items-center gap-1.5
                        group
                      "
                    >
                      <span className="
                        w-0 overflow-hidden group-hover:w-2
                        transition-all duration-250
                        text-envoy-red
                        flex-shrink-0
                      ">
                        <ArrowRight size={10} strokeWidth={2.5} />
                      </span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── CONTACT INFO ROW ──────────────────────────────────── */}
        <motion.div
          {...staggerItem(6)}
          className="
            grid grid-cols-1 sm:grid-cols-3 gap-6
            py-10 border-b border-white/[0.05]
          "
        >
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-envoy-red/10 border border-envoy-red/20 flex-shrink-0 mt-0.5">
              <MapPin size={14} className="text-envoy-red" strokeWidth={2} />
            </div>
            <div>
              <p className="label-text mb-1.5">Location</p>
              <p className="font-body text-sm text-stone-500 leading-relaxed">
                Plot 1234, Diplomatic Drive<br />
                Maitama District, Abuja<br />
                FCT, Nigeria
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-envoy-red/10 border border-envoy-red/20 flex-shrink-0 mt-0.5">
              <Phone size={14} className="text-envoy-red" strokeWidth={2} />
            </div>
            <div>
              <p className="label-text mb-1.5">Reservations</p>
              <a href="tel:+234000000000" className="font-body text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200 block">
                +234 000 000 0000
              </a>
              <a href="tel:+234000000001" className="font-body text-sm text-muted hover:text-stone-500 transition-colors duration-200 block mt-0.5">
                +234 000 000 0001
              </a>
              <p className="label-text-muted mt-1">Available 24 / 7</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-envoy-red/10 border border-envoy-red/20 flex-shrink-0 mt-0.5">
              <Mail size={14} className="text-envoy-red" strokeWidth={2} />
            </div>
            <div>
              <p className="label-text mb-1.5">Email</p>
              <a href="mailto:reservations@theenvoyabuja.com"
                className="font-body text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200 block">
                reservations@theenvoyabuja.com
              </a>
              <a href="mailto:protocol@theenvoyabuja.com"
                className="font-body text-sm text-muted hover:text-stone-500 transition-colors duration-200 block mt-0.5">
                protocol@theenvoyabuja.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── PROTOCOL LINKS ────────────────────────────────────── */}
        <motion.div
          {...staggerItem(7)}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 py-6 border-b border-white/[0.04]"
        >
          {PROTOCOL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="
                font-body text-[0.75rem] text-muted hover:text-stone-500
                transition-colors duration-200
                flex items-center gap-1
                group
              "
            >
              {link.label}
              <ExternalLink size={10} strokeWidth={2} className="opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
            </a>
          ))}
        </motion.div>

        {/* ── BOTTOM BAR ────────────────────────────────────────── */}
        <motion.div
          {...staggerItem(8)}
          className="
            flex flex-col sm:flex-row items-center justify-between
            gap-4 pt-7
          "
        >
          {/* Copyright */}
          <p className="font-body text-[0.75rem] text-muted text-center sm:text-left">
            © {new Date().getFullYear()} The Envoy Hotel Abuja. All rights reserved.
            <span className="mx-2 text-white/20">·</span>
            Crafted with intention in Abuja, FCT.
          </p>

          {/* Coordinates + classification */}
          <div className="flex items-center gap-4">
            <span className="coord-text">09°03′28″N · 07°29′42″E</span>
            <div className="w-px h-3 bg-white/10" aria-hidden />
            <div className="security-badge !text-[0.5rem]">
              CLASSIFIED · DIPLOMATIC
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}