import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      projectName,
      durationMinutes,
      aiToolCredits,
      voiceoverCost,
      musicLicensing,
      soundDesign,
      editingSoftware,
      storageCost,
      marketingBudget,
      contingencyPercent,
    } = await req.json();

    const subtotal =
      (aiToolCredits || 0) +
      (voiceoverCost || 0) +
      (musicLicensing || 0) +
      (soundDesign || 0) +
      (editingSoftware || 0) +
      (storageCost || 0) +
      (marketingBudget || 0);

    const contingency = subtotal * ((contingencyPercent || 10) / 100);
    const total = subtotal + contingency;

    const breakdown = {
      projectName: projectName || "Untitled Project",
      durationMinutes: durationMinutes || 0,
      lineItems: [
        { category: "AI Tool Credits", amount: aiToolCredits || 0 },
        { category: "Voiceover", amount: voiceoverCost || 0 },
        { category: "Music Licensing", amount: musicLicensing || 0 },
        { category: "Sound Design", amount: soundDesign || 0 },
        { category: "Editing Software", amount: editingSoftware || 0 },
        { category: "Storage & Hosting", amount: storageCost || 0 },
        { category: "Marketing", amount: marketingBudget || 0 },
      ],
      subtotal,
      contingencyPercent: contingencyPercent || 10,
      contingency,
      total,
    };

    return NextResponse.json({ budget: breakdown });
  } catch (error) {
    console.error("Budget error:", error);
    return NextResponse.json(
      { error: "Failed to calculate budget" },
      { status: 500 }
    );
  }
}
