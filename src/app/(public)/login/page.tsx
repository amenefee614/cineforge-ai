"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 page-transition">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-headline text-5xl text-on-surface tracking-[0.05em] uppercase">
              WELCOME BACK
            </h1>
            <p className="font-body text-muted-text mt-2">
              Sign in to your CineForge AI studio
            </p>
          </div>

          <div className="bg-[rgba(157,111,232,0.08)] border border-[rgba(157,111,232,0.25)] backdrop-blur-[12px] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 font-body text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-studio text-xs text-muted-text tracking-widest uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-deep-surface text-on-surface font-body px-4 py-3 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label className="block font-studio text-xs text-muted-text tracking-widest uppercase mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-deep-surface text-on-surface font-body px-4 py-3 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40"
                  placeholder="Your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Enter Studio"}
              </button>
            </form>

            <p className="text-center font-body text-sm text-muted-text mt-6">
              New filmmaker?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary-hover transition-colors duration-150"
              >
                Create your studio
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
