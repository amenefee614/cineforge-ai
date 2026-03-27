import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const styles = await prisma.style.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ styles });
  } catch (error) {
    console.error("Styles fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch styles" },
      { status: 500 }
    );
  }
}
