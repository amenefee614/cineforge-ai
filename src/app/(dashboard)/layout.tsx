import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Dashboard — CineForge AI",
  description: "Your AI filmmaking studio. Access production tools, film library, courses, and community.",
  openGraph: { title: "Studio Dashboard — CineForge AI", description: "Your AI filmmaking studio.", images: ["/og-image.svg"] },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-56 min-h-[calc(100vh-4rem)] page-transition">
          {children}
        </main>
      </div>
    </div>
  );
}
