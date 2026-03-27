import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.referralCode) {
      return NextResponse.json({ referralCode: user.referralCode });
    }

    // Generate unique code
    let code = generateReferralCode();
    let exists = await prisma.user.findUnique({ where: { referralCode: code } });
    while (exists) {
      code = generateReferralCode();
      exists = await prisma.user.findUnique({ where: { referralCode: code } });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { referralCode: code },
    });

    return NextResponse.json({ referralCode: updated.referralCode });
  } catch (error) {
    console.error("Referral code error:", error);
    return NextResponse.json({ error: "Failed to generate referral code" }, { status: 500 });
  }
}
