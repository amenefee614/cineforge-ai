import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const film = await prisma.film.findUnique({
      where: { id: params.id },
    });

    if (!film) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }

    return NextResponse.json({ film });
  } catch (error) {
    console.error("Film fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch film" },
      { status: 500 }
    );
  }
}
