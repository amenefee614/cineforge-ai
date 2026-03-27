"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";

export default function ShotListPage() {
  const [script, setScript] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!script.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/shotlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      setOutput(data.shotlist || data.error || "No output generated.");
    } catch {
      setOutput("Error generating shot list.");
    } finally {
      setLoading(false);
    }
  };

  const exportTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shot-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        SHOT LIST GENERATOR
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Paste your script or scene description to generate a professional shot breakdown
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <GlassCard className="p-6">
            <label className="block font-studio text-xs text-muted-text tracking-widest uppercase mb-2">
              Script / Scene Description
            </label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste your script or describe the scene in detail..."
              rows={16}
              className="w-full bg-deep-surface text-on-surface font-body text-sm px-4 py-3 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40 resize-none"
            />
          </GlassCard>

          <div className="flex gap-3 mt-4">
            <button
              onClick={generate}
              disabled={loading || !script.trim()}
              className="bg-primary text-on-surface px-6 py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Shot List"}
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                Shot List Output
              </span>
              {output && (
                <button
                  onClick={exportTxt}
                  className="flex items-center gap-1 text-primary hover:text-primary-hover font-studio text-xs tracking-widest uppercase transition-colors duration-150"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export .txt
                </button>
              )}
            </div>

            <div className="min-h-[400px] max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <span className="animate-pulse font-body text-sm text-muted-text">
                    Breaking down your script...
                  </span>
                </div>
              ) : output ? (
                <pre className="font-body text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
                  {output}
                </pre>
              ) : (
                <p className="font-body text-sm text-muted-text/50 text-center mt-20">
                  Your shot list will appear here.
                </p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
