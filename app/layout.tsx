import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

/* ─────────────────────────────────────────────────────────────────────────
   FONT CONFIGURATION
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Montserrat — Primary heading font.
 * Loaded with a wide weight range to support ultra-light decorative use
 * and ultra-bold display headings simultaneously.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Inter — Body copy, UI labels, and data text.
 * Loaded with a focused weight range for performance.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

/* ─────────────────────────────────────────────────────────────────────────
   SITE METADATA
   ───────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // ── Core Identity
  title: {
    default: "The Envoy Hotel Abuja | The Diplomat's Sanctuary",
    template: "%s | The Envoy Hotel Abuja",
  },
  description:
    "Experience Abuja's most distinguished address. The Envoy Hotel — where diplomatic heritage meets ultra-luxury living. Level 2 Security Certified. Larai Restaurant. Poolside Oasis.",

  // ── Keywords
  keywords: [
    "Envoy Hotel Abuja",
    "luxury hotel Abuja Nigeria",
    "diplomatic hotel Abuja",
    "VIP suites Abuja",
    "Larai Restaurant Abuja",
    "five star hotel Nigeria",
    "Silk Road heritage hotel",
    "secure hotel Abuja",
    "business hotel Abuja",
    "The Diplomat's Sanctuary",
  ],

  // ── Author / Publisher
  authors: [{ name: "The Envoy Hotel", url: "https://theenvoyabuja.com" }],
  creator: "The Envoy Hotel Abuja",
  publisher: "The Envoy Hotel Abuja",

  // ── Canonical / Alternate
  metadataBase: new URL("https://theenvoyabuja.com"),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (rich social previews)
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://theenvoyabuja.com",
    siteName: "The Envoy Hotel Abuja",
    title: "The Envoy Hotel Abuja | The Diplomat's Sanctuary",
    description:
      "Where diplomatic heritage meets ultra-luxury. Abuja's most distinguished address, featuring Diplomatic VIP Suites, Larai Restaurant, and Level 2 Security Certification.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Envoy Hotel Abuja — Diplomatic Modernism",
      },
    ],
  },

  // ── Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "The Envoy Hotel Abuja | The Diplomat's Sanctuary",
    description:
      "Experience Abuja's most distinguished luxury hotel. Diplomatic VIP Suites, world-class dining, and Level 2 Security.",
    images: ["/og-image.jpg"],
  },

  // ── Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons / Favicons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FA4338" },
    ],
  },

  // ── Manifest (PWA support)
  manifest: "/site.webmanifest",

  // ── Verification (add real codes when deploying)
  verification: {
    google: "google-site-verification-token",
  },

  // ── App-specific
  appleWebApp: {
    capable: true,
    title: "Envoy Hotel",
    statusBarStyle: "black-translucent",
  },

  // ── Structured data hint (full JSON-LD added in page.tsx)
  category: "Hotel & Hospitality",
};

/* ─────────────────────────────────────────────────────────────────────────
   VIEWPORT CONFIGURATION
   ───────────────────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14171F" },
    { media: "(prefers-color-scheme: light)", color: "#14171F" },
  ],
  colorScheme: "dark",
};

/* ─────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
   ───────────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        {/* ── DNS Prefetch for external resources ── */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Theme Color (duplicate for wider browser support) ── */}
        <meta name="theme-color" content="#14171F" />
        <meta name="msapplication-TileColor" content="#14171F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* ── Structured Data (Hotel JSON-LD) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "The Envoy Hotel Abuja",
              "description": "Abuja's most distinguished luxury address. Diplomatic VIP Suites, Larai Restaurant, Poolside Oasis, and Level 2 Security Certification.",
              "url": "https://theenvoyabuja.com",
              "telephone": "+234-000-000-0000",
              "email": "reservations@theenvoyabuja.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Abuja",
                "addressRegion": "FCT",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "9.0579",
                "longitude": "7.4951"
              },
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Restaurant", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Business Center", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Security Level 2 Certified", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Diplomatic VIP Suites", "value": true }
              ],
              "priceRange": "$$$$$",
              "currenciesAccepted": "NGN, USD",
              "paymentAccepted": "Cash, Credit Card",
              "sameAs": [
                "https://www.instagram.com/theenvoyabuja/",
                "https://www.facebook.com/theenvoyabuja",
                "https://www.linkedin.com/company/theenvoyabuja"
              ]
            })
          }}
        />
      </head>

      <body
        className={`
          ${inter.className}
          bg-[#FAF8F5]
          text-stone-900
          antialiased
          overflow-x-hidden
          selection:bg-envoy-red/30
          selection:text-stone-900
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            px-4 py-2
            bg-envoy-red text-white
            font-heading text-sm font-bold uppercase tracking-widest
            rounded
            transition-all duration-200
          "
        >
          Skip to Content
        </a>

        {/* Main application shell */}
        <div id="app-shell" className="relative">
          {/* Ambient background orbs — persistent, low-key brand atmosphere */}
          <div
            aria-hidden="true"
            className="
              fixed inset-0 pointer-events-none z-0 overflow-hidden
            "
          >
            {/* Top-left red orb */}
            <div
              className="
                ambient-orb
                w-[600px] h-[600px]
                -top-48 -left-32
                bg-envoy-red/[0.04]
              "
            />
            {/* Bottom-right subtle orb */}
            <div
              className="
                ambient-orb
                w-[800px] h-[800px]
                bottom-0 -right-64
                bg-envoy-red/[0.025]
              "
            />
          </div>

          {/* Page content */}
          <main id="main-content" className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}