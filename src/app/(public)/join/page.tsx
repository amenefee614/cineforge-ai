"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function JoinHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      // Store referral code in cookie (30 days)
      document.cookie = `ref_code=${ref.toUpperCase()};path=/;max-age=${60 * 60 * 24 * 30}`;
    }
    router.replace("/signup");
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="font-body text-muted-text animate-pulse">Redirecting to signup...</p>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-body text-muted-text animate-pulse">Loading...</p>
      </div>
    }>
      <JoinHandler />
    </Suspense>
  );
}
