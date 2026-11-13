import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const recentSubmissions = new Map();
function checkAndRecordSubmission(email, program) {
  const key = `${(email || '').trim().toLowerCase()}:${(program || '').trim().toLowerCase()}`;
  const now = Date.now();
  if (recentSubmissions.has(key)) {
    const prev = recentSubmissions.get(key);
    if (now - prev < 60000) return { isDuplicate: true };
  }
  recentSubmissions.set(key, now);
  if (recentSubmissions.size > 500) {
    for (const [k, time] of recentSubmissions.entries()) {
      if (now - time > 300000) recentSubmissions.delete(k);
    }
  }
  return { isDuplicate: false };
}

function getCandidateTrainingEmail({ fullName, email, phone, program, trainingMode, duration, referenceId }) {
  const name = escapeHtml(fullName.trim());
  const prog = escapeHtml(program || 'Training & Internship Program');
  const mode = escapeHtml(trainingMode || 'Online Virtual Live');
  const dur = escapeHtml(duration || '3 Months');

  const text = `Dear ${fullName.trim()},

Thank you for your interest in our training and internship programs at Velvora Solutions.

We are pleased to confirm that we have successfully received your enrollment enquiry.

Reference ID: ${referenceId}
Program Selected: ${program}
Learning Mode: ${trainingMode}
Preferred Duration: ${duration}

Our academic coordinators will carefully review your details and contact you within 24 to 48 business hours with batch schedules, syllabus details, and admissions next steps.

We appreciate your interest in advancing your career with Velvora Solutions.

Best Regards,
Admissions & Training Desk
Velvora Solutions
Email: info@velvorasolutions.com
Website: https://velvorasolutions.com
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Training &amp; Internship Application Received – Velvora Solutions</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 30px 32px 26px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      VELVORA<span style="color: #00d2ff;">.</span>SOLUTIONS
                    </div>
                    <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8; margin-top: 3px;">
                      Academy &bull; Industry Training &bull; Internships
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
                      Application Received
                    </span>
                  </td>
                </tr>
              </table>
              <div style="height: 2px; background: linear-gradient(90deg, #00d2ff, #38bdf8, transparent); margin-top: 18px;"></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 32px 24px; color: #1e293b; font-size: 15px; line-height: 1.7;">
              <p style="margin: 0 0 18px 0; font-size: 17px; font-weight: 700; color: #0f172a;">
                Dear ${name},
              </p>
              
              <p style="margin: 0 0 16px 0; color: #334155;">
                Thank you for your interest in our professional training and internship programs at <strong>Velvora Solutions</strong>.
              </p>

              <!-- Success Callout -->
              <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 8px; padding: 15px 18px; margin: 20px 0;">
                <p style="margin: 0; color: #15803d; font-weight: 600; font-size: 14.5px;">
                  &#10003; We are pleased to confirm that we have successfully received your enrollment enquiry.
                </p>
              </div>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13.5px;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Reference ID:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0284c7; font-weight: 700;">${referenceId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Selected Program:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${prog}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Learning Mode:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${mode}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #64748b;">Preferred Duration:</td>
                  <td style="padding: 10px 14px; color: #0f172a;">${dur}</td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; color: #334155;">
                Our academic coordinators will carefully review your details and contact you regarding curriculum milestones, batch schedules, and admission next steps.
              </p>

              <!-- Turnaround Time -->
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 20px 0; color: #1e40af; font-weight: 600; font-size: 14px;">
                &#9201; Our admissions counselor will connect with you within 24 to 48 business hours.
              </div>

              <!-- Sign-off Block -->
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Best Regards,</p>
                <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 600; color: #0284c7;">Admissions &amp; Academic Desk</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Velvora Solutions</p>
                <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6;">
                  Email: <a href="mailto:info@velvorasolutions.com" style="color: #0284c7; text-decoration: none;">info@velvorasolutions.com</a><br>
                  Website: <a href="https://velvorasolutions.com" target="_blank" style="color: #0284c7; text-decoration: none;">https://velvorasolutions.com</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b1437; padding: 18px 32px; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} Velvora Solutions. All rights reserved.</p>
              <p style="margin: 0; font-size: 11px; color: #64748b;">This is an automated confirmation sent to ${escapeHtml(email.trim())}.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, phone, applicantType, program, trainingMode, duration, message } = req.body || {};

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: 'Phone or WhatsApp number is required.' });
    }

    const referenceId = `VEL-TRN-${Date.now().toString().slice(-6)}`;
    const chosenProgram = (program && program.trim()) ? program.trim() : 'Internship Program (Live Industry Projects)';
    const cleanMode = (trainingMode && trainingMode.trim()) ? trainingMode.trim() : 'Online Virtual Live';
    const cleanDuration = (duration && duration.trim()) ? duration.trim() : '3 Months';
    const cleanType = (applicantType && applicantType.trim()) ? applicantType.trim() : 'Student';

    // Duplicate check
    const dupCheck = checkAndRecordSubmission(email, chosenProgram);
    if (dupCheck.isDuplicate) {
      return res.status(200).json({
        success: true,
        referenceId,
        message: 'Your training application has already been received and recorded.'
      });
    }

    const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME || 'info@velvorasolutions.com').trim();
    const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || 'd3FqN7XdXueq').replace(/\s+/g, '');
    let host = (process.env.SMTP_HOST || 'smtppro.zoho.in').trim();
    if (!host || (host === 'smtp.gmail.com' && (user.includes('@velvorasolutions.com') || user.includes('zoho')))) {
      host = 'smtppro.zoho.in';
    }
    const port = parseInt(process.env.SMTP_PORT, 10) || 465;
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465);
    const recipient = (process.env.EMAIL_TO || process.env.SMTP_TO || 'info@velvorasolutions.com').trim();
    const sender = (process.env.EMAIL_FROM || process.env.SMTP_FROM || `"Velvora Academy" <${user}>`).trim();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    // 1. Send Internal Notification to Velvora Admissions Desk
    const internalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Training / Internship Enquiry</h2>
          <p style="margin: 0; font-size: 13px; color: #93c5fd;">Ref ID: <strong style="color: #ffffff;">${referenceId}</strong> | Course: <strong style="color: #ffffff;">${escapeHtml(chosenProgram)}</strong></p>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;"><strong>Applicant Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(fullName.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Phone / WhatsApp:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">
                <a href="tel:${escapeHtml(phone.trim().replace(/\s+/g, ''))}" style="color: #0f172a; text-decoration: none;">${escapeHtml(phone.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Program:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${escapeHtml(chosenProgram)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Mode &amp; Duration:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${escapeHtml(cleanMode)} (${escapeHtml(cleanDuration)})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Category:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${escapeHtml(cleanType)}</td>
            </tr>
          </table>
          ${message && message.trim() ? `
          <div style="background: #f8fafc; border-left: 4px solid #38bdf8; padding: 14px 18px; border-radius: 6px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Message</p>
            <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: #1e293b;">${escapeHtml(message.trim())}</p>
          </div>` : ''}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Training Admission] ${chosenProgram} - ${fullName.trim()} (${referenceId})`,
      html: internalHtml
    });

    // 2. Automatically Send Confirmation Email to the Candidate
    let candidateConfirmationSent = false;
    try {
      const { html: candHtml, text: candText } = getCandidateTrainingEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        program: chosenProgram,
        trainingMode: cleanMode,
        duration: cleanDuration,
        referenceId
      });

      await transporter.sendMail({
        from: sender,
        to: email.trim(),
        subject: `Application Received – ${chosenProgram} | Velvora Solutions`,
        text: candText,
        html: candHtml
      });
      candidateConfirmationSent = true;
      console.log(`[Training API] Confirmation email sent successfully to ${email.trim()}`);
    } catch (confErr) {
      console.error(`[Training API] Candidate confirmation email failed for ${email.trim()}:`, confErr);
    }

    return res.status(200).json({
      success: true,
      referenceId,
      candidateConfirmationSent,
      message: 'Your training enrollment enquiry has been submitted successfully and a confirmation email has been sent.'
    });

  } catch (err) {
    console.error('Training Handler Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to submit training enquiry.' });
  }
}
