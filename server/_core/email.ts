import { Resend } from "resend";
import { ENV } from "./env";

const NOTIFY_TO = "trymorencube@yahoo.com";
const FROM = "DAQS Contact <onboarding@resend.dev>";

export async function sendContactEmail(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  isBooking?: boolean;
  bookingDate?: string;
  bookingTime?: string;
}): Promise<void> {
  if (!ENV.resendApiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email.");
    return;
  }

  const resend = new Resend(ENV.resendApiKey);

  const subject = params.isBooking
    ? `New Booking Request from ${params.name}`
    : `New Contact Form Submission from ${params.name}`;

  const lines: string[] = [
    `<strong>Name:</strong> ${params.name}`,
    `<strong>Email:</strong> ${params.email}`,
  ];
  if (params.phone) lines.push(`<strong>Phone:</strong> ${params.phone}`);
  if (params.company) lines.push(`<strong>Company:</strong> ${params.company}`);
  if (params.service) lines.push(`<strong>Service:</strong> ${params.service}`);
  if (params.isBooking) {
    if (params.bookingDate) lines.push(`<strong>Preferred Date:</strong> ${params.bookingDate}`);
    if (params.bookingTime) lines.push(`<strong>Preferred Time:</strong> ${params.bookingTime}`);
  }
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

  const { error } = await resend.emails.send({
    from: FROM,
    to: [NOTIFY_TO],
    replyTo: params.email,
    subject,
    html,
  });

  if (error) {
    console.error("[Email] Resend error:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }
}
