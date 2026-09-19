// lib/email.ts
// Server-side only — sends the post-payment confirmation via Resend.
// Note: this email intentionally does NOT contain login details.
// Account creation is manual right now, so this just confirms payment
// and sets the expectation that a second email with credentials is coming.
import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace with a verified sending domain in Resend before going live —
// Resend will reject sends from an unverified domain.
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "Osmosis <info@osmosisone.com>";

export async function sendPaymentConfirmationEmail(
  to: string,
  planName: string,
  points?: number,
  customerName?: string
) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "You're in — welcome to Osmosis",
    html: paymentConfirmationTemplate(planName, points, customerName),
  });
}

export async function sendTeamNotificationEmail(
  to: string,
  customerEmail: string,
  planName: string,
  points: number,
  reference: string,
  amountPaidNaira: number,
  customerName?: string
) {
  const nameDisplay = customerName ? `${customerName} (${customerEmail})` : customerEmail;
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `🚨 [Action Required] New Osmosis Order: ${planName} (${nameDisplay})`,
    html: teamNotificationTemplate(customerEmail, planName, points, reference, amountPaidNaira, customerName),
  });
}

export async function addCustomerToAudience(
  email: string,
  firstName?: string,
  lastName?: string
) {
  const audienceId = process.env.RESEND_GENERAL_AUDIENCE_ID;
  if (!audienceId) return;
  try {
    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      audienceId,
      unsubscribed: false,
    });
  } catch (err) {
    console.error("Failed to add customer to Resend audience:", err);
  }
}


// Kept deliberately simple and light-background: email clients have
// inconsistent (often nonexistent) dark-mode support, so this doesn't
// try to reuse Osmosis's dark UI theme — just one accent color for the
// brand rule, everything else safe, boring, and legible everywhere.
function paymentConfirmationTemplate(planName: string, points?: number, customerName?: string) {
  const greeting = customerName ? `Hi ${customerName},` : "Hello,";
  const pointsLine = points
    ? `<div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:14px 18px; margin:0 0 20px;">
         <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#6b7280; margin-bottom:4px;">Credit Allocation</div>
         <div style="font-size:17px; font-weight:700; color:#141416;">
           ${points.toLocaleString()} generation credits
         </div>
         <div style="font-size:13px; color:#6b7280; margin-top:2px;">
           2 credits = 1 second of AI video generation
         </div>
       </div>`
    : "";
  return `
  <div style="background:#f4f4f5; padding:40px 16px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:500px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.04);">
      <tr>
        <td style="padding:32px 32px 0;">
          <div style="font-size:22px; font-weight:700; letter-spacing:-0.02em; color:#141416;">Osmosis</div>
          <div style="height:3px; width:44px; background:#DCFF50; margin-top:10px; border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 8px;">
          <h1 style="font-size:21px; font-weight:700; margin:0 0 16px; color:#141416; letter-spacing:-0.01em;">Payment confirmed — welcome to Osmosis.</h1>
          <p style="font-size:15px; line-height:1.6; color:#4b4b4f; margin:0 0 16px;">
            ${greeting}<br/><br/>
            Thank you for your purchase. You are confirmed for the <strong>${planName}</strong> package. Your micro-drama production workspace is being provisioned, and your login credentials will arrive in this inbox shortly.
          </p>
          ${pointsLine}
          <p style="font-size:14px; line-height:1.6; color:#6b7280; margin:0 0 16px;">
            No action is required from you at this time. If you have any questions or require immediate support, simply reply directly to this email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 32px;">
          <p style="font-size:13px; color:#9c9ba3; margin:0;">— The Osmosis Team</p>
        </td>
      </tr>
    </table>
  </div>`;
}

function teamNotificationTemplate(
  customerEmail: string,
  planName: string,
  points: number,
  reference: string,
  amountPaidNaira: number,
  customerName?: string
) {
  return `
  <div style="background:#f4f4f5; padding:40px 16px; font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding:32px 32px 0;">
          <div style="font-size:20px; font-weight:700; color:#141416;">Osmosis Operations</div>
          <div style="height:3px; width:40px; background:#DCFF50; margin-top:12px; border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <h2 style="font-size:18px; color:#141416; margin:0 0 16px;">New Payment Received — Action Required</h2>
          <p style="font-size:14px; line-height:1.6; color:#4b4b4f; margin:0 0 20px;">
            A customer has paid via Paystack. Please log into the generation platform, provision their account with the points below, and send their login credentials.
          </p>
          <table style="width:100%; font-size:14px; border-collapse:collapse; background:#fafafa; border:1px solid #eaeaec; border-radius:8px; margin-bottom:20px;">
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Customer Name</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">${customerName || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Customer Email</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Package</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">${planName} (${points.toLocaleString()} points)</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Amount Paid</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">₦${amountPaidNaira.toLocaleString()} NGN</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; color:#8C8A92;">Paystack Reference</td>
              <td style="padding:10px 14px; font-family:monospace; color:#141416;">${reference}</td>
            </tr>
          </table>
          <p style="font-size:12px; color:#8C8A92; margin:0;">
            SOP Reminder: Always confirm this reference in your Paystack dashboard before granting access.
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

export interface WaitlistApplicant {
  fullName: string;
  email: string;
  phone: string;
  discipline: string;
  experience: string;
  portfolio?: string;
  projectPitch?: string;
}

export async function sendWaitlistConfirmationEmail(
  to: string,
  applicantName: string
) {
  const firstName = applicantName.trim().split(" ")[0] || "Creator";
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Application received — Osmosis AI Filmmaking Cohort",
    text: `Hi ${firstName},\n\nThank you for applying to join the Osmosis AI Micro-Drama Filmmaking Cohort. We have received your application.\n\nOur team is reviewing applications on a rolling basis. If selected, you'll receive an invitation with cohort start dates, curriculum access, and your pilot compute credit allocation.\n\nIn the meantime, feel free to reply directly to this email if you have any questions.\n\n— The Osmosis Team`,
    html: waitlistConfirmationTemplate(firstName),
  });
}

export async function sendWaitlistNotificationToTeam(
  applicant: WaitlistApplicant
) {
  const teamEmail = process.env.RESEND_OWNER_EMAIL || "info@osmosisone.com";
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: teamEmail,
    subject: `✨ [Waitlist Application] ${applicant.fullName} (${applicant.discipline})`,
    text: `New Waitlist Application:\n\nName: ${applicant.fullName}\nEmail: ${applicant.email}\nPhone: ${applicant.phone}\nDiscipline: ${applicant.discipline}\nExperience: ${applicant.experience}\nPortfolio: ${applicant.portfolio || "None"}\nPitch: ${applicant.projectPitch || "None"}`,
    html: waitlistTeamNotificationTemplate(applicant),
  });
}

function waitlistConfirmationTemplate(firstName: string) {
  return `
  <div style="background:#f4f4f5; padding:40px 16px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.04);">
      <tr>
        <td style="padding:32px 32px 0;">
          <div style="font-size:22px; font-weight:700; letter-spacing:-0.02em; color:#141416;">Osmosis</div>
          <div style="height:3px; width:44px; background:#DCFF50; margin-top:10px; border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 8px;">
          <h1 style="font-size:21px; font-weight:700; margin:0 0 16px; color:#141416; letter-spacing:-0.01em;">Application received — you're on the list.</h1>
          <p style="font-size:15px; line-height:1.6; color:#4b4b4f; margin:0 0 16px;">
            Hi ${firstName},<br/><br/>
            Thank you for applying to the <strong>Osmosis AI Micro-Drama Training Program</strong>. We have received your application and added you to our candidate pool.
          </p>

          <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px 18px; margin:0 0 20px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#6b7280; margin-bottom:6px;">What to expect next</div>
            <ul style="margin:0; padding-left:18px; font-size:13.5px; color:#4b4b4f; line-height:1.6;">
              <li style="margin-bottom:6px;">Applications are evaluated on a rolling basis by our directing panel.</li>
              <li style="margin-bottom:6px;">Accepted fellows receive an onboarding package with cohort schedules and pilot GPU compute credits.</li>
              <li>You'll get direct access to our 4-week hybrid curriculum, live masterclasses, and distribution track.</li>
            </ul>
          </div>

          <p style="font-size:14px; line-height:1.6; color:#6b7280; margin:0 0 16px;">
            Have questions or want to update your application? Simply reply directly to this email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 32px;">
          <p style="font-size:13px; color:#9c9ba3; margin:0;">— The Osmosis Team</p>
        </td>
      </tr>
    </table>
  </div>`;
}

function waitlistTeamNotificationTemplate(applicant: WaitlistApplicant) {
  return `
  <div style="background:#f4f4f5; padding:40px 16px; font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:540px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding:32px 32px 0;">
          <div style="font-size:20px; font-weight:700; color:#141416;">Osmosis Cohort Applications</div>
          <div style="height:3px; width:40px; background:#DCFF50; margin-top:12px; border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <h2 style="font-size:18px; color:#141416; margin:0 0 16px;">New Applicant: ${applicant.fullName}</h2>
          <table style="width:100%; font-size:14px; border-collapse:collapse; background:#fafafa; border:1px solid #eaeaec; border-radius:8px; margin-bottom:20px;">
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92; width:35%;">Applicant Name</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">${applicant.fullName}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Email</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;"><a href="mailto:${applicant.email}">${applicant.email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Phone / WhatsApp</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#141416;">${applicant.phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Creative Discipline</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; font-weight:600; color:#141416;">${applicant.discipline}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">AI Experience</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#141416;">${applicant.experience}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#8C8A92;">Portfolio / Link</td>
              <td style="padding:10px 14px; border-bottom:1px solid #eaeaec; color:#141416;">${applicant.portfolio ? `<a href="${applicant.portfolio}" target="_blank">${applicant.portfolio}</a>` : "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; color:#8C8A92;">Project Pitch</td>
              <td style="padding:10px 14px; color:#141416; line-height:1.5;">${applicant.projectPitch || "Not provided"}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

