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
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:16px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- HEADER — tight fit -->
        <tr>
          <td style="background:#071428;border-radius:10px 10px 0 0;padding:10px 28px 8px;text-align:center;border-bottom:3px solid #c9a84c;">
            <div style="font-size:20px;font-weight:900;letter-spacing:3px;color:#ffffff;margin-bottom:0;">DAQS</div>
            <div style="font-size:9px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Data Analytics &amp; Quantitative Solutions</div>
            <div style="font-size:14px;font-weight:600;color:#ffffff;margin-bottom:2px;">Thank you, ${firstName} — we've received your message.</div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:18px 28px;">

            <p style="margin:0 0 12px;font-size:13px;color:#333;line-height:1.6;">
              Someone from our team will be in touch within <strong>24 hours</strong>.${params.service ? ` Your interest in <strong>${params.service}</strong> has been noted and the right person will reach out.` : ""}
            </p>

            <!-- PROGRAMMES — 3 columns, round bullets -->
            <div style="font-size:11px;font-weight:700;color:#071428;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Our Training Programmes</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="32%" style="vertical-align:top;">
                  <div style="font-size:9.5px;color:#444;line-height:1.85;">
                    • Intro to Python Programming<br/>
                    • Foundations of Data Science<br/>
                    • Advanced Data Analytics<br/>
                    • Business Intelligence &amp; Dashboards<br/>
                    • Machine Learning Fundamentals<br/>
                  </div>
                </td>
                <td width="2%"></td>
                <td width="32%" style="vertical-align:top;">
                  <div style="font-size:9.5px;color:#444;line-height:1.85;">
                    • Deep Learning &amp; Neural Networks<br/>
                    • AI Strategy for Business Leaders<br/>
                    • Generative AI &amp; Prompt Engineering<br/>
                    • Building AI Agents &amp; Workflows<br/>
                    • Agentic AI for Business Leaders<br/>
                  </div>
                </td>
                <td width="2%"></td>
                <td width="32%" style="vertical-align:top;">
                  <div style="font-size:9.5px;color:#444;line-height:1.85;">
                    • Quantitative Finance Essentials<br/>
                    • Algorithmic Trading with Python<br/>
                    • Accounting &amp; Investment Analysis<br/>
                    • Pension Fund Management<br/>
                    • Robotics &amp; Automation<br/>
                  </div>
                </td>
              </tr>
            </table>

            <div style="border-top:1px solid #eef0f5;margin:14px 0;"></div>

            <!-- N3 SOLUTIONS — dark cards -->
            <div style="font-size:11px;font-weight:700;color:#071428;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">Explore Our N³ Smart Solutions</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#071428;border-radius:8px;padding:14px;text-align:center;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">💼</div>
                  <div style="font-size:11px;font-weight:700;color:#c9a84c;margin-bottom:3px;">N3 DataPro Solutions</div>
                  <div style="font-size:10px;color:#aac4e0;margin-bottom:4px;">For Corporates &amp; Individuals</div>
                  <div style="font-size:10px;color:#7a9ab8;margin-bottom:10px;">Data-driven learning &amp; consulting</div>
                  <a href="https://learn.daqstech.com/" style="display:inline-block;background:#c9a84c;color:#071428;font-size:10px;font-weight:700;padding:6px 16px;border-radius:20px;text-decoration:none;">EXPLORE NOW →</a>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#071428;border-radius:8px;padding:14px;text-align:center;vertical-align:top;">
                  <div style="font-size:18px;margin-bottom:6px;">📚</div>
                  <div style="font-size:11px;font-weight:700;color:#58a6ff;margin-bottom:3px;">N3 EduTech Solutions</div>
                  <div style="font-size:10px;color:#aac4e0;margin-bottom:4px;">For Educators &amp; Students</div>
                  <div style="font-size:10px;color:#7a9ab8;margin-bottom:10px;">Smart tools for modern learning</div>
                  <a href="https://quant80.github.io/N3_SmartSolutions/" style="display:inline-block;background:#58a6ff;color:#071428;font-size:10px;font-weight:700;padding:6px 16px;border-radius:20px;text-decoration:none;">EXPLORE NOW →</a>
                </td>
              </tr>
            </table>

            <div style="border-top:1px solid #eef0f5;margin:14px 0;"></div>

            <!-- TEAM -->
            <div style="font-size:11px;font-weight:700;color:#071428;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">Talk Directly to Our Team</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#f8f9fc;border-radius:6px;padding:10px 14px;border-left:3px solid #c9a84c;vertical-align:top;">
                  <div style="font-size:12px;font-weight:700;color:#071428;">Trymore Ncube</div>
                  <div style="font-size:10px;color:#58a6ff;margin-bottom:5px;">CEO &amp; Director · Data Science &amp; AI</div>
                  <div style="font-size:11px;color:#555;">📞 +27 60 343 1561</div>
                  <div style="font-size:11px;color:#555;">✉️ Ncube.T@daqstech.com</div>
                  <a href="https://www.daqstech.com/" style="font-size:11px;color:#1a73e8;text-decoration:none;font-weight:600;">🌐 www.daqstech.com</a>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#f8f9fc;border-radius:6px;padding:10px 14px;border-left:3px solid #58a6ff;vertical-align:top;">
                  <div style="font-size:12px;font-weight:700;color:#071428;">Albert Ncube</div>
                  <div style="font-size:10px;color:#58a6ff;margin-bottom:5px;">Director · Finance &amp; Investment Advisory</div>
                  <div style="font-size:11px;color:#555;">📞 +263 77 327 8724</div>
                  <div style="font-size:11px;color:#555;">✉️ Ncube.A@daqstech.com</div>
                  <a href="mailto:training@daqstech.com" style="font-size:11px;color:#1a73e8;text-decoration:none;font-weight:600;">✉️ training@daqstech.com</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#071428;border-radius:0 0 10px 10px;padding:10px 28px;text-align:center;border-top:2px solid #c9a84c;">
            <div style="font-size:10px;color:#6a8aaa;line-height:1.7;">
              <strong style="color:#c9a84c;">DAQS</strong> · Data Analytics &amp; Quantitative Solutions<br/>
              <a href="mailto:info@daqstech.com" style="color:#6a8aaa;text-decoration:none;">info@daqstech.com</a> &nbsp;|&nbsp; <a href="mailto:training@daqstech.com" style="color:#6a8aaa;text-decoration:none;">training@daqstech.com</a><br/>
              <span style="color:#3d5a78;">© ${new Date().getFullYear()} DAQS. You received this because you submitted an enquiry on our website.</span>
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
