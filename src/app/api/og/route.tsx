import { NextResponse } from "next/server";

// Generate a simple branded SVG as OG image fallback
export async function GET() {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0A0A0F"/>
    <rect x="0" y="0" width="1200" height="630" fill="url(#grad)" opacity="0.3"/>
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4A2D8F;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#9D6FE8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4A2D8F;stop-opacity:1" />
      </linearGradient>
    </defs>
    <text x="600" y="260" font-family="sans-serif" font-size="90" font-weight="900" fill="#F5F3FF" text-anchor="middle" letter-spacing="8">CINEFORGE AI</text>
    <text x="600" y="340" font-family="sans-serif" font-size="28" fill="#9D6FE8" text-anchor="middle" letter-spacing="12">WHERE AI FILMMAKERS ARE MADE</text>
    <line x1="450" y1="380" x2="750" y2="380" stroke="#9D6FE8" stroke-width="2" opacity="0.5"/>
    <text x="600" y="420" font-family="sans-serif" font-size="18" fill="#A89EC4" text-anchor="middle" letter-spacing="6">PRODUCTION TOOLS • FILM LIBRARY • COURSES • COMMUNITY</text>
    <text x="600" y="540" font-family="sans-serif" font-size="14" fill="#9D6FE8" text-anchor="middle" letter-spacing="4">POWERED BY THE CODEX CINEMATIC SYSTEM</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
