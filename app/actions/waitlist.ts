"use server";

import fs from "fs/promises";
import path from "path";
import {
  sendWaitlistConfirmationEmail,
  sendWaitlistNotificationToTeam,
  addCustomerToAudience,
  type WaitlistApplicant,
} from "@/lib/email";

export interface WaitlistState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitWaitlistApplication(
  prevState: WaitlistState | null,
  formData: FormData
): Promise<WaitlistState> {
  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim();
  const discipline = (formData.get("discipline") as string)?.trim();
  const experience = (formData.get("experience") as string)?.trim();
  const portfolio = (formData.get("portfolio") as string)?.trim() || "";
  const projectPitch = (formData.get("projectPitch") as string)?.trim() || "";

  // Validation
  if (!fullName || fullName.length < 2) {
    return { success: false, error: "Please provide your full name." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!phone || phone.length < 6) {
    return { success: false, error: "Please provide your WhatsApp or phone number." };
  }

  if (!discipline) {
    return { success: false, error: "Please select your creative discipline." };
  }

  if (!experience) {
    return { success: false, error: "Please indicate your experience with AI video tools." };
  }

  const applicant: WaitlistApplicant = {
    fullName,
    email,
    phone,
    discipline,
    experience,
    portfolio,
    projectPitch,
  };

  const timestamp = new Date().toISOString();

  // 1. Data Preservation Layer (Local Backup)
  try {
    const backupDir = path.join(process.cwd(), "data", "backups");
    await fs.mkdir(backupDir, { recursive: true });
    const logLine = JSON.stringify({ timestamp, ...applicant }) + "\n";
    await fs.appendFile(path.join(backupDir, "waitlist.jsonl"), logLine, "utf8");
  } catch (err) {
    console.error("Failed to write waitlist backup log:", err);
  }

  // 2. Add to Resend Audience if configured
  try {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    await addCustomerToAudience(email, firstName, lastName);
  } catch (err) {
    console.error("Failed to add waitlist contact to audience:", err);
  }

  // 3. Send Confirmation Email to Applicant
  try {
    await sendWaitlistConfirmationEmail(email, fullName);
  } catch (err) {
    console.error("Failed to send waitlist confirmation email:", err);
  }

  // 4. Send Alert Email to Team
  try {
    await sendWaitlistNotificationToTeam(applicant);
  } catch (err) {
    console.error("Failed to send team notification email:", err);
  }

  return {
    success: true,
    message: "Your application has been received. We sent a confirmation to your email!",
  };
}
