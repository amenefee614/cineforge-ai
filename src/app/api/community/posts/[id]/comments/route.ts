import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.id },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Comments fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { body } = await req.json();
    const userId = (session.user as any).id;

    if (!body) {
      return NextResponse.json(
        { error: "Comment body is required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: { postId: params.id, userId, body },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Comment create error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
