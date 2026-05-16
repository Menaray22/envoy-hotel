"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  ChevronDown,
  Plus,
  Minus,
  Search,
  X,
  Check,
  BedDouble,
  Sparkles,
  Shield,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────── */
type PopoverKey = "checkin" | "checkout" | "guests" | "suite" | null;

interface GuestCount {
  adults: number;
  children: number;
  rooms: number;
}

interface SuiteOption {
  id: string;
  name: string;
  shortDesc: string;
  priceFrom: string;
  tag?: string;
  icon: React.ReactNode;
}

/* ─────────────────────────────────────────────────────────────────────────
   SUITE OPTIONS DATA
   ───────────────────────────────────────────────────────────────────────── */
const SUITE_OPTIONS: SuiteOption[] = [
  {
    id: "diplomatic",
    name: "Diplomatic Presidential",
    shortDesc: "Our flagship floor — maximum privacy",
    priceFrom: "₦480,000",
    tag: "Most Exclusive",
    icon: <Shield size={14} strokeWidth={2} className="text-envoy-red" />,
  },
  {
    id: "ambassador",
    name: "Ambassador Suite",
    shortDesc: "Panoramic Abuja skyline views",
    priceFrom: "₦280,000",
    tag: "Panoramic View",
    icon: <Sparkles size={14} strokeWidth={2} className="text-envoy-red" />,
  },
  {
    id: "envoy-grand",
    name: "Envoy Grand Suite",
    shortDesc: "Spacious luxury for extended stays",
    priceFrom: "₦195,000",
    icon: <BedDouble size={14} strokeWidth={2} className="text-envoy-red" />,
  },
  {
    id: "envoy-classic",
    name: "Envoy Classic Room",
    shortDesc: "Refined comfort, immaculate detail",
    priceFrom: "₦95,000",
    icon: <BedDouble size={14} strokeWidth={2} className="text-muted" />,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   MINI CALENDAR HELPERS
   ───────────────────────────────────────────────────────────────────────── */
function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

/* ─────────────────────────────────────────────────────────────────────────
   POPOVER ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const popoverVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    transition: { duration: 0.20, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.30, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   MINI CALENDAR COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
function MiniCalendar({
  selected,
  minDate,
  onSelect,
}: {
  selected: Date | null;
  minDate?: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = generateCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < todayMidnight) return true;
    if (minDate) {
      const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (d <= min) return true;
    }
    return false;
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    );
  };

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  return (
    <div className="p-4 w-[290px]">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-stone-900 hover:bg-white/[0.07] transition-all duration-200"
          aria-label="Previous month"
        >
          <ChevronDown size={14} className="rotate-90" />
        </button>
        <span className="font-heading text-[0.8125rem] text-stone-900 tracking-[0.06em]" style={{ fontWeight: 700 }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-stone-900 hover:bg-white/[0.07] transition-all duration-200"
          aria-label="Next month"
        >
          <ChevronDown size={14} className="-rotate-90" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center font-heading text-[0.625rem] uppercase tracking-[0.10em] text-muted py-1" style={{ fontWeight: 600 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {day === null ? (
              <div className="w-8 h-8" />
            ) : (
              <button
                onClick={() => !isDisabled(day) && onSelect(new Date(viewYear, viewMonth, day))}
                disabled={isDisabled(day)}
                className={`
                  w-8 h-8 rounded-lg text-[0.8125rem] flex items-center justify-center
                  transition-all duration-150
                  ${isSelected(day)
                    ? "bg-envoy-red text-white shadow-red-glow-sm"
                    : isToday(day)
                    ? "border border-envoy-red/40 text-envoy-red"
                    : isDisabled(day)
                    ? "text-muted/30 cursor-not-allowed"
                    : "text-stone-900/80 hover:bg-white/[0.08] hover:text-stone-900 cursor-pointer"
                  }
                `}
                style={{ fontWeight: isSelected(day) ? 700 : 500 }}
                aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`}
                aria-pressed={isSelected(day)}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GUEST COUNTER ROW
   ───────────────────────────────────────────────────────────────────────── */
function CounterRow({
  label,
  sublabel,
  value,
  min,
  max,
  onIncrement,
  onDecrement,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="font-heading text-[0.8125rem] text-stone-900" style={{ fontWeight: 600 }}>
          {label}
        </p>
        <p className="font-body text-[0.6875rem] text-muted mt-0.5">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.90 }}
          onClick={onDecrement}
          disabled={value <= min}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
            ${value <= min
              ? "border-white/[0.06] text-muted/30 cursor-not-allowed"
              : "border-white/[0.12] text-muted hover:text-stone-900 hover:border-white/25 hover:bg-white/[0.05]"
            }
          `}
          aria-label={`Decrease ${label}`}
        >
          <Minus size={13} strokeWidth={2.5} />
        </motion.button>
        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.20 }}
          className="font-heading text-[1rem] text-stone-900 w-6 text-center tabular-nums"
          style={{ fontWeight: 700 }}
        >
          {value}
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.90 }}
          onClick={onIncrement}
          disabled={value >= max}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
            ${value >= max
              ? "border-white/[0.06] text-muted/30 cursor-not-allowed"
              : "border-envoy-red/30 text-envoy-red hover:border-envoy-red/60 hover:bg-envoy-red/[0.08]"
            }
          `}
          aria-label={`Increase ${label}`}
        >
          <Plus size={13} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BOOKING FIELD BUTTON
   ───────────────────────────────────────────────────────────────────────── */
function BookingField({
  icon,
  label,
  value,
  isActive,
  onClick,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-start gap-1 px-5 py-4 w-full text-left
        transition-all duration-250 group
        ${isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}
        ${className}
      `}
      aria-expanded={isActive}
      aria-haspopup="true"
    >
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-5 right-5 h-[2px] bg-envoy-red rounded-full origin-left"
      />
      <div className="flex items-center gap-1.5">
        <span className={`transition-colors duration-200 ${isActive ? "text-envoy-red" : "text-muted group-hover:text-stone-500"}`}>
          {icon}
        </span>
        <span className="font-heading text-[0.6rem] uppercase tracking-[0.18em] text-muted group-hover:text-stone-500 transition-colors duration-200" style={{ fontWeight: 600 }}>
          {label}
        </span>
      </div>
      <span
        className={`font-heading text-[0.9rem] tracking-[-0.01em] transition-colors duration-200 ${value ? (isActive ? "text-stone-900" : "text-stone-900/90 group-hover:text-stone-900") : "text-muted/50"}`}
        style={{ fontWeight: 600 }}
      >
        {value || "Select"}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN BOOKING BAR
   ───────────────────────────────────────────────────────────────────────── */
export default function BookingBar() {
  const [activePopover, setActivePopover] = useState<PopoverKey>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<GuestCount>({ adults: 2, children: 0, rooms: 1 });
  const [selectedSuite, setSelectedSuite] = useState<SuiteOption | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePopover(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const togglePopover = useCallback((key: PopoverKey) => {
    setActivePopover(prev => (prev === key ? null : key));
  }, []);

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "";

  const guestSummary = [
    `${guests.adults} Adult${guests.adults !== 1 ? "s" : ""}`,
    guests.children > 0 ? `${guests.children} Child${guests.children !== 1 ? "ren" : ""}` : null,
    `${guests.rooms} Room${guests.rooms !== 1 ? "s" : ""}`,
  ].filter(Boolean).join(" · ");

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : null;

  const handleSearch = async () => {
    setActivePopover(null);
    setIsSearching(true);
    setSearchDone(false);
    await new Promise(r => setTimeout(r, 1800));
    setIsSearching(false);
    setSearchDone(true);
    setTimeout(() => setSearchDone(false), 3000);
  };

  return (
    <div id="booking" className="relative z-[20] -mt-16 section-container px-4 lg:px-8 xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.20, duration: 0.80, ease: [0.25, 0.46, 0.45, 0.94] }}
        ref={barRef}
        className="relative rounded-2xl lg:rounded-[20px] overflow-visible"
        style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.55))" }}
      >
        {/* Gradient border */}
        <div
          className="absolute -inset-[1px] rounded-[21px] pointer-events-none z-0"
          style={{ background: "linear-gradient(135deg, rgba(250,67,56,0.35) 0%, rgba(255,255,255,0.06) 45%, rgba(250,67,56,0.15) 100%)" }}
          aria-hidden
        />

        {/* Bar body */}
        <div className="relative z-10 bg-[#FAF8F5]er/95 backdrop-blur-glass-lg rounded-[20px] overflow-hidden">

          {/* Top accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-envoy-red/80 via-envoy-red/40 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="security-badge">Available Now</div>
              <span className="coord-text hidden sm:block">· Check Availability</span>
            </div>
            <AnimatePresence>
              {nights && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-envoy-red/10 border border-envoy-red/20"
                >
                  <span className="font-heading text-[0.7rem] text-envoy-red" style={{ fontWeight: 700 }}>
                    {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1.1fr_auto] lg:divide-x lg:divide-white/[0.05]">

            {/* CHECK IN */}
            <div className="relative border-b border-white/[0.05] lg:border-b-0">
              <BookingField
                icon={<Calendar size={13} strokeWidth={2} />}
                label="Check In"
                value={formatDate(checkIn)}
                isActive={activePopover === "checkin"}
                onClick={() => togglePopover("checkin")}
              />
              <AnimatePresence>
                {activePopover === "checkin" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden" animate="visible" exit="hidden"
                    className="absolute top-full left-0 mt-2 z-50 glass-panel-heavy rounded-2xl overflow-hidden shadow-diplomatic-lg border border-white/[0.07]"
                    role="dialog" aria-label="Select check-in date"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-envoy-red/60 via-envoy-red/30 to-transparent" />
                    <div className="px-1 pt-3 pb-1">
                      <p className="label-text px-3 mb-3">Select Check-in Date</p>
                    </div>
                    <MiniCalendar
                      selected={checkIn}
                      onSelect={d => {
                        setCheckIn(d);
                        if (checkOut && d >= checkOut) setCheckOut(null);
                        setActivePopover("checkout");
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CHECK OUT */}
            <div className="relative border-b border-white/[0.05] lg:border-b-0">
              <BookingField
                icon={<Calendar size={13} strokeWidth={2} />}
                label="Check Out"
                value={formatDate(checkOut)}
                isActive={activePopover === "checkout"}
                onClick={() => togglePopover("checkout")}
              />
              <AnimatePresence>
                {activePopover === "checkout" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden" animate="visible" exit="hidden"
                    className="absolute top-full left-0 mt-2 z-50 glass-panel-heavy rounded-2xl overflow-hidden shadow-diplomatic-lg border border-white/[0.07]"
                    role="dialog" aria-label="Select check-out date"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-envoy-red/60 via-envoy-red/30 to-transparent" />
                    <div className="px-1 pt-3 pb-1">
                      <p className="label-text px-3 mb-3">Select Check-out Date</p>
                    </div>
                    <MiniCalendar
                      selected={checkOut}
                      minDate={checkIn}
                      onSelect={d => {
                        setCheckOut(d);
                        setActivePopover("guests");
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GUESTS */}
            <div className="relative border-b sm:border-b-0 border-white/[0.05]">
              <BookingField
                icon={<Users size={13} strokeWidth={2} />}
                label="Guests & Rooms"
                value={guestSummary}
                isActive={activePopover === "guests"}
                onClick={() => togglePopover("guests")}
              />
              <AnimatePresence>
                {activePopover === "guests" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden" animate="visible" exit="hidden"
                    className="absolute top-full left-0 mt-2 z-50 w-72 glass-panel-heavy rounded-2xl overflow-hidden shadow-diplomatic-lg border border-white/[0.07]"
                    role="dialog" aria-label="Select guests and rooms"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-envoy-red/60 via-envoy-red/30 to-transparent" />
                    <div className="p-5">
                      <p className="label-text mb-4">Guests & Rooms</p>
                      <CounterRow
                        label="Adults" sublabel="Age 13+"
                        value={guests.adults} min={1} max={10}
                        onIncrement={() => setGuests(g => ({ ...g, adults: Math.min(10, g.adults + 1) }))}
                        onDecrement={() => setGuests(g => ({ ...g, adults: Math.max(1, g.adults - 1) }))}
                      />
                      <CounterRow
                        label="Children" sublabel="Ages 2–12"
                        value={guests.children} min={0} max={6}
                        onIncrement={() => setGuests(g => ({ ...g, children: Math.min(6, g.children + 1) }))}
                        onDecrement={() => setGuests(g => ({ ...g, children: Math.max(0, g.children - 1) }))}
                      />
                      <CounterRow
                        label="Rooms" sublabel="Number of rooms"
                        value={guests.rooms} min={1} max={10}
                        onIncrement={() => setGuests(g => ({ ...g, rooms: Math.min(10, g.rooms + 1) }))}
                        onDecrement={() => setGuests(g => ({ ...g, rooms: Math.max(1, g.rooms - 1) }))}
                      />
                      <button
                        onClick={() => setActivePopover("suite")}
                        className="mt-3 w-full btn-ghost !py-2 text-xs justify-center"
                      >
                        Apply & Select Suite
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SUITE TYPE */}
            <div className="relative">
              <BookingField
                icon={<BedDouble size={13} strokeWidth={2} />}
                label="Suite Type"
                value={selectedSuite?.name || ""}
                isActive={activePopover === "suite"}
                onClick={() => togglePopover("suite")}
              />
              <AnimatePresence>
                {activePopover === "suite" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden" animate="visible" exit="hidden"
                    className="absolute top-full right-0 lg:left-0 mt-2 z-50 w-80 glass-panel-heavy rounded-2xl overflow-hidden shadow-diplomatic-lg border border-white/[0.07]"
                    role="dialog" aria-label="Select suite type"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-envoy-red/60 via-envoy-red/30 to-transparent" />
                    <div className="p-4">
                      <p className="label-text mb-3">Select Suite Type</p>
                      <div className="space-y-2">
                        {SUITE_OPTIONS.map(suite => (
                          <button
                            key={suite.id}
                            onClick={() => { setSelectedSuite(suite); setActivePopover(null); }}
                            className={`
                              w-full text-left flex items-start justify-between gap-3 p-3 rounded-xl border
                              transition-all duration-200
                              ${selectedSuite?.id === suite.id
                                ? "bg-envoy-red/10 border-envoy-red/30"
                                : "bg-transparent border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.10]"
                              }
                            `}
                            aria-pressed={selectedSuite?.id === suite.id}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div className="mt-0.5 flex-shrink-0">{suite.icon}</div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-heading text-[0.8rem] text-stone-900" style={{ fontWeight: 600 }}>
                                    {suite.name}
                                  </p>
                                  {suite.tag && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-envoy-red/15 border border-envoy-red/25 font-heading text-[0.5625rem] text-envoy-red uppercase tracking-wider flex-shrink-0" style={{ fontWeight: 700 }}>
                                      {suite.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="font-body text-[0.6875rem] text-muted mt-0.5">
                                  {suite.shortDesc}
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 flex flex-col items-end gap-1">
                              <span className="font-heading text-[0.75rem] text-stone-900 whitespace-nowrap" style={{ fontWeight: 700 }}>
                                {suite.priceFrom}
                              </span>
                              <span className="label-text-muted whitespace-nowrap">/ night</span>
                              {selectedSuite?.id === suite.id && (
                                <Check size={13} className="text-envoy-red" strokeWidth={2.5} />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SEARCH BUTTON */}
            <div className="p-3 flex items-stretch">
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSearching}
                className={`
                  relative flex items-center justify-center gap-2 overflow-hidden
                  w-full lg:w-14 xl:w-auto xl:px-6
                  rounded-xl font-heading text-[0.75rem] uppercase tracking-[0.12em]
                  text-white transition-all duration-300 min-h-[52px]
                  ${searchDone
                    ? "bg-green-600/80"
                    : "bg-envoy-red hover:bg-envoy-red-deep shadow-red-glow-sm hover:shadow-red-glow"
                  }
                `}
                style={{ fontWeight: 700 }}
                aria-label="Check availability"
              >
                <AnimatePresence mode="wait">
                  {isSearching ? (
                    <motion.div key="loading" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <span className="hidden xl:block">Searching</span>
                    </motion.div>
                  ) : searchDone ? (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check size={16} strokeWidth={2.5} />
                      <span className="hidden xl:block">Available!</span>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Search size={16} strokeWidth={2} />
                      <span className="hidden xl:block">Check Availability</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 border-t border-white/[0.04]">
            {[
              { icon: <Check size={11} strokeWidth={2.5} />, text: "Best Rate Guaranteed" },
              { icon: <Shield size={11} strokeWidth={2} />, text: "Secure Booking" },
              { icon: <X size={11} strokeWidth={2.5} />, text: "Free Cancellation (48hr)" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-1.5">
                <span className="text-envoy-red">{item.icon}</span>
                <span className="font-body text-[0.6875rem] text-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}