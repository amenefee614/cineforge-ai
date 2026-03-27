import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouter, callOpenRouterWithHistory } from "@/lib/openrouter";
import { CINEBOT_SYSTEM_PROMPT, MODEL_PROMPTS, SHOTLIST_PROMPT } from "@/lib/prompts";
import prisma from "@/lib/prisma";

function detectToolIntent(message: string): { tool: string; link: string; type: string } | null {
  const lower = message.toLowerCase();

  const prompterKeywords = [
    "generate a prompt", "codex prompt", "video prompt", "create a prompt",
    "write a prompt", "make a prompt", "prompter", "cinematic prompt",
    "generate a codex", "ai prompt", "generate a cod", "codex",
    "direct-to-screen", "generate prompt"
  ];
  const shotlistKeywords = [
    "shot list", "shotlist", "shot breakdown", "scene breakdown",
    "storyboard", "break down this script", "break down my script",
    "build a shot", "create a shot list"
  ];
  const budgetKeywords = [
    "budget", "estimate", "cost", "how much", "pricing breakdown",
    "production cost", "estimate my budget", "budget estimate"
  ];
  const styleKeywords = [
    "visual style", "recommend a style", "cinematography style",
    "director style", "lighting style", "film style", "recommend a visual",
    "what style", "suggest a style"
  ];

  if (prompterKeywords.some((k) => lower.includes(k))) {
    return { tool: "Prompter", link: "/tools/prompter", type: "prompter" };
  }
  if (shotlistKeywords.some((k) => lower.includes(k))) {
    return { tool: "Shot List", link: "/tools/shotlist", type: "shotlist" };
  }
  if (budgetKeywords.some((k) => lower.includes(k))) {
    return { tool: "Budget Calculator", link: "/tools/budget", type: "budget" };
  }
  if (styleKeywords.some((k) => lower.includes(k))) {
    return { tool: "Style Library", link: "/tools/styles", type: "style" };
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
    const recentMessages = messages.slice(-10);

    let reply: string;
    let toolUsed: string | null = null;
    let toolLink: string | null = null;

    if (toolIntent) {
      toolUsed = toolIntent.tool;
      toolLink = toolIntent.link;

      if (toolIntent.type === "prompter") {
        const prompterSystem = MODEL_PROMPTS["seedance-2.0"];
        const userContext = `Based on this user request, generate a complete CODEx cinematic prompt:\n\n${lastUserMsg}\n\nGenerate a detailed, production-ready CODEx prompt with subject, action, camera, lighting, color grade, and audio texture. End with the CODEx tag.`;

        try {
          const promptResult = await callOpenRouter(prompterSystem, userContext, 1500);
          reply = `Here's your CODEx prompt:\n\n${promptResult}`;
        } catch {
          reply = await callOpenRouterWithHistory(
            `${CINEBOT_SYSTEM_PROMPT}\n\nThe user wants a CODEx prompt. Generate one directly in your response. Be detailed and professional.`,
            recentMessages,
            1200
          );
        }
      } else if (toolIntent.type === "shotlist") {
        const scriptContent = lastUserMsg.replace(/shot\s*list|shotlist|build a shot|create a shot list/gi, "").trim();
        const shotInput = scriptContent.length > 20 ? scriptContent : `Create a professional 5-shot breakdown for: ${lastUserMsg}`;

        try {
          const shotResult = await callOpenRouter(SHOTLIST_PROMPT, shotInput, 2000);
          reply = `Here's your shot breakdown:\n\n${shotResult}`;
        } catch {
          reply = await callOpenRouterWithHistory(
            `${CINEBOT_SYSTEM_PROMPT}\n\nThe user wants a shot list. Generate a detailed shot breakdown with shot numbers, types, camera movements, and descriptions.`,
            recentMessages,
            1500
          );
        }
      } else if (toolIntent.type === "budget") {
        const budgetPrompt = `${CINEBOT_SYSTEM_PROMPT}\n\nThe user is asking about budget/costs. Help them estimate their AI film production budget. Ask about: project duration, AI tool credits needed, voiceover, music licensing, sound design, editing software, storage, and marketing. If they've provided enough info, calculate a breakdown with line items and a total. Format numbers as currency. Be conversational but precise.`;
        reply = await callOpenRouterWithHistory(budgetPrompt, recentMessages, 1000);
      } else if (toolIntent.type === "style") {
        const stylePrompt = `${CINEBOT_SYSTEM_PROMPT}\n\nThe user wants a visual style recommendation. Recommend 2-3 cinematography styles from the CineForge Style Library (e.g., Neon Noir inspired by Nicolas Winding Refn, Naturalistic Drama inspired by Terrence Malick, Cyberpunk inspired by Ridley Scott, Wes Anderson Symmetry, etc.). For each style, describe: mood, lighting approach, camera technique, and color palette. Be specific and cinematic.`;
        reply = await callOpenRouterWithHistory(stylePrompt, recentMessages, 1000);
      } else {
        reply = await callOpenRouterWithHistory(CINEBOT_SYSTEM_PROMPT, recentMessages, 800);
      }
    } else {
      reply = await callOpenRouterWithHistory(
        CINEBOT_SYSTEM_PROMPT,
        recentMessages,
        800
      );
    }

    // Persist messages
    if (conversationId) {
      try {
        await prisma.cinebotMessage.createMany({
          data: [
            { userId, role: "user", content: lastUserMsg, conversationId },
            { userId, role: "assistant", content: reply, conversationId },
          ],
        });

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
        } else if (convo) {
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
