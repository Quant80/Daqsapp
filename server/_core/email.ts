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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1b2e;padding:40px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#071428 0%,#0a2040 60%,#0d2d5e 100%);border-radius:12px 12px 0 0;padding:40px 40px 30px;text-align:center;border-bottom:3px solid #c9a84c;">
            <div style="font-size:28px;font-weight:900;letter-spacing:3px;color:#ffffff;margin-bottom:4px;">DAQS</div>
            <div style="font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;margin-bottom:24px;">Data Analytics &amp; Quantitative Solutions</div>
            <div style="width:50px;height:3px;background:linear-gradient(90deg,#c9a84c,#f0d080);margin:0 auto 24px;border-radius:2px;"></div>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.4;">Thank you, ${firstName}.<br/><span style="color:#58a6ff;">We've received your message.</span></h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">

            <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.7;">
              Thank you for reaching out to <strong>DAQS</strong>. Our team will review your enquiry and respond within <strong>24 hours</strong>. We look forward to exploring how we can drive real results for you through data and AI.
            </p>

            ${serviceLine}

            <!-- DIVIDER -->
            <div style="border-top:2px solid #f0f4ff;margin:28px 0;"></div>

            <!-- WHY DAQS -->
            <h2 style="margin:0 0 16px;font-size:17px;font-weight:700;color:#071428;letter-spacing:0.5px;">Why Leading Organisations Choose DAQS</h2>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#f7f9ff;border-radius:8px;padding:18px;border-left:4px solid #58a6ff;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">📊</div>
                  <div style="font-size:13px;font-weight:700;color:#071428;margin-bottom:4px;">Data Science &amp; Analytics</div>
                  <div style="font-size:12px;color:#555;line-height:1.6;">From raw data to boardroom insights. We build end-to-end pipelines, dashboards, and BI solutions that drive decisions.</div>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#f7f9ff;border-radius:8px;padding:18px;border-left:4px solid #a78bfa;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">🤖</div>
                  <div style="font-size:13px;font-weight:700;color:#071428;margin-bottom:4px;">Machine Learning &amp; AI</div>
                  <div style="font-size:12px;color:#555;line-height:1.6;">Predictive models, deep learning, and agentic AI systems built for real-world impact — not just research papers.</div>
                </td>
              </tr>
              <tr><td colspan="3" style="height:12px;"></td></tr>
              <tr>
                <td width="48%" style="background:#f7f9ff;border-radius:8px;padding:18px;border-left:4px solid #34d399;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">🎓</div>
                  <div style="font-size:13px;font-weight:700;color:#071428;margin-bottom:4px;">Training &amp; Upskilling</div>
                  <div style="font-size:12px;color:#555;line-height:1.6;">Python, Data Science, ML &amp; AI training for corporates and individuals — from beginner to enterprise-grade proficiency.</div>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#f7f9ff;border-radius:8px;padding:18px;border-left:4px solid #f59e0b;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">🚀</div>
                  <div style="font-size:13px;font-weight:700;color:#071428;margin-bottom:4px;">Agentic &amp; Generative AI</div>
                  <div style="font-size:12px;color:#555;line-height:1.6;">Cutting-edge AI agents, LLM orchestration, and generative AI solutions that automate and augment your workflows.</div>
                </td>
              </tr>
            </table>

            <!-- DIVIDER -->
            <div style="border-top:2px solid #f0f4ff;margin:28px 0;"></div>

            <!-- N3 SOLUTIONS -->
            <h2 style="margin:0 0 16px;font-size:17px;font-weight:700;color:#071428;">Explore Our N³ Smart Solutions</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:linear-gradient(135deg,#071428,#0a2040);border-radius:8px;padding:20px;text-align:center;vertical-align:top;">
                  <div style="font-size:20px;margin-bottom:8px;">💼</div>
                  <div style="font-size:13px;font-weight:700;color:#c9a84c;margin-bottom:6px;">N3 DataPro Solutions</div>
                  <div style="font-size:11px;color:#aac4e0;margin-bottom:14px;line-height:1.5;">For Corporates &amp; Individuals<br/>Data-driven learning &amp; consulting</div>
                  <a href="https://learn.daqstech.com/" style="display:inline-block;background:#c9a84c;color:#071428;font-size:11px;font-weight:700;padding:8px 16px;border-radius:20px;text-decoration:none;letter-spacing:0.5px;">EXPLORE NOW →</a>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:linear-gradient(135deg,#071428,#0a2040);border-radius:8px;padding:20px;text-align:center;vertical-align:top;">
                  <div style="font-size:20px;margin-bottom:8px;">📚</div>
                  <div style="font-size:13px;font-weight:700;color:#58a6ff;margin-bottom:6px;">N3 EduTech Solutions</div>
                  <div style="font-size:11px;color:#aac4e0;margin-bottom:14px;line-height:1.5;">For Educators &amp; Students<br/>Smart tools for modern learning</div>
                  <a href="https://quant80.github.io/N3_SmartSolutions/" style="display:inline-block;background:#58a6ff;color:#071428;font-size:11px;font-weight:700;padding:8px 16px;border-radius:20px;text-decoration:none;letter-spacing:0.5px;">EXPLORE NOW →</a>
                </td>
              </tr>
            </table>

            <!-- DIVIDER -->
            <div style="border-top:2px solid #f0f4ff;margin:28px 0;"></div>

            <!-- TEAM -->
            <h2 style="margin:0 0 16px;font-size:17px;font-weight:700;color:#071428;">Talk Directly to Our Team</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f7f9ff;border-radius:8px;padding:16px 20px;border-left:4px solid #c9a84c;" width="48%">
                  <div style="font-size:13px;font-weight:700;color:#071428;">Trymore Ncube</div>
                  <div style="font-size:11px;color:#58a6ff;margin-bottom:6px;">CEO &amp; Director · Data Science &amp; AI</div>
                  <div style="font-size:12px;color:#555;">📞 +27 60 343 1561</div>
                  <div style="font-size:12px;color:#555;">✉️ Ncube.T@daqstech.com</div>
                </td>
                <td width="4%"></td>
                <td style="background:#f7f9ff;border-radius:8px;padding:16px 20px;border-left:4px solid #58a6ff;" width="48%">
                  <div style="font-size:13px;font-weight:700;color:#071428;">Albert Ncube</div>
                  <div style="font-size:11px;color:#58a6ff;margin-bottom:6px;">Director · Finance &amp; Investment Advisory</div>
                  <div style="font-size:12px;color:#555;">📞 +263 77 327 8724</div>
                  <div style="font-size:12px;color:#555;">✉️ A.ncube@daqs.co.za</div>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-top:32px;">
              <a href="https://daqstech.com" style="display:inline-block;background:linear-gradient(135deg,#071428,#0d2d5e);color:#ffffff;font-size:13px;font-weight:700;padding:14px 32px;border-radius:30px;text-decoration:none;letter-spacing:1px;border:2px solid #c9a84c;">VISIT DAQSTECH.COM →</a>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#071428;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;border-top:3px solid #c9a84c;">
            <div style="font-size:11px;color:#6a8aaa;line-height:1.8;">
              <strong style="color:#c9a84c;">DAQS</strong> · Data Analytics &amp; Quantitative Solutions<br/>
              info@daqstech.com &nbsp;|&nbsp; training@daqstech.com<br/>
              <span style="font-size:10px;color:#4a6a8a;margin-top:8px;display:block;">
                You received this because you submitted an enquiry on our website.<br/>
                © ${new Date().getFullYear()} DAQS. All rights reserved.
              </span>
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
