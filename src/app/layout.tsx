import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import FilmGrain from "@/components/FilmGrain";
import BetaBanner from "@/components/BetaBanner";
import CineBot from "@/components/CineBot";

const BASE_URL = "https://cineforge-ai.up.railway.app";

export const metadata: Metadata = {
  title: "CineForge AI — Where AI Filmmakers Are Made",
  description:
    "The platform for AI filmmakers. Production tools, film library, courses, and community powered by the CODEx Cinematic System.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "CineForge AI — Where AI Filmmakers Are Made",
    description:
      "The platform for AI filmmakers. Production tools, film library, courses, and community powered by the CODEx Cinematic System.",
    url: BASE_URL,
    siteName: "CineForge AI",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CineForge AI — Where AI Filmmakers Are Made",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineForge AI — Where AI Filmmakers Are Made",
    description: "The platform for AI filmmakers.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      {/* Material Symbols loaded via globals.css @import */}
      <body className="font-body antialiased bg-background text-on-surface min-h-screen">
        <BetaBanner />
        <Providers>
          <FilmGrain />
          {children}
          <CineBot />
        </Providers>
      </body>
    </html>
  );
}
