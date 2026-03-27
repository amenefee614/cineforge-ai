"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-20 px-8 flex justify-between items-center bg-[#131318]/80 backdrop-blur-2xl border-b border-border-custom shadow-[0_8px_30px_rgb(157,111,232,0.1)]">
      <div className="flex items-center gap-12">
        <Link href="/">
          <span className="text-2xl font-black tracking-tighter text-primary italic font-studio">
            CINEFORGE AI
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link
            href="/dashboard"
            className="font-body uppercase tracking-[0.05em] text-sm font-bold text-primary border-b-2 border-primary pb-1"
          >
            Dashboard
          </Link>
          <Link
            href="/films"
            className="font-body uppercase tracking-[0.05em] text-sm font-bold text-muted-text hover:text-on-surface transition-all duration-150 ease-out"
          >
            Films
          </Link>
          <Link
            href="/courses"
            className="font-body uppercase tracking-[0.05em] text-sm font-bold text-muted-text hover:text-on-surface transition-all duration-150 ease-out"
          >
            Courses
          </Link>
          <Link
            href="/community"
            className="font-body uppercase tracking-[0.05em] text-sm font-bold text-muted-text hover:text-on-surface transition-all duration-150 ease-out"
          >
            Community
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Search bar */}
        <div className="relative hidden lg:block">
          <input
            className="bg-surface border border-border-custom focus:ring-1 focus:ring-primary text-sm w-64 h-10 px-4 font-body uppercase tracking-tighter text-on-surface placeholder:text-muted-text"
            placeholder="Search Studio..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-3 top-2 text-muted-text text-lg">
            search
          </span>
        </div>

        {/* Icon buttons */}
        <div className="hidden md:flex gap-4">
          <button className="material-symbols-outlined text-primary hover:bg-primary/10 transition-all p-2">
            smart_toy
          </button>
          <button className="material-symbols-outlined text-primary hover:bg-primary/10 transition-all p-2">
            notifications
          </button>
          {session ? (
            <button
              onClick={() => signOut()}
              className="material-symbols-outlined text-primary hover:bg-primary/10 transition-all p-2"
            >
              account_circle
            </button>
          ) : (
            <Link
              href="/login"
              className="material-symbols-outlined text-primary hover:bg-primary/10 transition-all p-2"
            >
              account_circle
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-on-surface"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-surface border-b border-border-custom p-4 space-y-3 md:hidden z-50">
          <Link
            href="/dashboard"
            className="block font-body text-sm text-muted-text hover:text-on-surface uppercase tracking-widest py-2"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/films"
            className="block font-body text-sm text-muted-text hover:text-on-surface uppercase tracking-widest py-2"
            onClick={() => setMobileOpen(false)}
          >
            Films
          </Link>
          <Link
            href="/courses"
            className="block font-body text-sm text-muted-text hover:text-on-surface uppercase tracking-widest py-2"
            onClick={() => setMobileOpen(false)}
          >
            Courses
          </Link>
          <Link
            href="/community"
            className="block font-body text-sm text-muted-text hover:text-on-surface uppercase tracking-widest py-2"
            onClick={() => setMobileOpen(false)}
          >
            Community
          </Link>
          {session ? (
            <button
              onClick={() => {
                signOut();
                setMobileOpen(false);
              }}
              className="block font-body text-sm text-muted-text hover:text-on-surface uppercase tracking-widest py-2"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signup"
              className="block bg-primary text-white text-center font-body text-sm uppercase tracking-widest py-3"
              onClick={() => setMobileOpen(false)}
            >
              Enter Studio
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
