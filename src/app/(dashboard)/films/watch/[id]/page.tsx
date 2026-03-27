"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GlassCard from "@/components/GlassCard";

interface Film {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  embedUrl: string;
}

interface Review {
  id: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  user: { name: string | null; email: string };
}

function StarRating({
  rating,
  onRate,
  interactive = false,
  size = "text-lg",
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: string;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`${size} transition-colors ${interactive ? "cursor-pointer" : "cursor-default"}`}
        >
          <span
            className={`material-symbols-outlined ${size} ${
              star <= (hover || rating) ? "text-yellow-400" : "text-muted-text/30"
            }`}
            style={{ fontVariationSettings: star <= (hover || rating) ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        </button>
      ))}
    </div>
  );
}

export default function FilmPlayerPage() {
  const params = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [myReview, setMyReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/films/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFilm(data.film || null);
        setLoading(false);
        // Track view
        fetch("/api/films/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filmId: params.id }),
        });
      })
      .catch(() => setLoading(false));

    // Load reviews
    fetch(`/api/films/${params.id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setAvgRating(data.averageRating || 0);
        setReviewCount(data.count || 0);
      })
      .catch(() => {});
  }, [params.id]);

  const submitReview = async () => {
    if (!myRating) {
      setReviewError("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    setReviewError("");
    try {
      const res = await fetch(`/api/films/${params.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: myRating, reviewText: myReview }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReviewError(data.error || "Failed to submit review");
      } else {
        setReviews((prev) => [data.review, ...prev]);
        setReviewCount((c) => c + 1);
        const newTotal = reviews.reduce((s, r) => s + r.rating, 0) + myRating;
        setAvgRating(newTotal / (reviews.length + 1));
        setHasReviewed(true);
        setMyReview("");
      }
    } catch {
      setReviewError("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="animate-pulse bg-deep-surface aspect-video max-w-4xl" />
      </div>
    );
  }

  if (!film) {
    return (
      <div className="p-6 sm:p-8 text-center py-20">
        <span className="material-symbols-outlined text-5xl text-muted-text/30 block mb-4">
          error
        </span>
        <p className="font-body text-muted-text">Film not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Player */}
      <div className="aspect-video bg-background mb-6 relative overflow-hidden">
        <iframe
          src={film.embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Info */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="font-headline text-3xl sm:text-4xl text-on-surface tracking-[0.05em] uppercase">
            {film.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-studio text-xs text-primary tracking-widest uppercase">
              {film.genre}
            </span>
            <span className="text-muted-text/30">|</span>
            <span className="font-studio text-xs text-muted-text tracking-widest">
              {film.duration}
            </span>
            {reviewCount > 0 && (
              <>
                <span className="text-muted-text/30">|</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-studio text-xs text-on-surface">{avgRating.toFixed(1)}</span>
                  <span className="font-studio text-xs text-muted-text">({reviewCount})</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <GlassCard className="p-6 mb-8">
        <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-3">
          ABOUT THIS FILM
        </h3>
        <p className="font-body text-on-surface leading-relaxed">
          {film.description}
        </p>
      </GlassCard>

      {/* Write Review */}
      {!hasReviewed && (
        <GlassCard className="p-6 mb-8">
          <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            LEAVE A REVIEW
          </h3>
          {reviewError && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 font-body text-sm mb-4">
              {reviewError}
            </div>
          )}
          <div className="mb-4">
            <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-2">
              Your Rating
            </span>
            <StarRating rating={myRating} onRate={setMyRating} interactive size="text-2xl" />
          </div>
          <div className="mb-4">
            <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-2">
              Your Review
            </span>
            <textarea
              value={myReview}
              onChange={(e) => setMyReview(e.target.value)}
              placeholder="What did you think of this film?"
              rows={3}
              className="w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none resize-none placeholder:text-muted-text/40"
            />
          </div>
          <button
            onClick={submitReview}
            disabled={submitting || !myRating}
            className="bg-primary text-on-surface px-6 py-2.5 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </GlassCard>
      )}

      {/* Reviews */}
      <div>
        <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
          REVIEWS ({reviewCount})
        </h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <GlassCard key={review.id} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 text-primary flex items-center justify-center font-headline text-sm uppercase">
                      {(review.user.name || review.user.email)[0]}
                    </div>
                    <div>
                      <p className="font-body text-sm text-on-surface">
                        {review.user.name || review.user.email.split("@")[0]}
                      </p>
                      <p className="font-studio text-[9px] text-muted-text/50">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="text-sm" />
                </div>
                {review.reviewText && (
                  <p className="font-body text-sm text-muted-text mt-2 leading-relaxed">
                    {review.reviewText}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-muted-text/50 text-center py-8">
            No reviews yet. Be the first to review this film.
          </p>
        )}
      </div>
    </div>
  );
}
