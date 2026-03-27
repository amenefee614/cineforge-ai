import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await prisma.review.findMany({
      where: { filmId: params.id },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    const avg =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({ reviews, averageRating: avg, count: reviews.length });
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
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

    const userId = (session.user as any).id;
    const { rating, reviewText } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }

    // Check if user already reviewed this film
    const existing = await prisma.review.findUnique({
      where: { userId_filmId: { userId, filmId: params.id } },
    });

    if (existing) {
      return NextResponse.json({ error: "You already reviewed this film" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        filmId: params.id,
        rating,
        reviewText: reviewText || "",
      },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Review create error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
