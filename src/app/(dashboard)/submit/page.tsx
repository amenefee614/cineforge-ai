"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";

interface Submission {
  id: string;
  title: string;
  genre: string;
  status: string;
  createdAt: string;
}

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);

  useEffect(() => {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoadingSubs(false);
      })
      .catch(() => setLoadingSubs(false));
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, genre, duration, embedUrl, thumbnailUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed");
      } else {
        setSuccess(true);
        setTitle(""); setDescription(""); setGenre(""); setDuration("");
        setEmbedUrl(""); setThumbnailUrl("");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "approved": return "text-green-400 bg-green-400/10";
      case "rejected": return "text-red-400 bg-red-400/10";
      default: return "text-yellow-400 bg-yellow-400/10";
    }
  };

  const inputClass = "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40";
  const labelClass = "block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5";

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        SUBMIT YOUR FILM
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Submit your AI-generated film for review and inclusion in the CineForge library
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <GlassCard className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 font-body text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 p-3 text-green-400 font-body text-sm">
                Film submitted successfully! We will review it shortly.
              </div>
            )}

            <div>
              <label className={labelClass}>Film Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Your film title" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe your film..." rows={4} className={inputClass + " resize-none"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Genre *</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required placeholder="Sci-Fi, Drama, etc." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Duration *</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="5:30" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Video Embed URL *</label>
              <input type="url" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} required placeholder="https://youtube.com/embed/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Thumbnail URL (optional)</label>
              <input type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="https://..." className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </GlassCard>

        {/* Submission History */}
        <div>
          <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-4">
            YOUR SUBMISSIONS
          </h3>

          {loadingSubs ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 bg-deep-surface animate-pulse" />
              ))}
            </div>
          ) : submissions.length > 0 ? (
            <div className="space-y-2">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-deep-surface border border-border-custom/15 p-3"
                >
                  <h4 className="font-headline text-sm text-on-surface tracking-[0.05em] uppercase">
                    {sub.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-studio text-xs text-muted-text">
                      {sub.genre}
                    </span>
                    <span className={`font-studio text-xs px-1.5 py-0.5 tracking-widest uppercase ${statusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-muted-text/50">
              No submissions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
