"use client";

import Link from "next/link";

interface FilmCardProps {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
  thumbnailUrl?: string | null;
  blurred?: boolean;
  linkPrefix?: string;
}

export default function FilmCard({
  id,
  title,
  genre,
  duration,
  description,
  blurred = false,
  linkPrefix = "/films/watch",
}: FilmCardProps) {
  const content = (
    <div
      className={`group bg-[rgba(157,111,232,0.08)] border border-[rgba(157,111,232,0.25)] backdrop-blur-[12px] overflow-hidden transition-all duration-150 hover:bg-deep-surface hover:border-primary/40 ${
        blurred ? "filter blur-sm pointer-events-none select-none" : ""
      }`}
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-deep-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="font-studio text-xs text-primary tracking-widest uppercase">
            {genre}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-studio text-xs text-muted-text bg-background/60 px-2 py-1">
            {duration}
          </span>
        </div>
        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span className="material-symbols-outlined text-4xl text-primary">
            play_circle
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-headline text-lg text-on-surface tracking-[0.05em] uppercase mb-1">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-text line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );

  if (blurred) return content;

  return <Link href={`${linkPrefix}/${id}`}>{content}</Link>;
}
