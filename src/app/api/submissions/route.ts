import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const submissions = await prisma.filmSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Submissions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { title, description, genre, duration, embedUrl, thumbnailUrl } =
      await req.json();

    if (!title || !description || !genre || !duration || !embedUrl) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const submission = await prisma.filmSubmission.create({
      data: {
        userId,
        title,
        description,
        genre,
        duration,
        embedUrl,
        thumbnailUrl: thumbnailUrl || null,
      },
    });

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error("Submission create error:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
