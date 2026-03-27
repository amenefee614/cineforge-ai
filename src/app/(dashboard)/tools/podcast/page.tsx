"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";

export default function PodcastPage() {
  const [showName, setShowName] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [guests, setGuests] = useState("");
  const [duration, setDuration] = useState("30");
  const [style, setStyle] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showName, episodeTitle, topic, guests, duration, style, keyPoints }),
      });
      const data = await res.json();
      setOutput(data.script || data.error || "No output generated.");
    } catch {
      setOutput("Error generating podcast script.");
    } finally {
      setLoading(false);
    }
  };

  const exportTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${episodeTitle || "podcast-episode"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40";
  const labelClass = "block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5";

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        PODCAST EPISODE DASHBOARD
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Generate complete podcast episode scripts with structure and talking points
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Show Name</label>
                <input type="text" value={showName} onChange={(e) => setShowName(e.target.value)} placeholder="The AI Filmmaker" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Duration (min)</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Episode Title</label>
              <input type="text" value={episodeTitle} onChange={(e) => setEpisodeTitle(e.target.value)} placeholder="The Future of AI Cinema" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Topic *</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Main topic for the episode..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Guests</label>
              <input type="text" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="Guest names and titles..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Style</label>
              <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Conversational, educational, interview..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Key Points</label>
              <textarea value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} placeholder="Main points to cover..." rows={3} className={inputClass + " resize-none"} />
            </div>

            <button
              onClick={generate}
              disabled={loading || !topic}
              className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Script..." : "Generate Episode Script"}
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-studio text-xs text-muted-text tracking-widest uppercase">Episode Script</span>
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
                <span className="animate-pulse font-body text-sm text-muted-text">Writing your episode...</span>
              </div>
            ) : output ? (
              <pre className="font-body text-sm text-on-surface whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <p className="font-body text-sm text-muted-text/50 text-center mt-20">Your podcast script will appear here.</p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
