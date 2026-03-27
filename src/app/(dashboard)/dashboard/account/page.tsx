"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import GlassCard from "@/components/GlassCard";

const BASE_URL = "https://cineforge-ai.up.railway.app";

interface AccountData {
  user: {
    id: string;
    email: string;
    name: string | null;
    tier: string;
    referralCode: string | null;
    createdAt: string;
  };
  referralCount: number;
  toolUseCount: number;
  cinebotToday: number;
}

export default function AccountPage() {
  const { data: session } = useSession();
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/account")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setAccount(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Generate referral code if user doesn't have one
  useEffect(() => {
    if (account && !account.user.referralCode) {
      fetch("/api/account/referral", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.referralCode && account) {
            setAccount({
              ...account,
              user: { ...account.user, referralCode: data.referralCode },
            });
          }
        })
        .catch(() => {});
    }
  }, [account]);

  const referralLink = account?.user.referralCode
    ? `${BASE_URL}/join?ref=${account.user.referralCode}`
    : "";

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-8 max-w-3xl">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 skeleton-shimmer border border-border-custom/20" />
          ))}
        </div>
      </div>
    );
  }

  const user = account?.user || (session?.user as any);

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-8">
        ACCOUNT
      </h1>

      <div className="space-y-6">
        {/* Profile + Tier */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 text-primary flex items-center justify-center font-headline text-2xl uppercase">
              {(user?.name || user?.email || "U")[0]}
            </div>
            <div>
              <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase">
                {user?.name || "Filmmaker"}
              </h2>
              <p className="font-body text-sm text-muted-text">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-studio text-sm bg-primary/20 text-primary px-4 py-1.5 tracking-widest uppercase font-bold">
              BETA PRO
            </span>
            <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
              Free until May 1st
            </span>
          </div>

          {account?.user.createdAt && (
            <p className="font-body text-xs text-muted-text/60 mt-3">
              Member since {new Date(account.user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          )}
        </GlassCard>

        {/* Usage Stats */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            USAGE
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-deep-surface border border-border-custom/15">
              <p className="font-headline text-3xl text-primary">
                {account?.toolUseCount ?? 0}
              </p>
              <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mt-1">
                Tool Uses
              </p>
            </div>
            <div className="text-center p-4 bg-deep-surface border border-border-custom/15">
              <p className="font-headline text-3xl text-primary">
                {account?.cinebotToday ?? 0}
              </p>
              <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mt-1">
                CineBot Today
              </p>
            </div>
            <div className="text-center p-4 bg-deep-surface border border-border-custom/15">
              <p className="font-headline text-3xl text-primary">
                {account?.referralCount ?? 0}
              </p>
              <p className="font-studio text-[10px] text-muted-text tracking-widest uppercase mt-1">
                Referrals
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Referral */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            REFERRAL PROGRAM
          </h2>
          {referralLink ? (
            <>
              <p className="font-body text-sm text-muted-text mb-4">
                Share your link and earn rewards when friends join CineForge AI.
              </p>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 truncate"
                />
                <button
                  onClick={copyReferralLink}
                  className="bg-primary text-on-surface px-4 py-2.5 font-studio text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="flex items-center gap-2 text-muted-text/60">
                <span className="material-symbols-outlined text-sm">group</span>
                <span className="font-body text-sm">
                  {account?.referralCount ?? 0} people joined with your link
                </span>
              </div>
            </>
          ) : (
            <p className="font-body text-sm text-muted-text">Loading referral link...</p>
          )}
        </GlassCard>

        {/* Upgrade (disabled until May 1st) */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            UPGRADE
          </h2>
          <p className="font-body text-sm text-muted-text mb-4">
            During the beta period, all users have full Pro-level access at no cost.
            Paid plans activate May 1st.
          </p>
          <button
            disabled
            className="bg-primary/20 text-primary/50 px-6 py-3 font-studio text-sm tracking-widest uppercase cursor-not-allowed border border-primary/20"
          >
            Paid plans activate May 1st
          </button>
          {/* ACTIVATE WITH STRIPE */}
          {/* <button className="bg-primary text-on-surface px-6 py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors">
            Manage Subscription
          </button> */}
        </GlassCard>
      </div>
    </div>
  );
}
