import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { completed } = await req.json();

    const progress = await prisma.courseProgress.upsert({
      where: {
        userId_courseId: { userId, courseId: params.id },
      },
      update: {
        completed: completed ?? false,
        lastWatched: new Date(),
      },
      create: {
        userId,
        courseId: params.id,
        completed: completed ?? false,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Course progress error:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
