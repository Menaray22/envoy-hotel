import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingBar from "@/components/BookingBar";
import Story from "@/components/Story";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   SECTION SEPARATOR — warm gradient divider
   ───────────────────────────────────────────────────────────────────────── */
function SectionSeparator({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="relative h-16 pointer-events-none -mt-1"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
      aria-hidden
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(200,57,43,0.15), transparent)" }} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Fixed navbar — z-50 */}
      <Navbar />

      <div className="relative overflow-x-hidden">

        {/* HERO — full screen dark image section */}
        <div className="relative z-0">
          <Hero />
        </div>

        {/* BOOKING BAR — floats over hero bottom, warm white */}
        <div className="relative z-20" style={{ backgroundColor: "#FAF8F5" }}>
          <BookingBar />
        </div>

        {/* Spacer */}
        <div className="h-16 lg:h-24" style={{ backgroundColor: "#FAF8F5" }} aria-hidden />

        {/* STORY — warm cream background */}
        <div className="relative z-0" style={{ backgroundColor: "#FAF8F5" }}>
          <Story />
        </div>

        {/* Separator cream → soft */}
        <SectionSeparator from="#FAF8F5" to="#F3EFE9" />

        {/* SERVICES — slightly warmer cream */}
        <div className="relative z-0" style={{ backgroundColor: "#F3EFE9" }}>
          <Services />
        </div>

        {/* Separator soft → dark (video section is dark for contrast) */}
        <SectionSeparator from="#F3EFE9" to="#1C1917" />

        {/* VIDEO — keep dark for cinematic feel */}
        <div className="relative z-0" style={{ backgroundColor: "#1C1917" }}>
          <VideoShowcase />
        </div>

        {/* Separator dark → cream */}
        <SectionSeparator from="#1C1917" to="#1C1917" />

        {/* FOOTER — dark */}
        <div className="relative z-0" style={{ backgroundColor: "#1C1917" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}