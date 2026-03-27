"use client";

import { useState, useEffect } from "react";
import FilmCard from "@/components/FilmCard";

interface Film {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
  thumbnailUrl: string | null;
}

const genres = ["All", "Sci-Fi", "Noir/Drama", "Documentary/Tech", "Horror", "Action", "Experimental"];

export default function FilmWatchPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetch("/api/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.films || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    selectedGenre === "All"
      ? films
      : films.filter((f) => f.genre === selectedGenre);

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface tracking-[0.05em] uppercase">
          FILM LIBRARY
        </h1>
        <p className="font-body text-muted-text mt-2">
          Stream the full AI filmmaking collection
        </p>
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`font-studio text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-150 ${
              selectedGenre === genre
                ? "bg-primary text-on-surface"
                : "bg-deep-surface text-muted-text hover:text-on-surface border border-border-custom/20"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-deep-surface animate-pulse aspect-[4/3]"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((film) => (
            <FilmCard
              key={film.id}
              id={film.id}
              title={film.title}
              genre={film.genre}
              duration={film.duration}
              description={film.description}
              thumbnailUrl={film.thumbnailUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-muted-text/30 mb-4 block">
            movie
          </span>
          <p className="font-body text-muted-text">
            No films found in this genre.
          </p>
        </div>
      )}
    </div>
  );
}
