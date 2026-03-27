import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouterWithHistory } from "@/lib/openrouter";
import { CINEBOT_SYSTEM_PROMPT } from "@/lib/prompts";
import prisma from "@/lib/prisma";

function detectToolIntent(message: string): { tool: string; endpoint: string } | null {
  const lower = message.toLowerCase();

  const prompterKeywords = [
    "generate a prompt", "codex prompt", "video prompt", "create a prompt",
    "write a prompt", "make a prompt", "prompter", "cinematic prompt",
    "generate a codex", "ai prompt"
  ];
  const shotlistKeywords = [
    "shot list", "shotlist", "shot breakdown", "scene breakdown",
    "storyboard", "break down this script", "break down my script"
  ];

  if (prompterKeywords.some((k) => lower.includes(k))) {
    return { tool: "Prompter", endpoint: "/api/tools/prompter" };
  }
  if (shotlistKeywords.some((k) => lower.includes(k))) {
    return { tool: "Shot List", endpoint: "/api/tools/shotlist" };
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { messages, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const lastUserMsg = messages[messages.length - 1]?.content || "";
    const toolIntent = detectToolIntent(lastUserMsg);

    // Take only last 10 messages for context window
    const recentMessages = messages.slice(-10);

    let reply: string;
    let toolUsed: string | null = null;
    let toolLink: string | null = null;

    if (toolIntent) {
      // Enhance the system prompt to instruct CineBot to use the tool
      const enhancedPrompt = `${CINEBOT_SYSTEM_PROMPT}\n\nIMPORTANT: The user wants to use the ${toolIntent.tool} tool. Generate the output they need directly. For prompter requests, generate a complete CODEx cinematic prompt. For shot list requests, generate a structured shot breakdown. Be detailed and professional. Format the output clearly.`;

      reply = await callOpenRouterWithHistory(enhancedPrompt, recentMessages, 1200);
      toolUsed = toolIntent.tool;
      toolLink = toolIntent.endpoint === "/api/tools/prompter" ? "/tools/prompter" : "/tools/shotlist";
    } else {
      reply = await callOpenRouterWithHistory(
        CINEBOT_SYSTEM_PROMPT,
        recentMessages,
        800
      );
    }

    // Persist messages to database if conversationId provided
    if (conversationId) {
      try {
        await prisma.cinebotMessage.createMany({
          data: [
            { userId, role: "user", content: lastUserMsg, conversationId },
            { userId, role: "assistant", content: reply, conversationId },
          ],
        });

        // Update conversation title from first user message
        const convo = await prisma.conversation.findUnique({
          where: { id: conversationId },
        });
        if (convo && convo.title === "New Chat") {
          const title = lastUserMsg.length > 40
            ? lastUserMsg.substring(0, 40) + "..."
            : lastUserMsg;
          await prisma.conversation.update({
            where: { id: conversationId },
            data: { title, updatedAt: new Date() },
          });
        } else {
          await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
          });
        }
      } catch (err) {
        console.error("Failed to persist cinebot message:", err);
      }
    }

    return NextResponse.json({
      reply,
      toolUsed,
      toolLink,
    });
  } catch (error) {
    console.error("CineBot error:", error);
    return NextResponse.json(
      { error: "CineBot is temporarily unavailable" },
      { status: 500 }
    );
  }
}
