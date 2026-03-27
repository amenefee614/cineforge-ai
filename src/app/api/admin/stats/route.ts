import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const devMode = !adminEmail;

    // In production (ADMIN_EMAIL set): require auth + matching email
    if (!devMode) {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (session.user.email !== adminEmail) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalUsers,
      freeUsers,
      proUsers,
      studioUsers,
      botMessagesToday,
      botMessagesWeek,
      botMessagesMonth,
      recentUsers,
      pendingSubmissions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { tier: "free" } }),
      prisma.user.count({ where: { tier: "pro" } }),
      prisma.user.count({ where: { tier: "studio" } }),
      prisma.cinebotMessage.count({ where: { role: "user", createdAt: { gte: todayStart } } }),
      prisma.cinebotMessage.count({ where: { role: "user", createdAt: { gte: weekStart } } }),
      prisma.cinebotMessage.count({ where: { role: "user", createdAt: { gte: monthStart } } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, email: true, name: true, tier: true, createdAt: true },
      }),
      prisma.filmSubmission.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { email: true, name: true } } },
      }),
    ]);

    return NextResponse.json({
      devMode,
      users: { total: totalUsers, free: freeUsers, pro: proUsers, studio: studioUsers },
      cinebot: { today: botMessagesToday, week: botMessagesWeek, month: botMessagesMonth },
      recentUsers,
      pendingSubmissions,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
