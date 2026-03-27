import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import prisma from "@/lib/prisma";

async function getRecentFilms() {
  try {
    return await prisma.film.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

const toolCards = [
  {
    href: "/tools/prompter",
    icon: "terminal",
    title: "AI JEDI DS PROMPTER",
    description:
      "Direct-to-screen prompting engine optimized for cinematic lighting and camera physics.",
    badge: "v4.2 Engine",
  },
  {
    href: "/tools/shotlist",
    icon: "movie_edit",
    title: "SCRIPT-TO-SHOT LIST",
    description:
      "Automated storyboard generation from raw screenplay text. Scene-by-scene visual mapping.",
    badge: "Beta Access",
  },
  {
    href: "/tools/styles",
    icon: "video_library",
    title: "FILM LIBRARY",
    description:
      "Global repository of AI-native assets, pre-graded sequences, and cinematic environments.",
    badge: "2.4 PB Vault",
  },
];

const filmPosters = [
  {
    title: "NEON DUSK",
    genre: "Sci-Fi / Experimental",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEHBEq5wFhisARxNcYmS37zw6G7oY1HlKFUHRLx3GMUZNsbdMGUZPU2-yHcQWTRwis6xZgD3Rz9aFsu07_Tbkk2W7m8Nd0vS0LjJHTzVQRAc-NziC1J3qn3pIQ-U3xx7b-jhcWSyJ4b086ADEkVMhcLWepwbdFXKx9QgVSw4aM1Q1yeL05tQL5O4fHn4QfMWqs4A9z4fBsLm9GwdcPiNsi3rKGK6mQLKowbf4O3rlHtieNyMUjo0s9vptCIZGNq5xCUI_mNsDKwnw",
  },
  {
    title: "THE VOID",
    genre: "Noir / Drama",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIy_f3ViTawoJtCKquv2ngg43U8yMxrzQzvO-fuNh3l3TMN4f4fHVYqpeAzrjl8crnEaZzmWsyGTCUm_7X_T-rPXoEznzf-bbf_ekipgjEK2ZwuzROkvBcf0ZFGkwTKGoK-xA2c4oOcG_BK6YEOwqtNpgERhpial-P45_4gGCxLc9HfI20kh-4Gty0avjiyykB8QxA5zTpDtPVwPoGyf2UxLR3bjjWrA6Ay4MA0CX7MnHAWlBPh4zY6wACGwoQtrclYIDk4bJpaRpG",
  },
  {
    title: "KINETIC AI",
    genre: "Documentary / Tech",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5FMBNzArGdm3BIk2GH3qlEf0aRhdDZ94lwseNydtf3aQ5Ztio6rp2DUYBd9qK_LdjzFCi7ZbnMy1sELUuo-l1NEZdxGYZgYBoBGi2WhAAoBnOQSRc1vpJsxmbBuVzNbR6x1WVawGMqsKq8hgkQm0cnSVF0agRmrdqtgHTehbbhW6Lp3Q2xVDVusJ5JTDztYwZ8vIj6lH4QvDac4kTdaEX025-Ahscd4y3uj8R-_bUvqw4NkMiU8hvhbzr6uHDe7xX-tNCqgAxbXIz",
  },
];

const testimonials = [
  {
    name: "Jordan Rivera",
    role: "AI Filmmaker, Sundance Labs",
    quote:
      "CineForge AI transformed my workflow. The CODEx prompter alone saved me 20 hours on my last project.",
  },
  {
    name: "Maya Chen",
    role: "Director, Neon Collective",
    quote:
      "The shot list tool is incredible. I went from script to storyboard in minutes instead of days.",
  },
  {
    name: "Kai Okonkwo",
    role: "VFX Artist & Creator",
    quote:
      "Finally a platform that understands AI filmmaking. The style library is my secret weapon.",
  },
];

export default async function HomePage() {
  const films = await getRecentFilms();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CineForge AI",
    url: "https://cineforge-ai.up.railway.app",
    description:
      "The platform for AI filmmakers. Production tools, film library, courses, and community powered by the CODEx Cinematic System.",
    applicationCategory: "Multimedia",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free during beta",
    },
    creator: {
      "@type": "Organization",
      name: "AI Jedi Studios",
      url: "https://linktr.ee/amenefee614",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[870px] w-full flex items-center justify-center overflow-hidden film-noise">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Cinematic gear"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4bp35mGBxW190kt749ppeQ0losnzz414hOKrkMuEZt4Epcz1aBVvs9k1wwb-Z5Zm0MG7lwy6h1-ojYoITtJgEhFIlRuS28gVam5DuhrQnUa2OsMeJ54kvWiy1ooVKNxUeV_JfuK8rBUfQxoCXu_JBygSFamgWdNeQ5TFq7fI5q74glsp5fQX3JQ8QloPXtPadhmATqeVSiw3LcDmOgemWUE9uZNQFAD3m8oEcWd3UyHzKxIbk_9EJFMB0ImEjuRmWfdyZFG1-avkS"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

          <div className="relative z-20 text-center px-4 max-w-5xl">
            <span className="font-body text-primary uppercase tracking-[0.4em] text-sm mb-4 block">
              Redefining Digital Cinema
            </span>
            <h1 className="font-headline text-8xl md:text-[10rem] text-on-surface leading-none tracking-[0.05em] mb-8">
              CINEFORGE AI
            </h1>
            <p className="font-headline text-3xl md:text-4xl text-muted-text max-w-3xl mx-auto mb-12 tracking-wider">
              WHERE AI FILMMAKERS ARE MADE
            </p>

            {/* Animated Counters */}
            <div className="flex flex-wrap justify-center gap-12 mb-12">
              <AnimatedCounter target={7} label="AI Models" suffix="" />
              <AnimatedCounter target={10} label="Director Styles" suffix="" />
              <div className="text-center">
                <p className="font-headline text-5xl md:text-6xl text-primary">FREE</p>
                <p className="font-studio text-xs text-muted-text tracking-widest uppercase mt-2">Until May 1st</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link
                href="/signup"
                className="bg-primary text-white font-body font-bold uppercase tracking-widest text-lg px-12 py-5 hover:bg-primary-hover active:scale-95 transition-all shadow-[0_0_30px_rgba(157,111,232,0.4)]"
              >
                Enter Studio
              </Link>
              <Link
                href="/films"
                className="border border-border-custom bg-transparent text-primary font-body font-bold uppercase tracking-widest text-lg px-12 py-5 hover:bg-primary/5 transition-all"
              >
                View Showreel
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="w-full py-12 border-y border-border-custom bg-background">
          <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center text-center">
            <p className="text-muted-text font-body text-xs uppercase tracking-[0.2em] font-medium leading-relaxed">
              Built on the CODEx Cinematic System &middot; Powered by AI Jedi
              Studios &middot;{" "}
              <a
                className="underline hover:text-primary"
                href="https://linktr.ee/amenefee614"
                target="_blank"
                rel="noopener noreferrer"
              >
                linktr.ee/amenefee614
              </a>
            </p>
          </div>
        </div>

        {/* Beta CTA Banner */}
        <section className="py-20 px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[rgba(157,111,232,0.08)] border border-[rgba(157,111,232,0.35)] backdrop-blur-[16px] p-12 text-center overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/15 to-primary/5 pointer-events-none" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/20 blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <span className="font-studio text-xs text-primary tracking-[0.3em] uppercase block mb-4">
                  Limited Time
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-on-surface tracking-[0.05em] uppercase mb-4">
                  NOW IN BETA — JOIN FREE
                </h2>
                <p className="font-body text-muted-text max-w-lg mx-auto mb-8">
                  Get full Pro access to every tool, the complete film library, all
                  courses, and unlimited CineBot conversations. No credit card required.
                </p>
                <Link
                  href="/signup"
                  className="inline-block bg-primary text-white font-studio text-sm tracking-widest uppercase px-10 py-4 hover:bg-primary-hover active:scale-95 transition-all shadow-[0_0_40px_rgba(157,111,232,0.5)]"
                >
                  Join Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Production Tools Bento Grid */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-headline text-5xl text-on-surface tracking-[0.05em]">
                PRODUCTION TOOLS
              </h2>
              <p className="text-muted-text uppercase text-xs tracking-widest mt-2">
                Next-Gen Creative Accelerators
              </p>
            </div>
            <div className="h-[1px] flex-grow bg-border-custom mx-12 hidden md:block mb-4" />
            <Link
              href="/dashboard"
              className="text-primary font-body text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
            >
              Explore All{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolCards.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="glass-card tool-card-glow p-12 flex flex-col h-[420px]">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary mb-10">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      {tool.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-base font-bold text-on-surface mb-6 uppercase tracking-wider">
                    {tool.title}
                  </h3>
                  <p className="text-muted-text text-[13px] leading-relaxed mb-auto">
                    {tool.description}
                  </p>
                  <div className="pt-8 border-t border-border-custom flex justify-between items-center">
                    <span className="text-primary text-[10px] font-body uppercase tracking-widest">
                      {tool.badge}
                    </span>
                    <span className="material-symbols-outlined text-primary">
                      north_east
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Film Reel Banner */}
        <section className="w-full relative py-32 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/30 to-background z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Cinema banner"
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY29SGhRwZxn1QShoaLocxKSPkmPvnNDAjoqrswWhLgp-j_372bDJXARVj9M0TGTOoctAIC5316kaohEb_5KFl-OHqilxsilYkchRBqh5Z4BV4oEE3zuuvjR0TC-LfvoCh16j-fEfsodePAgjx9lXBuqNrcQlJtjwtQ4CMwDw1ygly-zeq9vWt31Q0XRdOuu75g553YSAwVTeFQCO9Fqp41QKrHislyyo_P1Ict3WaibgZNMN8bKYbiDnvL6CdQGFa9CM672qqhU1t"
          />
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-25 z-[15] pointer-events-none">
            <svg
              className="w-full h-full fill-primary"
              viewBox="0 0 100 100"
              style={{ animation: "spin 60s linear infinite" }}
            >
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="18" r="6" fill="currentColor" />
              <circle cx="50" cy="82" r="6" fill="currentColor" />
              <circle cx="18" cy="50" r="6" fill="currentColor" />
              <circle cx="82" cy="50" r="6" fill="currentColor" />
              <circle cx="28" cy="28" r="6" fill="currentColor" />
              <circle cx="72" cy="72" r="6" fill="currentColor" />
              <circle cx="28" cy="72" r="6" fill="currentColor" />
              <circle cx="72" cy="28" r="6" fill="currentColor" />
            </svg>
          </div>
          <div className="relative z-20 text-center">
            <h2 className="font-headline text-8xl md:text-9xl text-on-surface tracking-[0.05em] opacity-90">
              FILM LIBRARY
            </h2>
            <p className="font-headline text-3xl text-primary tracking-[0.2em] mt-2">
              STREAM AI FILMS
            </p>
            <Link
              href="/films"
              className="mt-8 inline-block border-b-2 border-primary text-primary font-body text-sm uppercase tracking-widest pb-1 hover:text-on-surface hover:border-on-surface transition-all"
            >
              Enter Screening Room
            </Link>
          </div>
        </section>

        {/* Recently Added Films */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-5xl text-on-surface tracking-[0.05em]">
              RECENTLY ADDED FILMS
            </h2>
            <p className="text-muted-text uppercase text-xs tracking-widest mt-2">
              Latest Works from the Studio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filmPosters.map((film) => (
              <Link key={film.title} href="/films">
                <div className="group relative overflow-hidden h-[500px] border border-border-custom bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={film.title}
                    className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-700 group-hover:scale-110"
                    src={film.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-primary font-body text-[10px] uppercase tracking-widest mb-2">
                      {film.genre}
                    </span>
                    <h4 className="font-headline text-4xl text-on-surface tracking-[0.05em] mb-4">
                      {film.title}
                    </h4>
                    <div className="flex gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button className="bg-primary p-2 text-white">
                        <span className="material-symbols-outlined">
                          play_arrow
                        </span>
                      </button>
                      <button className="border border-white/20 p-2 text-white">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials / Social Proof */}
        <section className="py-24 px-8 border-t border-border-custom">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl text-on-surface tracking-[0.05em] uppercase">
                FILMMAKER VOICES
              </h2>
              <p className="text-muted-text uppercase text-xs tracking-widest mt-2">
                From the CineForge AI Community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-[rgba(157,111,232,0.06)] border border-[rgba(157,111,232,0.20)] backdrop-blur-[12px] p-8 flex flex-col"
                >
                  <span className="material-symbols-outlined text-primary/40 text-4xl mb-4">
                    format_quote
                  </span>
                  <p className="font-body text-on-surface text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border-custom/20">
                    <p className="font-headline text-base text-on-surface tracking-[0.05em] uppercase">
                      {t.name}
                    </p>
                    <p className="font-studio text-[10px] text-primary tracking-widest uppercase mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
