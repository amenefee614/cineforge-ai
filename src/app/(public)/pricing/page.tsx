import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with AI filmmaking basics",
    features: [
      "5 prompts/day",
      "3 film views/month",
      "Basic shot list generator",
      "Community access",
      "CineBot (limited)",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full creative suite for serious filmmakers",
    features: [
      "Unlimited prompts",
      "Unlimited film streaming",
      "All production tools",
      "Cinematography Style Library",
      "Character Bible Generator",
      "Podcast Dashboard",
      "CineBot (full access)",
      "Course library",
      "Priority support",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/month",
    description: "For production teams and studios",
    features: [
      "Everything in Pro",
      "Team collaboration (5 seats)",
      "Custom style presets",
      "API access",
      "White-label exports",
      "Dedicated CineBot persona",
      "Priority film submissions",
      "1-on-1 onboarding",
    ],
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <GlassCard
                key={tier.name}
                className={`p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-primary/50 shadow-[0_10px_40px_rgba(157,111,232,0.3)]"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <span className="font-studio text-xs text-primary tracking-widest uppercase mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-headline text-3xl text-on-surface tracking-[0.05em] uppercase">
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

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 font-body text-sm text-on-surface"
                    >
                      <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">
                        check
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

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
        </div>
      </main>
      <Footer />
    </div>
  );
}
