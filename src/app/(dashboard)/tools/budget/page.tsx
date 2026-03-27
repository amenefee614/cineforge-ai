"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";

interface BudgetResult {
  projectName: string;
  lineItems: { category: string; amount: number }[];
  subtotal: number;
  contingencyPercent: number;
  contingency: number;
  total: number;
}

export default function BudgetPage() {
  const [projectName, setProjectName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [aiToolCredits, setAiToolCredits] = useState(50);
  const [voiceoverCost, setVoiceoverCost] = useState(0);
  const [musicLicensing, setMusicLicensing] = useState(30);
  const [soundDesign, setSoundDesign] = useState(0);
  const [editingSoftware, setEditingSoftware] = useState(20);
  const [storageCost, setStorageCost] = useState(10);
  const [marketingBudget, setMarketingBudget] = useState(0);
  const [contingencyPercent, setContingencyPercent] = useState(10);
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tools/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName, durationMinutes, aiToolCredits, voiceoverCost,
          musicLicensing, soundDesign, editingSoftware, storageCost,
          marketingBudget, contingencyPercent,
        }),
      });
      const data = await res.json();
      setResult(data.budget);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const sliderField = (
    label: string,
    value: number,
    setter: (v: number) => void,
    max: number
  ) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="font-studio text-xs text-muted-text tracking-widest uppercase">
          {label}
        </label>
        <span className="font-studio text-xs text-primary">${value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={5}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full accent-primary h-1"
      />
    </div>
  );

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        BUDGET CALCULATOR
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Plan your AI production costs with a detailed breakdown
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <GlassCard className="p-6 space-y-5">
            <div>
              <label className="block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My AI Short Film"
                className="w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-studio text-xs text-muted-text tracking-widest uppercase">
                  Duration
                </label>
                <span className="font-studio text-xs text-primary">
                  {durationMinutes} min
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={60}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full accent-primary h-1"
              />
            </div>

            {sliderField("AI Tool Credits", aiToolCredits, setAiToolCredits, 500)}
            {sliderField("Voiceover", voiceoverCost, setVoiceoverCost, 500)}
            {sliderField("Music Licensing", musicLicensing, setMusicLicensing, 500)}
            {sliderField("Sound Design", soundDesign, setSoundDesign, 300)}
            {sliderField("Editing Software", editingSoftware, setEditingSoftware, 200)}
            {sliderField("Storage & Hosting", storageCost, setStorageCost, 100)}
            {sliderField("Marketing", marketingBudget, setMarketingBudget, 1000)}

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-studio text-xs text-muted-text tracking-widest uppercase">
                  Contingency
                </label>
                <span className="font-studio text-xs text-primary">
                  {contingencyPercent}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={contingencyPercent}
                onChange={(e) => setContingencyPercent(Number(e.target.value))}
                className="w-full accent-primary h-1"
              />
            </div>

            <button
              onClick={calculate}
              disabled={loading}
              className="w-full bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Calculate Budget"}
            </button>
          </GlassCard>
        </div>

        {/* Results */}
        <div>
          <GlassCard className="p-6">
            <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-6">
              COST BREAKDOWN
            </h3>

            {result ? (
              <div className="space-y-4">
                <h4 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase">
                  {result.projectName}
                </h4>

                <div className="space-y-2">
                  {result.lineItems.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between py-2 border-b border-border-custom/15"
                    >
                      <span className="font-body text-sm text-muted-text">
                        {item.category}
                      </span>
                      <span className="font-studio text-sm text-on-surface">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-muted-text">
                      Subtotal
                    </span>
                    <span className="font-studio text-sm text-on-surface">
                      ${result.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-muted-text">
                      Contingency ({result.contingencyPercent}%)
                    </span>
                    <span className="font-studio text-sm text-on-surface">
                      ${result.contingency.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-primary/30">
                    <span className="font-headline text-lg text-on-surface tracking-[0.05em] uppercase">
                      Total
                    </span>
                    <span className="font-headline text-2xl text-primary">
                      ${result.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Simple bar chart */}
                <div className="mt-6 space-y-2">
                  <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                    Visual Breakdown
                  </span>
                  {result.lineItems
                    .filter((item) => item.amount > 0)
                    .map((item) => (
                      <div key={item.category}>
                        <div className="flex justify-between mb-0.5">
                          <span className="font-body text-xs text-muted-text">
                            {item.category}
                          </span>
                          <span className="font-body text-xs text-muted-text">
                            {((item.amount / result.subtotal) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-2 bg-deep-surface">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                              width: `${(item.amount / result.subtotal) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="font-body text-sm text-muted-text/50 text-center">
                  Adjust the sliders and calculate to see your budget breakdown.
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
