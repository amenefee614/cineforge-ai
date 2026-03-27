"use client";

import { useState, useEffect } from "react";

export default function BetaBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("beta_banner_dismissed") === "true") {
        setVisible(false);
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem("beta_banner_dismissed", "true");
    } catch {}
    setVisible(false);
  };

  return (
    <div
      className="w-full bg-[#7B4FD4] py-2.5 px-4 text-center font-studio text-sm text-white tracking-widest uppercase"
      style={{ display: visible ? "block" : "none" }}
      suppressHydrationWarning
    >
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
