"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";

interface Style {
  id: string;
  name: string;
  directorReference: string;
  description: string;
  mood: string;
  lightingNotes: string;
  cameraNotes: string;
  colorGrade: string;
  samplePrompt: string;
}

export default function StylesPage() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/styles")
      .then((res) => res.json())
      .then((data) => {
        setStyles(data.styles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        CINEMATOGRAPHY STYLE LIBRARY
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        10 iconic director styles with detailed breakdowns and CODEx sample prompts
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-deep-surface animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {styles.map((style) => (
            <GlassCard
              key={style.id}
              className="p-6 cursor-pointer"
              hover
              onClick={() =>
                setExpanded(expanded === style.id ? null : style.id)
              }
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase">
                    {style.name}
                  </h3>
                  <span className="font-studio text-xs text-primary tracking-widest uppercase">
                    {style.directorReference}
                  </span>
                </div>
                <span className="material-symbols-outlined text-muted-text">
                  {expanded === style.id ? "expand_less" : "expand_more"}
                </span>
              </div>

              <p className="font-body text-sm text-muted-text mb-2">
                {style.description}
              </p>

              <span className="inline-block font-studio text-xs bg-primary/10 text-primary px-2 py-0.5 tracking-widest uppercase">
                {style.mood}
              </span>

              {/* Expanded Detail */}
              {expanded === style.id && (
                <div className="mt-4 pt-4 border-t border-border-custom/20 space-y-4">
                  <div>
                    <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                      Lighting
                    </span>
                    <p className="font-body text-sm text-on-surface">
                      {style.lightingNotes}
                    </p>
                  </div>
                  <div>
                    <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                      Camera
                    </span>
                    <p className="font-body text-sm text-on-surface">
                      {style.cameraNotes}
                    </p>
                  </div>
                  <div>
                    <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                      Color Grade
                    </span>
                    <p className="font-body text-sm text-on-surface">
                      {style.colorGrade}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                        Sample CODEx Prompt
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(style.id, style.samplePrompt);
                        }}
                        className="flex items-center gap-1 text-primary hover:text-primary-hover font-studio text-xs tracking-widest uppercase transition-colors duration-150"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copied === style.id ? "check" : "content_copy"}
                        </span>
                        {copied === style.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-body text-sm text-primary/80 bg-deep-surface p-3 border border-border-custom/20">
                      {style.samplePrompt}
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
