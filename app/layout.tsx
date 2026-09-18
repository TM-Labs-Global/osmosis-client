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
  title: "Osmosis — Direct Your First Film with AI",
  description:
    "Script to storyboard to final 4K render. Direct consistent characters, cinematic camera motion, and sound with Seedance & SeeDream AI models.",
  applicationName: "Osmosis",
  keywords: [
    "AI film studio",
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
    title: "Osmosis — Direct Your First Film with AI",
    description:
      "Script to storyboard to final 4K render. Direct consistent characters, cinematic camera motion, and sound with Seedance & SeeDream AI models.",
    url: "https://osmosisone.com",
    siteName: "Osmosis",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        type: "image/jpeg",
        alt: "Osmosis AI Film Studio — Direct Your First Film with AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmosis — Direct Your First Film with AI",
    description:
      "Script to storyboard to final 4K render. Direct consistent characters, cinematic camera motion, and sound with Seedance & SeeDream AI models.",
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
