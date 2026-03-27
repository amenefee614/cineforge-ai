"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border-custom pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl font-black tracking-tighter text-primary italic font-studio mb-6">
            CINEFORGE AI
          </div>
          <p className="text-muted-text text-sm max-w-md leading-loose uppercase tracking-wide font-body">
            Empowering the world&apos;s most innovative directors through
            ethical AI and precision digital tools.
          </p>
          <a
            href="https://linktr.ee/amenefee614"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary-hover font-body text-xs uppercase tracking-widest transition-colors"
          >
            <span className="material-symbols-outlined text-sm">link</span>
            linktr.ee/amenefee614
          </a>
        </div>
        <div>
          <h5 className="font-body font-bold text-xs uppercase tracking-[0.2em] text-on-surface mb-6">
            RESOURCES
          </h5>
          <ul className="space-y-4 text-muted-text text-xs font-body uppercase tracking-widest">
            <li>
              <Link href="/courses" className="hover:text-primary transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-primary transition-colors">
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="/tools/prompter" className="hover:text-primary transition-colors">
                API Reference
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-body font-bold text-xs uppercase tracking-[0.2em] text-on-surface mb-6">
            STUDIO
          </h5>
          <ul className="space-y-4 text-muted-text text-xs font-body uppercase tracking-widest">
            <li>
              <Link href="/press" className="hover:text-primary transition-colors">
                Press
              </Link>
            </li>
            <li>
              <Link href="/films" className="hover:text-primary transition-colors">
                Showreel
              </Link>
            </li>
            <li>
              <a
                href="https://linktr.ee/amenefee614"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Linktree
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-border-custom flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-text font-body text-[10px] uppercase tracking-widest">
          &copy; 2026 CINEFORGE AI. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-muted-text font-body text-[10px] uppercase tracking-widest">
          <Link href="/press" className="hover:text-on-surface transition-colors">
            Press
          </Link>
          <a href="#" className="hover:text-on-surface transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-on-surface transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-on-surface transition-colors">
            Cookies
          </a>
          <a
            href="https://linktr.ee/amenefee614"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-surface transition-colors"
          >
            Linktree
          </a>
        </div>
      </div>
    </footer>
  );
}
