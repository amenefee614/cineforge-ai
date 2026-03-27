import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: Request) {
  try {
    const { email, password, name, referralCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Generate unique referral code for new user
    let newRefCode = generateReferralCode();
    let codeExists = await prisma.user.findUnique({ where: { referralCode: newRefCode } });
    while (codeExists) {
      newRefCode = generateReferralCode();
      codeExists = await prisma.user.findUnique({ where: { referralCode: newRefCode } });
    }

    // Lookup referrer if referral code provided
    let referredById: string | undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCode.toUpperCase() },
      });
      if (referrer) {
        referredById = referrer.id;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: name || email.split("@")[0],
        tier: "pro", // Beta: everyone gets pro
        referralCode: newRefCode,
        referredById,
      },
    });

    // ACTIVATE WITH STRIPE
    // If referred user upgrades to paid, give referrer 1 month free
    // if (referredById) {
    //   await prisma.referralReward.create({
    //     data: { referrerId: referredById, referredId: user.id, status: "pending" }
    //   });
    // }

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name || user.email.split("@")[0]).catch(() => {});

    return NextResponse.json(
      { message: "Account created", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
