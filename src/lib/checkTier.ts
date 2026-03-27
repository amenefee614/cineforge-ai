const PAYMENTS_ACTIVE = false;

const tiers: Record<string, number> = { free: 0, pro: 1, studio: 2 };

export function checkTier(userTier: string, requiredTier: string): boolean {
  if (!PAYMENTS_ACTIVE) return true; // Beta: everyone has access
  return (tiers[userTier] || 0) >= (tiers[requiredTier] || 0);
}
