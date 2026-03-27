import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouter } from "@/lib/openrouter";
import { CHARACTER_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, age, role, personality, appearance, backstory } =
      await req.json();

    let userInput = `Create a Character Bible for:\n`;
    if (name) userInput += `Name: ${name}\n`;
    if (age) userInput += `Age: ${age}\n`;
    if (role) userInput += `Role: ${role}\n`;
    if (personality) userInput += `Personality: ${personality}\n`;
    if (appearance) userInput += `Appearance: ${appearance}\n`;
    if (backstory) userInput += `Backstory: ${backstory}\n`;

    const result = await callOpenRouter(CHARACTER_PROMPT, userInput, 2000);

    return NextResponse.json({ bible: result });
  } catch (error) {
    console.error("Character error:", error);
    return NextResponse.json(
      { error: "Failed to generate character bible" },
      { status: 500 }
    );
  }
}
