"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GlassCard from "@/components/GlassCard";

interface Film {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  embedUrl: string;
}

export default function FilmPlayerPage() {
  const params = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/films/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFilm(data.film || null);
        setLoading(false);
        // Track view
        fetch("/api/films/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filmId: params.id }),
        });
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="animate-pulse bg-deep-surface aspect-video max-w-4xl" />
      </div>
    );
  }

  if (!film) {
    return (
      <div className="p-6 sm:p-8 text-center py-20">
        <span className="material-symbols-outlined text-5xl text-muted-text/30 block mb-4">
          error
        </span>
        <p className="font-body text-muted-text">Film not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Player */}
      <div className="aspect-video bg-background mb-6 relative overflow-hidden">
        <iframe
          src={film.embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Info */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="font-headline text-3xl sm:text-4xl text-on-surface tracking-[0.05em] uppercase">
            {film.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-studio text-xs text-primary tracking-widest uppercase">
              {film.genre}
            </span>
            <span className="text-muted-text/30">|</span>
            <span className="font-studio text-xs text-muted-text tracking-widest">
              {film.duration}
            </span>
          </div>
        </div>
      </div>

      <GlassCard className="p-6">
        <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-3">
          ABOUT THIS FILM
        </h3>
        <p className="font-body text-on-surface leading-relaxed">
          {film.description}
        </p>
      </GlassCard>
    </div>
  );
}
