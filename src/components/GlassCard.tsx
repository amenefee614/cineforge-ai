"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[rgba(157,111,232,0.08)] border border-[rgba(157,111,232,0.25)] backdrop-blur-[12px] ${
        hover
          ? "hover:bg-deep-surface hover:border-primary/40 cursor-pointer"
          : ""
      } transition-all duration-150 ${className}`}
    >
      {children}
    </div>
  );
}
