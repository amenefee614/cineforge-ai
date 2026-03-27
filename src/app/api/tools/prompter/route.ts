import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_PROMPTS } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      model,
      subject,
      action,
      scene,
      shotSize,
      cameraMovement,
      lens,
      aperture,
      colorGrade,
      audioTexture,
      multiShot,
      imageToVideo,
      clientNotes,
      variations,
    } = await req.json();

    const systemPrompt = MODEL_PROMPTS[model] || MODEL_PROMPTS["seedance-2.0"];

    let userInput = "";
    if (subject) userInput += `Subject: ${subject}\n`;
    if (action) userInput += `Action: ${action}\n`;
    if (scene) userInput += `Scene: ${scene}\n`;
    if (shotSize) userInput += `Shot Size: ${shotSize}\n`;
    if (cameraMovement) userInput += `Camera Movement: ${cameraMovement}\n`;
    if (lens) userInput += `Lens: ${lens}\n`;
    if (aperture) userInput += `Aperture: ${aperture}\n`;
    if (colorGrade) userInput += `Color Grade: ${colorGrade}\n`;
    if (audioTexture) userInput += `Audio Texture: ${audioTexture}\n`;
    if (multiShot) userInput += `Multi-shot: Yes, generate multiple shots with [Shot cut] markers\n`;
    if (imageToVideo) userInput += `Image-to-Video: This is an image-to-video prompt, emphasize visual anchor consistency\n`;
    if (clientNotes) userInput += `Additional Notes: ${clientNotes}\n`;
    if (variations) userInput += `Generate 3 variations of this prompt with different creative angles.\n`;

    const result = await callOpenRouter(systemPrompt, userInput, 1500);

    return NextResponse.json({ prompt: result });
  } catch (error) {
    console.error("Prompter error:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
