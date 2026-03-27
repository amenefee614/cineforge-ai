import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouterWithHistory } from "@/lib/openrouter";
import { CINEBOT_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Take only last 10 messages for context window
    const recentMessages = messages.slice(-10);

    const result = await callOpenRouterWithHistory(
      CINEBOT_SYSTEM_PROMPT,
      recentMessages,
      800
    );

    return NextResponse.json({ reply: result });
  } catch (error) {
    console.error("CineBot error:", error);
    return NextResponse.json(
      { error: "CineBot is temporarily unavailable" },
      { status: 500 }
    );
  }
}
