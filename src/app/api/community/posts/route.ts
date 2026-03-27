import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "recent";

    const where = category && category !== "All" ? { category } : {};
    const orderBy =
      sort === "popular"
        ? { upvotes: "desc" as const }
        : { createdAt: "desc" as const };

    const posts = await prisma.post.findMany({
      where,
      orderBy,
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { comments: true } },
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Posts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
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

    const { title, body, category } = await req.json();
    const userId = (session.user as any).id;

    if (!title || !body || !category) {
      return NextResponse.json(
        { error: "Title, body, and category are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: { userId, title, body, category },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Post create error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
