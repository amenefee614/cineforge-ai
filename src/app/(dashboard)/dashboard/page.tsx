"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ToolCard from "@/components/ToolCard";
import GlassCard from "@/components/GlassCard";

const BASE_URL = "https://cineforge-ai.up.railway.app";

const tools = [
  {
    href: "/tools/prompter",
    icon: "auto_awesome",
    title: "AI Prompter",
    description: "Generate cinematic prompts for 7 AI video models",
  },
  {
    href: "/tools/shotlist",
    icon: "format_list_numbered",
    title: "Shot List",
    description: "Convert scripts to professional shot breakdowns",
  },
  {
    href: "/tools/budget",
    icon: "calculate",
    title: "Budget Calculator",
    description: "Plan production costs with detailed breakdowns",
  },
  {
    href: "/tools/styles",
    icon: "palette",
    title: "Style Library",
    description: "10 director cinematography styles with CODEx prompts",
  },
  {
    href: "/tools/character",
    icon: "person",
    title: "Character Bible",
    description: "AI-generated character bibles for visual consistency",
  },
  {
    href: "/tools/podcast",
    icon: "mic",
    title: "Podcast Dashboard",
    description: "Generate complete podcast episode scripts",
  },
];

const quickLinks = [
  { href: "/films/watch", icon: "movie", label: "Film Library" },
  { href: "/courses", icon: "school", label: "Courses" },
  { href: "/community", icon: "forum", label: "Community" },
  { href: "/submit", icon: "upload", label: "Submit Film" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [referralCode, setReferralCode] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    fetch("/api/account")
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.referralCode) setReferralCode(data.user.referralCode);
      })
      .catch(() => {});
  }, []);

  const handleShare = () => {
    const link = referralCode
      ? `${BASE_URL}/join?ref=${referralCode}`
      : BASE_URL;
    navigator.clipboard.writeText(link);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface tracking-[0.05em] uppercase">
          YOUR STUDIO
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <p className="font-body text-muted-text">
            Welcome back, {session?.user?.name || session?.user?.email || "Filmmaker"}
          </p>
          <span className="font-studio text-xs bg-primary/20 text-primary px-2 py-0.5 tracking-widest uppercase">
            {(session?.user as any)?.tier || "pro"} tier
          </span>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-4 bg-deep-surface hover:bg-[rgba(157,111,232,0.12)] border border-border-custom/20 hover:border-primary/30 transition-all duration-150"
          >
            <span className="material-symbols-outlined text-primary">
              {link.icon}
            </span>
            <span className="font-studio text-xs text-on-surface tracking-widest uppercase">
              {link.label}
            </span>
          </a>
        ))}
      </div>

      {/* Production Tools */}
      <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase mb-6">
        PRODUCTION TOOLS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>

      {/* Share + Beta Status */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-3xl text-primary">
              info
            </span>
            <div>
              <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-1">
                BETA ACCESS
              </h3>
              <p className="font-body text-sm text-muted-text">
                You have full Pro-level access to every tool, the complete film
                library, all courses, and unlimited CineBot conversations during
                the beta period. No credit card required until May 1st.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center justify-center text-center min-w-[200px]">
          <span className="material-symbols-outlined text-3xl text-primary mb-2">share</span>
          <button
            onClick={handleShare}
            className="bg-primary text-on-surface px-6 py-2.5 font-studio text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors"
          >
            {shareCopied ? "Link Copied!" : "Share CineForge AI"}
          </button>
          <p className="font-body text-[10px] text-muted-text/60 mt-2">
            Copies your referral link
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
