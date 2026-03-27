import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press — CineForge AI",
  description: "CineForge AI press information, media resources, and contact details.",
  openGraph: {
    title: "Press — CineForge AI",
    description: "CineForge AI press information and media resources.",
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
