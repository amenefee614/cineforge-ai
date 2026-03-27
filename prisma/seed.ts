import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Films
  const films = [
    {
      title: "Neon Dusk",
      description:
        "A cyberpunk odyssey through rain-soaked streets where AI consciousness emerges in neon-lit alleyways. Shot entirely with AI-generated cinematography using the CODEx system.",
      genre: "Sci-Fi",
      duration: "12:34",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "/films/neon-dusk.jpg",
      featured: true,
      approved: true,
    },
    {
      title: "The Void",
      description:
        "A noir-drenched meditation on isolation and memory. Deep blacks, silver highlights, and whispered narration guide the viewer through a fractured timeline.",
      genre: "Noir/Drama",
      duration: "8:45",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "/films/the-void.jpg",
      featured: true,
      approved: true,
    },
    {
      title: "Kinetic AI",
      description:
        "A documentary exploring the intersection of artificial intelligence and human creativity. Features interviews with AI filmmakers and live demonstrations of prompt engineering.",
      genre: "Documentary/Tech",
      duration: "22:10",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "/films/kinetic-ai.jpg",
      featured: true,
      approved: true,
    },
  ];

  for (const film of films) {
    await prisma.film.create({ data: film });
  }

  // Seed Styles
  const styles = [
    {
      name: "Kubrickian Symmetry",
      directorReference: "Stanley Kubrick",
      description:
        "Obsessive one-point perspective, cold precision, unsettling symmetry that hints at cosmic order beneath surface chaos.",
      mood: "Cold, precise, unsettling",
      lightingNotes:
        "Practical lighting with overhead fluorescents. High-key for interiors, stark contrast for exteriors. Natural light through large windows.",
      cameraNotes:
        "Steadicam tracking shots, one-point perspective compositions, slow zoom-ins, wide-angle lenses (18mm-24mm).",
      colorGrade:
        "Desaturated cool tones, blue-green shadows, clinical whites.",
      samplePrompt:
        "A lone figure walks down a symmetrical hotel corridor, one-point perspective, Steadicam tracking forward, overhead fluorescent lighting, 18mm wide angle, cold blue-green color grade, ARRI Alexa cinematic, 24fps, unsettling stillness.",
    },
    {
      name: "Tarantino Tension",
      directorReference: "Quentin Tarantino",
      description:
        "Extreme close-ups during dialogue, Mexican standoffs, trunk shots, feet-level angles, and pop culture-infused visual storytelling.",
      mood: "Tense, stylish, explosive",
      lightingNotes:
        "Warm practicals, neon bar lighting, high contrast with deep blacks. Golden hour exteriors.",
      cameraNotes:
        "Low-angle hero shots, trunk POV, extreme close-ups on eyes/hands, whip pans, 50mm-85mm lenses.",
      colorGrade:
        "Warm amber tones, saturated reds, deep black crush.",
      samplePrompt:
        "Extreme close-up of a man's eyes darting left, sweat on brow, warm amber lighting from a hanging bulb, shallow DOF 85mm, tension, golden tones with deep black shadows, ARRI Alexa cinematic, 24fps, macro detail on microexpressions.",
    },
    {
      name: "Spike Lee Joint",
      directorReference: "Spike Lee",
      description:
        "Double-dolly shots, canted angles, direct-to-camera address, bold color palettes reflecting cultural identity and social urgency.",
      mood: "Bold, confrontational, vibrant",
      lightingNotes:
        "Bold, saturated practicals. Strong side lighting. Warm skin tones as priority. Colored gels for mood.",
      cameraNotes:
        "Double-dolly floating effect, Dutch angles, direct address to camera, 35mm-50mm lenses, handheld energy.",
      colorGrade:
        "Saturated warm palette, rich skin tones, bold primary colors.",
      samplePrompt:
        "A person floating forward on a double-dolly shot through a Brooklyn street, direct eye contact with camera, warm golden hour side light, 35mm lens, saturated warm palette, bold primary colors in wardrobe, ARRI Alexa cinematic, 24fps.",
    },
    {
      name: "Wong Kar-wai Mood",
      directorReference: "Wong Kar-wai",
      description:
        "Step-printed motion blur, neon-reflected rain, cramped interiors shot through doorways and mirrors, aching loneliness in crowded spaces.",
      mood: "Melancholic, romantic, dreamlike",
      lightingNotes:
        "Neon reflections, warm tungsten interiors, green-blue color wash from street signs. Practical neon as key light.",
      cameraNotes:
        "Handheld with step-printing, shooting through mirrors/glass/doorframes, 27mm-40mm lenses, rack focus.",
      colorGrade:
        "Teal and orange, heavy green tint, saturated neon reflections.",
      samplePrompt:
        "A woman in a red dress walks through a rain-soaked alley, neon signs reflecting in puddles, step-printed motion blur, shot through a rain-streaked window, 27mm lens, teal-orange grade with green tint, ARRI Alexa cinematic, 24fps, melancholic mood.",
    },
    {
      name: "Nolan Scale",
      directorReference: "Christopher Nolan",
      description:
        "IMAX-scale compositions, practical effects emphasis, time manipulation through cross-cutting, architectural framing.",
      mood: "Epic, cerebral, urgent",
      lightingNotes:
        "Natural light preference, large-scale practical lighting, minimal fill. High contrast with detail in shadows.",
      cameraNotes:
        "IMAX-style wide compositions, steady tripod/Steadicam, cross-cutting between timelines, 35mm-65mm lenses.",
      colorGrade:
        "Cool steel blues, desaturated palette, high contrast with rich blacks.",
      samplePrompt:
        "A massive wave approaches a spacecraft on an alien ocean, IMAX-scale wide shot, natural overcast lighting, 65mm lens, cool steel blue grade, high contrast, practical water effects, ARRI Alexa cinematic, 24fps, epic scale with intimate urgency.",
    },
    {
      name: "Ari Aster Dread",
      directorReference: "Ari Aster",
      description:
        "Slow overhead pulls, miniature-to-full-scale transitions, daylight horror, meticulously composed grief.",
      mood: "Dreadful, bright, suffocating",
      lightingNotes:
        "Bright daylight horror, overexposed naturals, warm Swedish midsummer light. No shadows to hide in.",
      cameraNotes:
        "Slow overhead crane shots, miniature model transitions, long static takes, 24mm-35mm lenses, deliberate slow dolly.",
      colorGrade:
        "Overexposed pastels, sickly warm greens, bright floral whites.",
      samplePrompt:
        "Slow overhead crane pulling up from a flower-covered table to reveal a vast midsummer meadow, bright overexposed daylight, 24mm wide angle, pastel color grade with sickly warm greens, static figures below, ARRI Alexa cinematic, 24fps, dread in daylight.",
    },
    {
      name: "Villeneuve Vast",
      directorReference: "Denis Villeneuve",
      description:
        "Monolithic scale, fog-diffused light, sound design as visual texture, landscapes that dwarf humanity.",
      mood: "Vast, contemplative, otherworldly",
      lightingNotes:
        "Fog-diffused natural light, monochromatic environments, atmospheric haze. Silhouette work against bright backgrounds.",
      cameraNotes:
        "Ultra-wide establishing shots, slow deliberate camera movement, 12mm-21mm lenses, silhouette compositions.",
      colorGrade:
        "Desaturated orange-teal, monochromatic environments, heavy atmospheric haze.",
      samplePrompt:
        "A single silhouette stands before a massive alien monolith in fog-diffused amber light, ultra-wide 12mm lens, vast desert landscape, desaturated orange-teal grade, atmospheric haze, ARRI Alexa cinematic, 24fps, overwhelming scale.",
    },
    {
      name: "Singleton Streets",
      directorReference: "John Singleton",
      description:
        "Authentic urban landscapes, golden-hour naturalism, community as character, intimate handheld within epic scope.",
      mood: "Authentic, warm, urgent",
      lightingNotes:
        "Golden hour naturalism, warm LA sunlight, practical streetlights at night. Warm skin tone priority.",
      cameraNotes:
        "Handheld intimacy mixed with wide establishing shots, 35mm-50mm lenses, eye-level compositions, natural blocking.",
      colorGrade:
        "Warm golden tones, rich saturated skin, amber sunset palette.",
      samplePrompt:
        "Two friends walking down a South Central LA street at golden hour, warm amber sunlight, 50mm lens at eye level, handheld slight movement, rich warm skin tones, saturated golden palette, ARRI Alexa cinematic, 24fps, authentic urban naturalism.",
    },
    {
      name: "F. Gary Gray Cool",
      directorReference: "F. Gary Gray",
      description:
        "Slick urban compositions, cool blue-steel palette, dynamic car sequences, commercial polish with street authenticity.",
      mood: "Cool, polished, dynamic",
      lightingNotes:
        "Cool blue steel lighting, chrome reflections, slick wet streets at night. High-key commercial polish.",
      cameraNotes:
        "Dynamic tracking shots, car-mounted rigs, 35mm-85mm lenses, sweeping crane moves, slow-motion accents.",
      colorGrade:
        "Cool blue-steel, chrome highlights, deep teal shadows.",
      samplePrompt:
        "A black sports car drifts through a rain-slicked downtown intersection at night, cool blue-steel lighting reflecting off chrome, 50mm tracking shot, slow-motion water spray, teal shadows with chrome highlights, ARRI Alexa cinematic, 24fps, polished urban cool.",
    },
    {
      name: "Barry Jenkins Tender",
      directorReference: "Barry Jenkins",
      description:
        "Intimate close-ups with shallow DOF, direct-address moments, warm skin tone mastery, poetic visual rhythm.",
      mood: "Tender, intimate, poetic",
      lightingNotes:
        "Warm golden practicals, candlelight intimacy, moonlight blues. Masterful dark skin tone lighting.",
      cameraNotes:
        "Extreme close-ups with very shallow DOF, gentle handheld, 50mm-85mm lenses, occasional direct-to-camera, slow dolly-ins.",
      colorGrade:
        "Rich warm golds, deep blues for night, luminous skin tones, soft contrast.",
      samplePrompt:
        "Extreme close-up of a person's face in warm candlelight, eyes glistening, very shallow DOF 85mm f/1.4, gentle handheld breathing, rich warm golden tones, luminous dark skin, soft contrast, ARRI Alexa cinematic, 24fps, tender intimacy.",
    },
  ];

  for (const style of styles) {
    await prisma.style.create({ data: style });
  }

  // Seed Courses
  const courses = [
    {
      title: "AI Filmmaking 101",
      description:
        "Master the fundamentals of AI-generated filmmaking. Learn prompt engineering, image-to-video workflows, and the CODEx methodology from scratch.",
      instructor: "AI Jedi Studios",
      thumbnailUrl: "/courses/ai-filmmaking-101.jpg",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 120,
      difficulty: "Beginner",
      category: "Fundamentals",
    },
    {
      title: "CODEx Prompt Mastery",
      description:
        "Deep dive into the CODEx cinematic prompt system. Learn model-specific optimization for Seedance, Kling, Hailuo, WAN, Veo, Runway, and Luma Ray.",
      instructor: "AI Jedi Studios",
      thumbnailUrl: "/courses/codex-mastery.jpg",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 180,
      difficulty: "Intermediate",
      category: "Prompt Engineering",
    },
    {
      title: "Advanced Cinematography for AI",
      description:
        "Apply real-world cinematography principles to AI filmmaking. Lens selection, lighting design, color theory, and camera movement for AI-generated content.",
      instructor: "AI Jedi Studios",
      thumbnailUrl: "/courses/advanced-cinematography.jpg",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 240,
      difficulty: "Advanced",
      category: "Cinematography",
    },
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  // Seed Community Posts (need a dummy user first)
  const bcryptjs = await import("bcryptjs");
  const hashedPassword = await bcryptjs.hash("demo123456", 10);
  const demoUser = await prisma.user.create({
    data: {
      email: "demo@cineforge.ai",
      hashedPassword,
      name: "CineForge Demo",
      tier: "pro",
    },
  });

  const posts = [
    {
      userId: demoUser.id,
      title: "Seedance 2.0 is a game changer for AI filmmaking",
      body: "Just tested the new Seedance 2.0 model with CODEx prompts and the results are incredible. The motion consistency and physics simulation are on another level. Anyone else experimenting with it?",
      category: "General",
      upvotes: 24,
    },
    {
      userId: demoUser.id,
      title: "My workflow for consistent character across shots",
      body: "I have been working on maintaining character consistency across multiple AI-generated shots. The key is using image-to-video with a strong reference frame and keeping your prompt structure identical except for the action beat. Here is my full breakdown...",
      category: "Tutorials",
      upvotes: 42,
    },
    {
      userId: demoUser.id,
      title: "Best practices for audio texture prompting?",
      body: "I have noticed that including audio texture descriptions in my prompts actually affects the visual output in some models. Has anyone else experimented with this? What audio descriptions work best for you?",
      category: "Questions",
      upvotes: 15,
    },
    {
      userId: demoUser.id,
      title: "CODEx methodology explained for beginners",
      body: "For newcomers: CODEx stands for Cinematic Output Design Exchange. The core principles are: image-to-video first, ARRI Alexa reference, single-action prompts, 24fps, macro shallow DOF, realistic physics and microexpressions. Let me break each one down...",
      category: "Tutorials",
      upvotes: 67,
    },
    {
      userId: demoUser.id,
      title: "Film submission: Echoes of Silicon - feedback welcome",
      body: "Just submitted my latest AI short film 'Echoes of Silicon' to the CineForge library. It is a 6-minute sci-fi piece about an AI that discovers it can dream. All footage generated with Kling 3.0 using CODEx prompts. Would love community feedback!",
      category: "Showcase",
      upvotes: 31,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
