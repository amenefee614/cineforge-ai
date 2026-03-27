import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const films = await prisma.film.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ films });
  } catch (error) {
    console.error("Films fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch films" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const film = await prisma.film.create({ data });
    return NextResponse.json({ film }, { status: 201 });
  } catch (error) {
    console.error("Film create error:", error);
    return NextResponse.json(
      { error: "Failed to create film" },
      { status: 500 }
    );
  }
}
