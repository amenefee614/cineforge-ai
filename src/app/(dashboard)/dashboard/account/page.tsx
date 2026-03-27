"use client";

import { useSession } from "next-auth/react";
import GlassCard from "@/components/GlassCard";

const PAYMENTS_ACTIVE = false;

export default function AccountPage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-8">
        ACCOUNT
      </h1>

      <div className="space-y-6">
        {/* Profile */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            PROFILE
          </h2>
          <div className="space-y-4">
            <div>
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                Name
              </span>
              <p className="font-body text-on-surface">
                {user?.name || "Not set"}
              </p>
            </div>
            <div>
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                Email
              </span>
              <p className="font-body text-on-surface">{user?.email}</p>
            </div>
          </div>
        </GlassCard>

        {/* Tier */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            SUBSCRIPTION
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-studio text-sm bg-primary/20 text-primary px-3 py-1 tracking-widest uppercase">
              {user?.tier || "pro"} tier
            </span>
            {!PAYMENTS_ACTIVE && (
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                Beta — Free until May 1st
              </span>
            )}
          </div>
          {!PAYMENTS_ACTIVE && (
            <p className="font-body text-sm text-muted-text">
              During the beta period, all users have full Pro-level access at no
              cost. Billing will activate after the beta ends.
            </p>
          )}
          {/* ACTIVATE MAY 1 */}
          {/* {PAYMENTS_ACTIVE && (
            <div className="mt-4 space-y-3">
              <button className="bg-primary text-on-surface px-4 py-2 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150">
                Manage Subscription
              </button>
              <button className="block text-muted-text font-studio text-xs tracking-widest uppercase hover:text-on-surface transition-colors duration-150">
                View Billing History
              </button>
            </div>
          )} */}
        </GlassCard>

        {/* Usage */}
        <GlassCard className="p-6">
          <h2 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-4">
            USAGE
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                Prompts Generated
              </span>
              <p className="font-headline text-2xl text-primary">UNLIMITED</p>
            </div>
            <div>
              <span className="font-studio text-xs text-muted-text tracking-widest uppercase block mb-1">
                Films Watched
              </span>
              <p className="font-headline text-2xl text-primary">UNLIMITED</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
