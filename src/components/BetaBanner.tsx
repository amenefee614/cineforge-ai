"use client";

import { useState, useEffect } from "react";

export default function BetaBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("beta-banner-dismissed");
    if (!stored) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("beta-banner-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="w-full bg-[#7B4FD4] py-2 px-4 text-center font-studio text-sm text-white tracking-widest uppercase">
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
