"use client";

import { useState, useEffect } from "react";

export default function BetaBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cineforge-beta-dismissed");
    if (stored === "true") setDismissed(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("cineforge-beta-dismissed", "true");
    setDismissed(true);
  };

  // Don't render anything until mounted (avoids hydration mismatch)
  // Once mounted, show unless dismissed
  if (!mounted || dismissed) return null;

  return (
    <div className="relative z-[10000] w-full bg-[#7B4FD4] py-2.5 px-4 text-center font-studio text-sm text-white tracking-widest uppercase">
      <span>
        CINEFORGE AI IS FREE DURING BETA — Full access until May 1st. No
        credit card.
      </span>
      <button
        onClick={handleDismiss}
        className="ml-4 text-white/60 hover:text-white transition-colors duration-150"
        aria-label="Dismiss beta banner"
      >
        <span className="material-symbols-outlined text-sm align-middle">
          close
        </span>
      </button>
    </div>
  );
}
