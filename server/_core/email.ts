import { ENV } from "./env";

const NOTIFY_TO = ["Ncube.T@daqstech.com", "training@daqstech.com"];
const FROM = "DAQS Contact <info@daqstech.com>";

export async function sendContactEmail(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}): Promise<void> {
  if (!ENV.resendApiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email.");
    return;
  }

  const subject = `New Contact Form Submission from ${params.name}`;

  const lines: string[] = [
    `<strong>Name:</strong> ${params.name}`,
    `<strong>Email:</strong> ${params.email}`,
  ];
  if (params.phone) lines.push(`<strong>Phone:</strong> ${params.phone}`);
  if (params.company) lines.push(`<strong>Company:</strong> ${params.company}`);
  if (params.service) lines.push(`<strong>Service:</strong> ${params.service}`);
  lines.push(`<br/><strong>Message:</strong><br/>${params.message.replace(/\n/g, "<br/>")}`);

  const html = `
    <div style="font-family:sans-serif;max-width:600px;padding:24px;background:#f4f7fb;border-radius:8px;">
      <h2 style="color:#071428;margin-bottom:16px;">${subject}</h2>
      <div style="background:#fff;padding:20px;border-radius:6px;line-height:1.8;">
        ${lines.join("<br/>")}
      </div>
      <p style="color:#888;font-size:12px;margin-top:16px;">
        Sent via the DAQS website contact form.
        Reply directly to this email to respond to ${params.name}.
      </p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: NOTIFY_TO,
      reply_to: params.email,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`[Email] Resend API error ${response.status}: ${detail}`);
    throw new Error(`Email send failed: ${response.status}`);
  }

  console.log(`[Email] Sent successfully to ${NOTIFY_TO.join(", ")}`);
}

export async function sendAutoReply(params: {
  name: string;
  email: string;
  service?: string;
}): Promise<void> {
  if (!ENV.resendApiKey) return;

  const firstName = params.name.split(" ")[0];
  const serviceLine = params.service
    ? `<p style="margin:0 0 12px;">We noted your interest in <strong style="color:#c9a84c;">${params.service}</strong> — one of our team members who specialises in this area will be in touch shortly.</p>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d1b2e;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1b2e;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:#071428;border-radius:12px 12px 0 0;padding:24px 32px 20px;text-align:center;border-bottom:3px solid #c9a84c;">
            <div style="font-size:24px;font-weight:900;letter-spacing:3px;color:#ffffff;margin-bottom:2px;">DAQS</div>
            <div style="font-size:10px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;margin-bottom:12px;">Data Analytics &amp; Quantitative Solutions</div>
            <h1 style="margin:0;font-size:18px;font-weight:700;color:#ffffff;line-height:1.4;">Thank you, ${firstName}. <span style="color:#58a6ff;">We've received your message.</span></h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px;">

            <p style="margin:0 0 10px;font-size:13px;color:#1a1a2e;line-height:1.6;">
              Our team will respond within <strong>24 hours</strong>. While you wait, explore what DAQS can do for you.${params.service ? ` We noted your interest in <strong style="color:#c9a84c;">${params.service}</strong> — a specialist will be in touch.` : ""}
            </p>

            <!-- SERVICES — compact 4-column row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0;">
              <tr>
                <td width="24%" style="background:#f7f9ff;border-radius:6px;padding:10px 8px;border-top:3px solid #58a6ff;text-align:center;vertical-align:top;">
                  <div style="font-size:16px;">📊</div>
                  <div style="font-size:10px;font-weight:700;color:#071428;margin-top:4px;">Data Science</div>
                </td>
                <td width="2%"></td>
                <td width="24%" style="background:#f7f9ff;border-radius:6px;padding:10px 8px;border-top:3px solid #a78bfa;text-align:center;vertical-align:top;">
                  <div style="font-size:16px;">🤖</div>
                  <div style="font-size:10px;font-weight:700;color:#071428;margin-top:4px;">ML &amp; AI</div>
                </td>
                <td width="2%"></td>
                <td width="24%" style="background:#f7f9ff;border-radius:6px;padding:10px 8px;border-top:3px solid #34d399;text-align:center;vertical-align:top;">
                  <div style="font-size:16px;">🎓</div>
                  <div style="font-size:10px;font-weight:700;color:#071428;margin-top:4px;">Training</div>
                </td>
                <td width="2%"></td>
                <td width="24%" style="background:#f7f9ff;border-radius:6px;padding:10px 8px;border-top:3px solid #f59e0b;text-align:center;vertical-align:top;">
                  <div style="font-size:16px;">🚀</div>
                  <div style="font-size:10px;font-weight:700;color:#071428;margin-top:4px;">Agentic AI</div>
                </td>
              </tr>
            </table>

            <div style="border-top:1px solid #f0f4ff;margin:14px 0;"></div>

            <!-- N3 SOLUTIONS -->
            <div style="font-size:12px;font-weight:700;color:#071428;margin-bottom:8px;">N³ Smart Solutions</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#071428;border-radius:8px;padding:14px;text-align:center;vertical-align:middle;">
                  <div style="font-size:11px;font-weight:700;color:#c9a84c;margin-bottom:4px;">💼 N3 DataPro Solutions</div>
                  <div style="font-size:10px;color:#aac4e0;margin-bottom:10px;">Corporates &amp; Individuals</div>
                  <a href="https://learn.daqstech.com/" style="display:inline-block;background:#c9a84c;color:#071428;font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;">EXPLORE →</a>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#071428;border-radius:8px;padding:14px;text-align:center;vertical-align:middle;">
                  <div style="font-size:11px;font-weight:700;color:#58a6ff;margin-bottom:4px;">📚 N3 EduTech Solutions</div>
                  <div style="font-size:10px;color:#aac4e0;margin-bottom:10px;">Educators &amp; Students</div>
                  <a href="https://quant80.github.io/N3_SmartSolutions/" style="display:inline-block;background:#58a6ff;color:#071428;font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;">EXPLORE →</a>
                </td>
              </tr>
            </table>

            <div style="border-top:1px solid #f0f4ff;margin:14px 0;"></div>

            <!-- TEAM -->
            <div style="font-size:12px;font-weight:700;color:#071428;margin-bottom:8px;">Talk Directly to Our Team</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#f7f9ff;border-radius:6px;padding:10px 14px;border-left:3px solid #c9a84c;vertical-align:top;">
                  <div style="font-size:12px;font-weight:700;color:#071428;">Trymore Ncube</div>
                  <div style="font-size:10px;color:#58a6ff;margin-bottom:4px;">CEO &amp; Director · Data &amp; AI</div>
                  <div style="font-size:11px;color:#555;">📞 +27 60 343 1561</div>
                  <div style="font-size:11px;color:#555;">✉️ Ncube.T@daqstech.com</div>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#f7f9ff;border-radius:6px;padding:10px 14px;border-left:3px solid #58a6ff;vertical-align:top;">
                  <div style="font-size:12px;font-weight:700;color:#071428;">Albert Ncube</div>
                  <div style="font-size:10px;color:#58a6ff;margin-bottom:4px;">Director · Finance &amp; Advisory</div>
                  <div style="font-size:11px;color:#555;">📞 +263 77 327 8724</div>
                  <div style="font-size:11px;color:#555;">✉️ A.ncube@daqs.co.za</div>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-top:16px;">
              <a href="https://learn.daqstech.com/" style="display:inline-block;background:#071428;color:#c9a84c;font-size:12px;font-weight:700;padding:12px 28px;border-radius:30px;text-decoration:none;letter-spacing:1px;border:2px solid #c9a84c;">VISIT DAQS PLATFORM →</a>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#071428;border-radius:0 0 12px 12px;padding:14px 32px;text-align:center;border-top:3px solid #c9a84c;">
            <div style="font-size:10px;color:#6a8aaa;line-height:1.8;">
              <strong style="color:#c9a84c;">DAQS</strong> · info@daqstech.com &nbsp;|&nbsp; training@daqstech.com<br/>
              <span style="color:#4a6a8a;">© ${new Date().getFullYear()} DAQS. You received this because you submitted an enquiry on our website.</span>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "DAQS <info@daqstech.com>",
      to: [params.email],
      reply_to: "info@daqstech.com",
      subject: `Thank you for contacting DAQS, ${firstName} — We'll be in touch within 24 hours`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`[Email] Auto-reply error ${response.status}: ${detail}`);
    return;
  }

  console.log(`[Email] Auto-reply sent to ${params.email}`);
}
