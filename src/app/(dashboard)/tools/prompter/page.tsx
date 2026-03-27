"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";

const models = [
  { id: "seedance-2.0", label: "Seedance 2.0" },
  { id: "kling-3.0", label: "Kling 3.0" },
  { id: "hailuo-2.3", label: "Hailuo 2.3" },
  { id: "wan-2.6", label: "WAN 2.6" },
  { id: "veo-3", label: "Veo 3" },
  { id: "runway", label: "Runway" },
  { id: "luma-ray-3", label: "Luma Ray 3" },
];

const shotSizes = ["Extreme Wide", "Wide", "Medium Wide", "Medium", "Medium Close-Up", "Close-Up", "Extreme Close-Up", "Insert"];
const cameraMovements = ["Static", "Pan Left", "Pan Right", "Tilt Up", "Tilt Down", "Dolly In", "Dolly Out", "Tracking", "Steadicam", "Handheld", "Crane Up", "Crane Down", "Orbit", "Whip Pan", "Rack Focus"];
const lenses = ["12mm", "18mm", "24mm", "27mm", "35mm", "50mm", "85mm", "100mm Macro", "135mm", "200mm"];
const apertures = ["f/1.2", "f/1.4", "f/1.8", "f/2.0", "f/2.8", "f/4.0", "f/5.6", "f/8.0", "f/11", "f/16"];

export default function PrompterPage() {
  const [selectedModel, setSelectedModel] = useState("seedance-2.0");
  const [subject, setSubject] = useState("");
  const [action, setAction] = useState("");
  const [scene, setScene] = useState("");
  const [shotSize, setShotSize] = useState("");
  const [cameraMovement, setCameraMovement] = useState("");
  const [lens, setLens] = useState("");
  const [aperture, setAperture] = useState("");
  const [colorGrade, setColorGrade] = useState("");
  const [audioTexture, setAudioTexture] = useState("");
  const [multiShot, setMultiShot] = useState(false);
  const [imageToVideo, setImageToVideo] = useState(false);
  const [clientNotes, setClientNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async (variations = false) => {
    if (!subject) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/prompter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          subject, action, scene, shotSize, cameraMovement, lens, aperture,
          colorGrade, audioTexture, multiShot, imageToVideo, clientNotes,
          variations,
        }),
      });

      const data = await res.json();
      setOutput(data.prompt || data.error || "No output generated.");
    } catch {
      setOutput("Error generating prompt. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSubject(""); setAction(""); setScene(""); setShotSize("");
    setCameraMovement(""); setLens(""); setAperture(""); setColorGrade("");
    setAudioTexture(""); setMultiShot(false); setImageToVideo(false);
    setClientNotes(""); setOutput("");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectClass = "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none appearance-none";
  const inputClass = "w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/40";
  const labelClass = "block font-studio text-xs text-muted-text tracking-widest uppercase mb-1.5";

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase mb-2">
        AI JEDI DS PROMPTER
      </h1>
      <p className="font-body text-sm text-muted-text mb-6">
        Generate CODEx-optimized cinematic prompts for any AI video model
      </p>

      {/* Model Tabs */}
      <div className="flex flex-wrap gap-1 mb-8 overflow-x-auto">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`font-studio text-xs tracking-widest uppercase px-4 py-2.5 whitespace-nowrap transition-colors duration-150 ${
              selectedModel === model.id
                ? "bg-primary text-on-surface"
                : "bg-deep-surface text-muted-text hover:text-on-surface"
            }`}
          >
            {model.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Subject *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., A woman in a red dress"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Action / Physics</label>
                <input
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="e.g., walks through rain, hair moving in wind"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Scene / Environment</label>
                <input
                  type="text"
                  value={scene}
                  onChange={(e) => setScene(e.target.value)}
                  placeholder="e.g., neon-lit Tokyo alley at night"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Shot Size</label>
                <select
                  value={shotSize}
                  onChange={(e) => setShotSize(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  {shotSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Camera Movement</label>
                <select
                  value={cameraMovement}
                  onChange={(e) => setCameraMovement(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  {cameraMovements.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Lens</label>
                <select
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  {lenses.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Aperture</label>
                <select
                  value={aperture}
                  onChange={(e) => setAperture(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  {apertures.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Color Grade</label>
                <input
                  type="text"
                  value={colorGrade}
                  onChange={(e) => setColorGrade(e.target.value)}
                  placeholder="e.g., teal-orange, desaturated cool tones"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Audio Texture</label>
                <input
                  type="text"
                  value={audioTexture}
                  onChange={(e) => setAudioTexture(e.target.value)}
                  placeholder="e.g., distant thunder, lo-fi vinyl crackle"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Client Notes</label>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Any additional direction or notes..."
                  rows={3}
                  className={inputClass + " resize-none"}
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={multiShot}
                    onChange={(e) => setMultiShot(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                    Multi-Shot
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={imageToVideo}
                    onChange={(e) => setImageToVideo(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-studio text-xs text-muted-text tracking-widest uppercase">
                    Image-to-Video
                  </span>
                </label>
              </div>
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => generate(false)}
              disabled={loading || !subject}
              className="bg-primary text-on-surface px-6 py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Generating...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Generate
                </>
              )}
            </button>
            <button
              onClick={() => generate(true)}
              disabled={loading || !subject}
              className="border border-border-custom text-muted-text px-6 py-3 font-studio text-sm tracking-widest uppercase hover:text-on-surface hover:border-primary/50 transition-all duration-150 disabled:opacity-50"
            >
              Variations
            </button>
            <button
              onClick={clearAll}
              className="border border-border-custom/30 text-muted-text/60 px-6 py-3 font-studio text-sm tracking-widest uppercase hover:text-muted-text transition-colors duration-150"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output Sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase">
                OUTPUT
              </h3>
              {output && (
                <button
                  onClick={copyOutput}
                  className="flex items-center gap-1 text-primary hover:text-primary-hover transition-colors duration-150 font-studio text-xs tracking-widest uppercase"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>

            <div className="min-h-[300px] max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-3xl text-primary animate-pulse">
                      auto_awesome
                    </span>
                    <p className="font-body text-sm text-muted-text mt-2">
                      Generating cinematic prompt...
                    </p>
                  </div>
                </div>
              ) : output ? (
                <pre className="font-body text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="font-body text-sm text-muted-text/50 text-center">
                    Fill in the fields and hit Generate to create your CODEx prompt.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
