import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — CineForge AI",
  description: "Sign in to your CineForge AI studio. Access production tools, film library, and more.",
  openGraph: { title: "Login — CineForge AI", description: "Sign in to CineForge AI.", images: ["/og-image.svg"] },
  alternates: { canonical: "https://cineforge-ai.up.railway.app/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
