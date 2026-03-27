"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";

export default function CharacterPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [personality, setPersonality] = useState("");
  const [appearance, setAppearance] = useState("");
  const [backstory, setBackstory] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!name) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, role, personality, appearance, backstory }),
      });
      const data = await res.json();
      setOutput(data.bible || data.error || "No output generated.");
    } catch {
      setOutput("Error generating character bible.");
    } finally {
      setLoading(false);
    }
  };

  const exportTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "character"}-bible.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40";
  const labelClass = "block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5";

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        CHARACTER BIBLE GENERATOR
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Create detailed character bibles for visual consistency in AI filmmaking
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Character Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maya Chen" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Age</label>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="32" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Role in Story</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Protagonist, detective, rebel leader..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Personality Traits</label>
              <input type="text" value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Stoic, sharp-witted, carries guilt..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Physical Appearance</label>
              <textarea value={appearance} onChange={(e) => setAppearance(e.target.value)} placeholder="Detailed physical description for AI generation consistency..." rows={3} className={inputClass + " resize-none"} />
            </div>
            <div>
              <label className={labelClass}>Backstory</label>
              <textarea value={backstory} onChange={(e) => setBackstory(e.target.value)} placeholder="Key backstory elements..." rows={3} className={inputClass + " resize-none"} />
            </div>

            <button
              onClick={generate}
              disabled={loading || !name}
              className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Bible..." : "Generate Character Bible"}
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
              Character Bible
            </span>
            {output && (
              <button onClick={exportTxt} className="flex items-center gap-1 text-primary hover:text-primary-hover font-studio text-xs tracking-widest uppercase transition-colors duration-150">
                <span className="material-symbols-outlined text-sm">download</span>
                Export .txt
              </button>
            )}
          </div>

          <div className="min-h-[400px] max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <span className="animate-pulse font-body text-sm text-muted-text">Building character bible...</span>
              </div>
            ) : output ? (
              <pre className="font-body text-sm text-on-surface whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <p className="font-body text-sm text-muted-text/50 text-center mt-20">Your character bible will appear here.</p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
