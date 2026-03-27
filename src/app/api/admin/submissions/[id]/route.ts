import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendFilmApprovedEmail } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { action } = await req.json();
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const submission = await prisma.filmSubmission.update({
      where: { id: params.id },
      data: { status: action === "approve" ? "approved" : "rejected" },
      include: { user: { select: { email: true, name: true } } },
    });

    // If approved, create a Film entry and send email
    if (action === "approve") {
      const film = await prisma.film.create({
        data: {
          title: submission.title,
          description: submission.description,
          genre: submission.genre,
          duration: submission.duration,
          embedUrl: submission.embedUrl,
          thumbnailUrl: submission.thumbnailUrl,
          submittedBy: submission.userId,
          approved: true,
        },
      });

      await sendFilmApprovedEmail(
        submission.user.email,
        submission.user.name || submission.user.email,
        submission.title,
        film.id
      );
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error("Admin submission action error:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}
