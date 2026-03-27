import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = "CineForge AI <onboarding@resend.dev>";

function brandedHtml(title: string, body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0F;color:#F5F3FF;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:28px;font-weight:900;font-style:italic;color:#9D6FE8;letter-spacing:-1px;margin:0;">CINEFORGE AI</h1>
    </div>
    <div style="background:#12101A;border:1px solid #2E1F5E;padding:32px;">
      <h2 style="font-size:24px;font-weight:700;color:#F5F3FF;margin:0 0 16px 0;letter-spacing:1px;text-transform:uppercase;">${title}</h2>
      ${body}
    </div>
    <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #2E1F5E;">
      <p style="font-size:11px;color:#A89EC4;text-transform:uppercase;letter-spacing:2px;">
        CineForge AI &mdash; Where AI Filmmakers Are Made
      </p>
      <a href="https://linktr.ee/amenefee614" style="font-size:11px;color:#9D6FE8;text-decoration:none;letter-spacing:1px;">linktr.ee/amenefee614</a>
    </div>
  </div>
</body>
</html>`;
}

export async function sendWelcomeEmail(email: string, name: string) {
  const subject = "Welcome to CineForge AI — You're in during Beta";
  const body = `
    <p style="font-size:15px;color:#A89EC4;line-height:1.7;margin:0 0 20px 0;">
      Hey ${name},
    </p>
    <p style="font-size:15px;color:#A89EC4;line-height:1.7;margin:0 0 20px 0;">
      Welcome to CineForge AI. You now have full Pro-level access to every production tool, the complete film library, all courses, and unlimited CineBot conversations during our beta period.
    </p>
    <p style="font-size:15px;color:#A89EC4;line-height:1.7;margin:0 0 24px 0;">
      No credit card required until May 1st.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="https://cineforge-ai.up.railway.app/dashboard" style="display:inline-block;background:#9D6FE8;color:#F5F3FF;padding:14px 32px;text-decoration:none;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:3px;">
        Enter Your Studio
      </a>
    </div>
    <p style="font-size:13px;color:#A89EC4;line-height:1.6;margin:20px 0 0 0;">
      Built on the CODEx Cinematic System. Powered by AI Jedi Studios.
    </p>`;

  const html = brandedHtml("Welcome to the Studio", body);

  if (resend) {
    try {
      await resend.emails.send({ from: FROM_EMAIL, to: email, subject, html });
      console.log(`[Email] Welcome email sent to ${email}`);
    } catch (err) {
      console.error(`[Email] Failed to send welcome email:`, err);
    }
  } else {
    console.log(`[Email] (No RESEND_API_KEY) Would send to ${email}:`);
    console.log(`  Subject: ${subject}`);
    console.log(`  To: ${email}`);
  }
}

export async function sendFilmApprovedEmail(
  email: string,
  name: string,
  filmTitle: string,
  filmId: string
) {
  const subject = "Your film has been approved on CineForge AI";
  const body = `
    <p style="font-size:15px;color:#A89EC4;line-height:1.7;margin:0 0 20px 0;">
      Hey ${name},
    </p>
    <p style="font-size:15px;color:#A89EC4;line-height:1.7;margin:0 0 20px 0;">
      Great news! Your film <strong style="color:#F5F3FF;">"${filmTitle}"</strong> has been approved and is now live in the CineForge AI film library.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="https://cineforge-ai.up.railway.app/films/watch/${filmId}" style="display:inline-block;background:#9D6FE8;color:#F5F3FF;padding:14px 32px;text-decoration:none;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:3px;">
        View Your Film
      </a>
    </div>
    <p style="font-size:13px;color:#A89EC4;line-height:1.6;margin:20px 0 0 0;">
      Congratulations on contributing to the CineForge community.
    </p>`;

  const html = brandedHtml("Film Approved", body);

  if (resend) {
    try {
      await resend.emails.send({ from: FROM_EMAIL, to: email, subject, html });
      console.log(`[Email] Approval email sent to ${email} for film ${filmTitle}`);
    } catch (err) {
      console.error(`[Email] Failed to send approval email:`, err);
    }
  } else {
    console.log(`[Email] (No RESEND_API_KEY) Would send to ${email}:`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Film: ${filmTitle}`);
  }
}
