"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  // Read referral code from cookie or URL
  useEffect(() => {
    // Check URL param first
    const refParam = searchParams.get("ref");
    if (refParam) {
      setReferralCode(refParam.toUpperCase());
      return;
    }
    // Check cookie
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const refCookie = cookies.find((c) => c.startsWith("ref_code="));
    if (refCookie) {
      setReferralCode(refCookie.split("=")[1]);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referralCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Clear referral cookie
      document.cookie = "ref_code=;path=/;max-age=0";

      // Auto sign-in after signup
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but login failed. Try logging in.");
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
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl text-on-surface tracking-[0.05em] uppercase">
          CREATE YOUR STUDIO
        </h1>
        <p className="font-body text-muted-text mt-2">
          Free during beta — full Pro access, no credit card
        </p>
        {referralCode && (
          <p className="font-studio text-xs text-primary tracking-widest uppercase mt-2">
            Referred by a friend
          </p>
        )}
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
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-deep-surface text-on-surface font-body px-4 py-3 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40"
              placeholder="Your name"
            />
          </div>

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
              minLength={8}
              className="w-full bg-deep-surface text-on-surface font-body px-4 py-3 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40"
              placeholder="Min 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating studio..." : "Enter Studio — Free"}
          </button>
        </form>

        <p className="text-center font-body text-sm text-muted-text mt-6">
          Already have a studio?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary-hover transition-colors duration-150"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 page-transition">
        <Suspense fallback={
          <div className="w-full max-w-md h-96 skeleton-shimmer" />
        }>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
