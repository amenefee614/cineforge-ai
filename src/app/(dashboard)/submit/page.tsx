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

const MAX_DESCRIPTION = 500;

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
        body: JSON.stringify({
          title,
          description,
          genre,
          duration,
          embedUrl,
          thumbnailUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed");
      } else {
        setSuccess(true);
        setTitle("");
        setDescription("");
        setGenre("");
        setDuration("");
        setEmbedUrl("");
        setThumbnailUrl("");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "approved":
        return "text-green-400 bg-green-400/10 border border-green-400/30";
      case "rejected":
        return "text-red-400 bg-red-400/10 border border-red-400/30";
      default:
        return "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30";
    }
  };

  const inputClass =
    "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40";
  const labelClass =
    "block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5";

  const isValidEmbed =
    embedUrl &&
    (embedUrl.includes("youtube.com/embed") ||
      embedUrl.includes("player.vimeo.com") ||
      embedUrl.startsWith("https://"));

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        SUBMIT YOUR FILM
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Submit your AI-generated film for review and inclusion in the CineForge
        library
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
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
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Your film title"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Description *{" "}
                  <span
                    className={`ml-2 ${
                      description.length > MAX_DESCRIPTION
                        ? "text-red-400"
                        : "text-muted-text/50"
                    }`}
                  >
                    {description.length}/{MAX_DESCRIPTION}
                  </span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value.slice(0, MAX_DESCRIPTION))
                  }
                  required
                  placeholder="Describe your film..."
                  rows={4}
                  className={inputClass + " resize-none"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Genre *</label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    placeholder="Sci-Fi, Drama, etc."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Duration *</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    placeholder="5:30"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Video Embed URL *</label>
                <input
                  type="url"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  required
                  placeholder="https://youtube.com/embed/..."
                  className={inputClass}
                />
              </div>

              {/* Embed Preview */}
              {isValidEmbed && (
                <div className="border border-border-custom/20 bg-deep-surface p-2">
                  <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mb-2">
                    EMBED PREVIEW
                  </p>
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={embedUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={labelClass}>Thumbnail URL (optional)</label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
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
        </div>

        {/* Submission History */}
        <div>
          <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-4">
            YOUR SUBMISSIONS
          </h3>

          {loadingSubs ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 skeleton-shimmer border border-border-custom/20"
                />
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
                    <span
                      className={`font-studio text-[10px] px-2 py-0.5 tracking-widest uppercase ${statusColor(
                        sub.status
                      )}`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="font-body text-[10px] text-muted-text/40 mt-1">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
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
