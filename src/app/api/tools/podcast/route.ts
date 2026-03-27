import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouter } from "@/lib/openrouter";
import { PODCAST_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { showName, episodeTitle, topic, guests, duration, style, keyPoints } =
      await req.json();

    let userInput = `Create a podcast episode script:\n`;
    if (showName) userInput += `Show: ${showName}\n`;
    if (episodeTitle) userInput += `Episode Title: ${episodeTitle}\n`;
    if (topic) userInput += `Topic: ${topic}\n`;
    if (guests) userInput += `Guests: ${guests}\n`;
    if (duration) userInput += `Duration: ${duration} minutes\n`;
    if (style) userInput += `Style: ${style}\n`;
    if (keyPoints) userInput += `Key Points: ${keyPoints}\n`;

    const result = await callOpenRouter(PODCAST_PROMPT, userInput, 2000);

    return NextResponse.json({ script: result });
  } catch (error) {
    console.error("Podcast error:", error);
    return NextResponse.json(
      { error: "Failed to generate podcast script" },
      { status: 500 }
    );
  }
}
