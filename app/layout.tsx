import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = localFont({
  src: "../public/brand/font/Antonio/Antonio-VariableFont_wght.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "100 700",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osmosisone.com"),
  title: "Osmosis — AI Micro-Drama & Micro-Series Studio for African Filmmakers",
  description:
    "The AI film studio empowering African creators to direct viral micro-dramas and episodic micro-series. Script to storyboard to final 4K render with Seedance & SeeDream AI models.",
  applicationName: "Osmosis",
  keywords: [
    "African micro-drama",
    "AI micro-series",
    "African filmmakers",
    "Nollywood AI",
    "AI film studio Africa",
    "AI video generation",
    "Seedance 2.5",
    "Seedance 2.0",
    "SeeDream",
    "cinematic AI",
    "Osmosis",
  ],
  authors: [{ name: "Osmosis Studio" }],
  creator: "Osmosis",
  publisher: "Osmosis",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Osmosis — AI Micro-Drama & Micro-Series Studio for African Filmmakers",
    description:
      "The AI film studio empowering African creators to direct viral micro-dramas and episodic micro-series. Script to storyboard to final 4K render with Seedance & SeeDream AI models.",
    url: "https://osmosisone.com",
    siteName: "Osmosis",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        type: "image/jpeg",
        alt: "Osmosis — AI Micro-Drama & Micro-Series Studio for African Filmmakers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmosis — AI Micro-Drama & Micro-Series Studio for African Filmmakers",
    description:
      "The AI film studio empowering African creators to direct viral micro-dramas and episodic micro-series. Script to storyboard to final 4K render with Seedance & SeeDream AI models.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/brand/logo/logo-icon.svg",
    apple: "/brand/logo/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
