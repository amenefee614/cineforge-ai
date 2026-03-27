import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: list recent conversations for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 50,
        },
      },
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Conversations fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}

// POST: create a new conversation
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Limit to 5 conversations — delete oldest if over limit
    const count = await prisma.conversation.count({ where: { userId } });
    if (count >= 5) {
      const oldest = await prisma.conversation.findFirst({
        where: { userId },
        orderBy: { updatedAt: "asc" },
      });
      if (oldest) {
        await prisma.cinebotMessage.deleteMany({ where: { conversationId: oldest.id } });
        await prisma.conversation.delete({ where: { id: oldest.id } });
      }
    }

    const conversation = await prisma.conversation.create({
      data: { userId, title: "New Chat" },
    });

    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error) {
    console.error("Conversation create error:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}
