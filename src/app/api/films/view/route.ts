import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filmId } = await req.json();
    const userId = (session.user as any).id;

    const view = await prisma.filmView.create({
      data: { userId, filmId },
    });

    return NextResponse.json({ view }, { status: 201 });
  } catch (error) {
    console.error("Film view error:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}
