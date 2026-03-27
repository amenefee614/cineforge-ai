import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmCard from "@/components/FilmCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Film Library — CineForge AI",
  description: "Browse AI-generated short films from creators worldwide. Stream the latest in AI filmmaking.",
  openGraph: { title: "Film Library — CineForge AI", description: "Browse AI-generated short films.", images: ["/og-image.svg"] },
  alternates: { canonical: "https://cineforge-ai.up.railway.app/films" },
};

async function getFilms() {
  try {
    return await prisma.film.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function FilmsPage() {
  const films = await getFilms();
  const featured = films.filter((f) => f.featured);
  const rest = films.filter((f) => !f.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="font-headline text-5xl sm:text-7xl text-on-surface tracking-[0.05em] uppercase">
              FILM LIBRARY
            </h1>
            <p className="font-body text-muted-text mt-4 max-w-2xl mx-auto">
              AI-generated short films from creators worldwide. Sign in to
              unlock the full streaming library.
            </p>
          </div>

          {/* Featured Films */}
          {featured.length > 0 && (
            <section className="mb-16">
              <h2 className="font-studio text-xs text-primary tracking-widest uppercase mb-6">
                FEATURED FILMS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((film) => (
                  <FilmCard
                    key={film.id}
                    id={film.id}
                    title={film.title}
                    genre={film.genre}
                    duration={film.duration}
                    description={film.description}
                    thumbnailUrl={film.thumbnailUrl}
                    linkPrefix="/films/watch"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Rest - Blurred */}
          {rest.length > 0 && (
            <section className="relative">
              <h2 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-6">
                MORE FILMS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((film) => (
                  <FilmCard
                    key={film.id}
                    id={film.id}
                    title={film.title}
                    genre={film.genre}
                    duration={film.duration}
                    description={film.description}
                    thumbnailUrl={film.thumbnailUrl}
                    blurred
                  />
                ))}
              </div>
              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                <div className="text-center px-4">
                  <h3 className="font-headline text-3xl text-on-surface tracking-[0.05em] uppercase mb-4">
                    UNLOCK THE FULL LIBRARY
                  </h3>
                  <p className="font-body text-muted-text mb-6">
                    Sign up free during beta to access every film.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-primary text-on-surface px-6 py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150"
                  >
                    Enter Studio — Free
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
