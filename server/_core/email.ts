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
<body style="margin:0;padding:0;background:#dce8f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#dce8f7;padding:16px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER — logo + title -->
        <tr>
          <td style="background:#ffffff;border-radius:10px 10px 0 0;padding:20px 32px 16px;text-align:center;border-bottom:3px solid #c9a84c;">
            <img src="https://www.daqstech.com/daqs-logo-final.png" alt="DAQS" width="90" style="display:block;margin:0 auto 8px;height:auto;"/>
            <div style="font-size:22px;font-weight:900;letter-spacing:2px;color:#071428;margin-bottom:2px;">DAQS<span style="color:#c9a84c;">.</span></div>
            <div style="font-size:9px;letter-spacing:2px;color:#888;text-transform:uppercase;">Data Analytics &amp; Quantitative Solutions</div>
          </td>
        </tr>

        <!-- HERO — checkmark + thank you -->
        <tr>
          <td style="background:#ffffff;padding:20px 32px 14px;text-align:center;">
            <div style="width:40px;height:40px;background:#1a73e8;border-radius:50%;margin:0 auto 12px;line-height:40px;font-size:20px;color:#fff;">✓</div>
            <div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:4px;">Thank you, ${firstName}.</div>
            <div style="font-size:16px;font-weight:600;color:#1a73e8;margin-bottom:14px;">We've received your message.</div>
            <p style="margin:0;font-size:13px;color:#555;line-height:1.65;text-align:left;">
              Thank you for reaching out to <strong>DAQS</strong>. Our team will review your enquiry and respond within <strong>24 hours</strong>. We look forward to exploring how we can drive real results for you through data and AI.
            </p>
          </td>
        </tr>

        ${params.service ? `
        <!-- SERVICE INTEREST -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 14px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9ff;border-radius:8px;border-left:4px solid #1a73e8;">
              <tr>
                <td style="padding:10px 14px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:28px;vertical-align:middle;">
                        <div style="width:24px;height:24px;border-radius:50%;background:#e8f0fe;text-align:center;line-height:24px;font-size:13px;">👤</div>
                      </td>
                      <td style="padding-left:10px;font-size:12px;color:#444;">
                        We noted your interest in <strong style="color:#c9a84c;">${params.service}</strong> — one of our team members who specialises in this area will be in touch shortly.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : ""}

        <!-- TRAINING PROGRAMMES -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 14px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FF;border-radius:8px;">
              <tr>
                <td style="padding:12px 16px;">
                  <table cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                    <tr>
                      <td style="font-size:16px;padding-right:8px;">🎓</td>
                      <td style="font-size:12px;font-weight:700;color:#1a1a2e;">Our Training Programmes</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="32%" style="vertical-align:top;">
                        <div style="font-size:9.5px;color:#1565c0;line-height:1.9;">
                          <span style="color:#1a73e8;font-size:11px;">●</span> Intro to Python Programming<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Foundations of Data Science<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Advanced Data Analytics<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Business Intelligence &amp; Dashboards<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Machine Learning Fundamentals<br/>
                        </div>
                      </td>
                      <td width="2%"></td>
                      <td width="32%" style="vertical-align:top;">
                        <div style="font-size:9.5px;color:#1565c0;line-height:1.9;">
                          <span style="color:#1a73e8;font-size:11px;">●</span> Deep Learning &amp; Neural Networks<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> AI Strategy for Business Leaders<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Generative AI &amp; Prompt Engineering<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Building AI Agents &amp; Workflows<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Agentic AI for Business Leaders<br/>
                        </div>
                      </td>
                      <td width="2%"></td>
                      <td width="32%" style="vertical-align:top;">
                        <div style="font-size:9.5px;color:#1565c0;line-height:1.9;">
                          <span style="color:#1a73e8;font-size:11px;">●</span> Quantitative Finance Essentials<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Algorithmic Trading with Python<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Accounting &amp; Investment Analysis<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Pension Fund Management<br/>
                          <span style="color:#1a73e8;font-size:11px;">●</span> Robotics &amp; Automation<br/>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- N3 SOLUTIONS + TEAM — side by side -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 14px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <!-- LEFT: N3 Solutions -->
                <td width="50%" style="vertical-align:top;padding-right:8px;">
                  <div style="font-size:11px;font-weight:700;color:#1a1a2e;margin-bottom:8px;">Explore Our N³ Smart Solutions</div>
                  <!-- DataPro card -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
                    <tr>
                      <td style="background:#ffffff;border:1px solid #e8e8e8;border-radius:8px;padding:12px;text-align:center;">
                        <div style="font-size:11px;font-weight:700;color:#b8860b;margin-bottom:2px;">💼 DataPro Solutions</div>
                        <div style="font-size:9px;color:#888;margin-bottom:1px;">For Corporates &amp; Individuals</div>
                        <div style="font-size:9px;color:#aaa;margin-bottom:8px;">Data-driven learning &amp; consulting</div>
                        <a href="https://learn.daqstech.com/" style="display:inline-block;background:#c9a84c;color:#fff;font-size:9px;font-weight:700;padding:5px 14px;border-radius:20px;text-decoration:none;">EXPLORE NOW →</a>
                      </td>
                    </tr>
                  </table>
                  <!-- EduTech card -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#ffffff;border:1px solid #e8e8e8;border-radius:8px;padding:12px;text-align:center;">
                        <div style="font-size:11px;font-weight:700;color:#1a73e8;margin-bottom:2px;">📚 EduTech Solutions</div>
                        <div style="font-size:9px;color:#888;margin-bottom:1px;">For Educators &amp; Students</div>
                        <div style="font-size:9px;color:#aaa;margin-bottom:8px;">Smart tools for modern learning</div>
                        <a href="https://quant80.github.io/N3_SmartSolutions/" style="display:inline-block;background:#1a73e8;color:#fff;font-size:9px;font-weight:700;padding:5px 14px;border-radius:20px;text-decoration:none;">EXPLORE NOW →</a>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- RIGHT: Team -->
                <td width="50%" style="vertical-align:top;padding-left:8px;">
                  <div style="font-size:11px;font-weight:700;color:#1a1a2e;margin-bottom:8px;">Talk Directly to Our Team</div>
                  <!-- Trymore -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
                    <tr>
                      <td style="background:#f8f9fc;border-radius:8px;padding:10px;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:36px;vertical-align:top;">
                              <img src="https://www.daqstech.com/trymore-ncube.jpeg" width="32" height="32" style="border-radius:50%;display:block;object-fit:cover;" alt="Trymore"/>
                            </td>
                            <td style="padding-left:8px;vertical-align:top;">
                              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">Trymore Ncube</div>
                              <div style="font-size:9px;color:#1a73e8;margin-bottom:4px;">CEO &amp; Director · Data Science &amp; AI</div>
                              <div style="font-size:9.5px;color:#555;">📞 +27 60 343 1561</div>
                              <div style="font-size:9.5px;color:#555;">✉️ Ncube.T@daqstech.com</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- Albert -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#f8f9fc;border-radius:8px;padding:10px;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:36px;vertical-align:top;">
                              <div style="width:32px;height:32px;border-radius:50%;background:#1a73e8;text-align:center;line-height:32px;font-size:13px;color:#fff;font-weight:700;">A</div>
                            </td>
                            <td style="padding-left:8px;vertical-align:top;">
                              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">Albert Ncube</div>
                              <div style="font-size:9px;color:#1a73e8;margin-bottom:4px;">Director · Finance &amp; Investment Advisory</div>
                              <div style="font-size:9.5px;color:#555;">📞 +263 77 327 8724</div>
                              <div style="font-size:9.5px;color:#555;">✉️ Ncube.A@daqstech.com</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CLOSING -->
        <tr>
          <td style="background:#ffffff;padding:10px 32px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9ff;border-radius:8px;">
              <tr>
                <td style="padding:12px 16px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:18px;padding-right:10px;vertical-align:middle;">💬</td>
                      <td style="font-size:12px;color:#555;vertical-align:middle;">
                        We're excited to partner with you on your data and AI journey.<br/>
                        <strong style="color:#1a73e8;font-size:13px;">Talk soon!</strong>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER — light blue -->
        <tr>
          <td style="background:#dce8f7;border-radius:0 0 10px 10px;padding:12px 32px;text-align:center;border-top:2px solid #c9a84c;">
            <div style="font-size:13px;font-weight:900;color:#071428;letter-spacing:1px;">DAQS<span style="color:#c9a84c;">.</span></div>
            <div style="font-size:9px;letter-spacing:1px;color:#888;text-transform:uppercase;margin-bottom:4px;">Data Analytics &amp; Quantitative Solutions</div>
            <div style="font-size:10px;color:#1565c0;margin-bottom:3px;">
              <a href="https://www.daqstech.com/" style="color:#1565c0;text-decoration:none;font-weight:600;">www.daqstech.com</a> &nbsp;|&nbsp; <a href="mailto:info@daqstech.com" style="color:#1565c0;text-decoration:none;">info@daqstech.com</a> &nbsp;|&nbsp; <a href="mailto:training@daqstech.com" style="color:#1565c0;text-decoration:none;">training@daqstech.com</a>
            </div>
            <div style="font-size:9px;color:#8a9ab8;">You received this because you submitted an enquiry on our website.</div>
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
