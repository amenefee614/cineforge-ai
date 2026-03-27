"use client";

const PAYMENTS_ACTIVE = false;

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  // ACTIVATE MAY 1 — Hidden during beta
  if (!PAYMENTS_ACTIVE || !open) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-surface border border-border-custom/50 p-8 max-w-md w-full mx-4">
        <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase mb-4">
          Upgrade Your Plan
        </h2>
        <p className="font-body text-muted-text mb-6">
          Unlock unlimited access to all CineForge AI tools, the full film
          library, and priority CineBot responses.
        </p>
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-on-surface py-3 font-studio text-sm tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150">
            Upgrade to Pro
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-border-custom text-muted-text py-3 font-studio text-sm tracking-widest uppercase hover:text-on-surface transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
