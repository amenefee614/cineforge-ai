"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/GlassCard";

interface Stats {
  users: { total: number; free: number; pro: number; studio: number };
  cinebot: { today: number; week: number; month: number };
  recentUsers: {
    id: string;
    email: string;
    name: string | null;
    tier: string;
    createdAt: string;
  }[];
  pendingSubmissions: {
    id: string;
    title: string;
    genre: string;
    description: string;
    createdAt: string;
    user: { email: string; name: string | null };
  }[];
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    fetch("/api/admin/stats")
      .then((res) => {
        if (res.status === 403) throw new Error("forbidden");
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "forbidden") {
          setError("Access denied. Admin only.");
        } else {
          setError("Failed to load admin data.");
        }
        setLoading(false);
      });
  }, [status, router]);

  const handleSubmission = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      // Refresh stats
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch {
      // handle error
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 skeleton-shimmer border border-border-custom/20" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 sm:p-8">
        <GlassCard className="p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-red-400 block mb-4">
            shield
          </span>
          <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase mb-2">
            {error}
          </h2>
          <p className="font-body text-sm text-muted-text">
            This page is restricted to admin users.
          </p>
        </GlassCard>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface tracking-[0.05em] uppercase">
          ADMIN DASHBOARD
        </h1>
        <p className="font-body text-sm text-muted-text mt-1">
          Platform management and analytics
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats.users.total, icon: "group" },
          { label: "Free Tier", value: stats.users.free, icon: "person" },
          { label: "Pro Tier", value: stats.users.pro, icon: "star" },
          { label: "Studio Tier", value: stats.users.studio, icon: "workspace_premium" },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-5">
            <span className="material-symbols-outlined text-primary text-2xl mb-2 block">
              {stat.icon}
            </span>
            <p className="font-headline text-3xl text-on-surface">{stat.value}</p>
            <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mt-1">
              {stat.label}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* CineBot Usage */}
      <GlassCard className="p-6 mb-8">
        <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
          CINEBOT USAGE
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Today", value: stats.cinebot.today },
            { label: "This Week", value: stats.cinebot.week },
            { label: "This Month", value: stats.cinebot.month },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-deep-surface border border-border-custom/15">
              <p className="font-headline text-3xl text-primary">{stat.value}</p>
              <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Pending Film Submissions */}
      <GlassCard className="p-6 mb-8">
        <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
          PENDING SUBMISSIONS ({stats.pendingSubmissions.length})
        </h2>
        {stats.pendingSubmissions.length > 0 ? (
          <div className="space-y-3">
            {stats.pendingSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-deep-surface border border-border-custom/15 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline text-sm text-on-surface tracking-[0.05em] uppercase">
                    {sub.title}
                  </h4>
                  <p className="font-body text-xs text-muted-text mt-0.5">
                    {sub.genre} &middot; by {sub.user.name || sub.user.email}
                  </p>
                  <p className="font-body text-xs text-muted-text/60 mt-0.5 line-clamp-2">
                    {sub.description}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleSubmission(sub.id, "approve")}
                    disabled={actionLoading === sub.id}
                    className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 font-studio text-[10px] tracking-widest uppercase hover:bg-green-500/30 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === sub.id ? "..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleSubmission(sub.id, "reject")}
                    disabled={actionLoading === sub.id}
                    className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 font-studio text-[10px] tracking-widest uppercase hover:bg-red-500/30 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === sub.id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-muted-text/50 text-center py-6">
            No pending submissions
          </p>
        )}
      </GlassCard>

      {/* Recent Signups */}
      <GlassCard className="p-6">
        <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
          RECENT SIGNUPS
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-custom/20">
                <th className="font-studio text-[10px] text-muted-text tracking-widest uppercase py-2 pr-4">Email</th>
                <th className="font-studio text-[10px] text-muted-text tracking-widest uppercase py-2 pr-4">Name</th>
                <th className="font-studio text-[10px] text-muted-text tracking-widest uppercase py-2 pr-4">Tier</th>
                <th className="font-studio text-[10px] text-muted-text tracking-widest uppercase py-2">Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-border-custom/10">
                  <td className="font-body text-sm text-on-surface py-2.5 pr-4">{user.email}</td>
                  <td className="font-body text-sm text-muted-text py-2.5 pr-4">{user.name || "—"}</td>
                  <td className="py-2.5 pr-4">
                    <span className="font-studio text-[10px] tracking-widest uppercase bg-primary/15 text-primary px-2 py-0.5">
                      {user.tier}
                    </span>
                  </td>
                  <td className="font-body text-xs text-muted-text/60 py-2.5">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
