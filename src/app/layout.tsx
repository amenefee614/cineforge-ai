import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import FilmGrain from "@/components/FilmGrain";
import BetaBanner from "@/components/BetaBanner";
import CineBot from "@/components/CineBot";

export const metadata: Metadata = {
  title: "CineForge AI — Where AI Filmmakers Are Made",
  description:
    "The platform for AI filmmakers. Production tools, film library, courses, and community powered by the CODEx Cinematic System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-body antialiased bg-background text-on-surface min-h-screen">
        <Providers>
          <BetaBanner />
          <FilmGrain />
          {children}
          <CineBot />
        </Providers>
      </body>
    </html>
  );
}
