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

    const post = await prisma.post.update({
      where: { id: params.id },
      data: { upvotes: { increment: 1 } },
    });

    return NextResponse.json({ upvotes: post.upvotes });
  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json(
      { error: "Failed to upvote" },
      { status: 500 }
    );
  }
}
