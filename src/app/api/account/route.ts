import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        tier: true,
        referralCode: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Count referrals
    const referralCount = await prisma.user.count({
      where: { referredById: userId },
    });

    // Count total tool uses
    const toolUseCount = await prisma.toolUsage.count({
      where: { userId },
    });

    // Count today's cinebot messages
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const cinebotToday = await prisma.cinebotMessage.count({
      where: {
        userId,
        role: "user",
        createdAt: { gte: todayStart },
      },
    });

    return NextResponse.json({
      user,
      referralCount,
      toolUseCount,
      cinebotToday,
    });
  } catch (error) {
    console.error("Account fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 });
  }
}
