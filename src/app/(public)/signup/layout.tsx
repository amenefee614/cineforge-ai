import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — CineForge AI",
  description: "Create your free CineForge AI account. Full Pro access during beta. No credit card required.",
  openGraph: { title: "Sign Up — CineForge AI", description: "Join CineForge AI free during beta.", images: ["/og-image.svg"] },
  alternates: { canonical: "https://cineforge-ai.up.railway.app/signup" },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
