import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — CineForge AI",
  description:
    "Choose your CineForge AI plan. Free during beta with full Pro access. No credit card required until May 1st.",
  openGraph: {
    title: "Pricing — CineForge AI",
    description: "Choose your CineForge AI plan. Free during beta.",
    images: ["/og-image.png"],
  },
};

const allFeatures = [
  { name: "AI Prompts per day", free: "5", pro: "Unlimited", studio: "Unlimited" },
  { name: "Film streaming", free: "3/month", pro: "Unlimited", studio: "Unlimited" },
  { name: "Basic Shot List", free: true, pro: true, studio: true },
  { name: "Advanced Production Tools", free: false, pro: true, studio: true },
  { name: "Cinematography Style Library", free: false, pro: true, studio: true },
  { name: "Character Bible Generator", free: false, pro: true, studio: true },
  { name: "Podcast Dashboard", free: false, pro: true, studio: true },
  { name: "CineBot Full Access", free: false, pro: true, studio: true },
  { name: "Course Library", free: false, pro: true, studio: true },
  { name: "Community Access", free: true, pro: true, studio: true },
  { name: "Priority Support", free: false, pro: true, studio: true },
  { name: "Team Collaboration", free: false, pro: false, studio: "5 seats" },
  { name: "Custom Style Presets", free: false, pro: false, studio: true },
  { name: "API Access", free: false, pro: false, studio: true },
  { name: "White-label Exports", free: false, pro: false, studio: true },
  { name: "1-on-1 Onboarding", free: false, pro: false, studio: true },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with AI filmmaking basics",
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full creative suite for serious filmmakers",
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/month",
    description: "For production teams and studios",
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Beta notice */}
          <div className="text-center mb-4">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 font-studio text-xs tracking-widest uppercase">
              ALL PLANS FREE DURING BETA
            </span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-headline text-5xl sm:text-7xl text-on-surface tracking-[0.05em] uppercase">
              PRICING
            </h1>
            <p className="font-body text-muted-text mt-4 max-w-xl mx-auto">
              Every feature is unlocked during beta. No credit card required.
              Pick your plan for when we launch.
            </p>
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {tiers.map((tier) => (
              <GlassCard
                key={tier.name}
                className={`p-8 flex flex-col relative ${
                  tier.highlighted
                    ? "border-2 border-[#9D6FE8] shadow-[0_10px_40px_rgba(157,111,232,0.3)]"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-on-surface font-studio text-[10px] tracking-widest uppercase px-4 py-1.5">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="font-headline text-3xl text-on-surface tracking-[0.05em] uppercase mt-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2 mb-2">
                  <span className="font-headline text-5xl text-on-surface">
                    {tier.price}
                  </span>
                  <span className="font-body text-muted-text text-sm">
                    {tier.period}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-text mb-6">
                  {tier.description}
                </p>

                <Link
                  href="/signup"
                  className={`block text-center py-3 font-studio text-sm tracking-widest uppercase transition-colors duration-150 ${
                    tier.highlighted
                      ? "bg-primary text-on-surface hover:bg-primary-hover"
                      : "border border-border-custom text-muted-text hover:text-on-surface hover:border-primary/50"
                  }`}
                >
                  {tier.cta}
                </Link>
              </GlassCard>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto">
            <h2 className="font-headline text-3xl text-on-surface tracking-[0.05em] uppercase text-center mb-8">
              FEATURE COMPARISON
            </h2>
            <GlassCard className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-custom/30">
                    <th className="font-studio text-xs text-muted-text tracking-widest uppercase p-4 w-1/3">
                      Feature
                    </th>
                    <th className="font-studio text-xs text-muted-text tracking-widest uppercase p-4 text-center">
                      Free
                    </th>
                    <th className="font-studio text-xs text-primary tracking-widest uppercase p-4 text-center bg-primary/5">
                      Pro
                    </th>
                    <th className="font-studio text-xs text-muted-text tracking-widest uppercase p-4 text-center">
                      Studio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr
                      key={feature.name}
                      className={i < allFeatures.length - 1 ? "border-b border-border-custom/10" : ""}
                    >
                      <td className="font-body text-sm text-on-surface p-4">
                        {feature.name}
                      </td>
                      {(["free", "pro", "studio"] as const).map((tier) => (
                        <td
                          key={tier}
                          className={`p-4 text-center ${tier === "pro" ? "bg-primary/5" : ""}`}
                        >
                          {typeof feature[tier] === "boolean" ? (
                            feature[tier] ? (
                              <span className="material-symbols-outlined text-primary text-lg">
                                check
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-muted-text/30 text-lg">
                                close
                              </span>
                            )
                          ) : (
                            <span className="font-studio text-xs text-on-surface tracking-wider">
                              {feature[tier]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
