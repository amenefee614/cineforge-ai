import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouter } from "@/lib/openrouter";
import { SHOTLIST_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { script } = await req.json();

    if (!script) {
      return NextResponse.json(
        { error: "Script content is required" },
        { status: 400 }
      );
    }

    const result = await callOpenRouter(SHOTLIST_PROMPT, script, 2000);

    return NextResponse.json({ shotlist: result });
  } catch (error) {
    console.error("Shot list error:", error);
    return NextResponse.json(
      { error: "Failed to generate shot list" },
      { status: 500 }
    );
  }
}
