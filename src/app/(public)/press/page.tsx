import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-8 py-24 max-w-3xl mx-auto w-full page-transition">
        <h1 className="font-headline text-6xl sm:text-7xl text-on-surface tracking-[0.05em] uppercase mb-4">
          PRESS
        </h1>
        <div className="h-[2px] w-24 bg-primary mb-12" />

        <div className="space-y-10">
          {/* Platform Info */}
          <div>
            <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase mb-2">
              CINEFORGE AI
            </h2>
            <p className="font-studio text-sm text-primary tracking-widest uppercase mb-4">
              Where AI Filmmakers Are Made
            </p>
            <p className="font-body text-on-surface leading-relaxed">
              CineForge AI is the all-in-one production platform for AI filmmakers.
              Featuring the CODEx Cinematic System, AI-powered production tools,
              a curated film library, educational courses, and a creator community —
              CineForge AI equips directors with everything they need to create
              professional-grade AI films from concept to final cut.
            </p>
          </div>

          {/* Built By */}
          <div>
            <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-3">
              Built By
            </h3>
            <p className="font-body text-on-surface">
              <span className="text-primary font-bold">AI Jedi Studios</span>
            </p>
            <a
              href="https://linktr.ee/amenefee614"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-primary hover:text-primary-hover transition-colors text-sm mt-1 inline-block"
            >
              linktr.ee/amenefee614
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-3">
              Press Contact
            </h3>
            <p className="font-body text-on-surface">
              press@cineforgeai.com
            </p>
          </div>

          {/* Assets */}
          <div>
            <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-3">
              Media Assets
            </h3>
            <p className="font-body text-muted-text text-sm">
              Screenshots, logos, and brand assets available on request.
              Contact press@cineforgeai.com for media kit access.
            </p>
          </div>

          {/* Founded */}
          <div className="pt-6 border-t border-border-custom/30">
            <div className="flex items-center gap-8">
              <div>
                <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                  Founded
                </span>
                <span className="font-headline text-3xl text-primary">2026</span>
              </div>
              <div>
                <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                  Platform
                </span>
                <span className="font-body text-on-surface">Web (Global)</span>
              </div>
              <div>
                <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                  Status
                </span>
                <span className="font-studio text-xs bg-primary/20 text-primary px-2 py-0.5 tracking-widest uppercase">
                  BETA
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
