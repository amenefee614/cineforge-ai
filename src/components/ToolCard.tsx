"use client";

import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function ToolCard({ href, icon, title, description }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-[rgba(157,111,232,0.08)] border border-[rgba(157,111,232,0.25)] backdrop-blur-[12px] p-6 hover:bg-deep-surface hover:border-primary/40 tool-card-glow transition-all duration-150 cursor-pointer h-full">
        <span className="material-symbols-outlined text-3xl text-primary mb-4 block group-hover:text-primary-hover transition-colors duration-150">
          {icon}
        </span>
        <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-2">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-text">{description}</p>
      </div>
    </Link>
  );
}
