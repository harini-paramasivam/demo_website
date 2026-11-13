import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream'
    ];
    if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// In-memory submission tracking to prevent duplicate confirmation emails
const recentSubmissions = new Map();
function checkAndRecordSubmission(email, fileName) {
  const key = `${email.trim().toLowerCase()}:${fileName.trim().toLowerCase()}`;
  const now = Date.now();
  if (recentSubmissions.has(key)) {
    const prevTime = recentSubmissions.get(key);
    if (now - prevTime < 60000) { // 60 seconds
      return { isDuplicate: true };
    }
  }
  recentSubmissions.set(key, now);
  // Garbage collect entries older than 5 minutes
  if (recentSubmissions.size > 500) {
    for (const [k, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 300000) {
        recentSubmissions.delete(k);
      }
    }
  }
  return { isDuplicate: false };
}

// Professional Velvora branded email template for candidate confirmation
function getCandidateConfirmationEmail({ name, appliedRole, fileName }) {
  const candidateName = escapeHtml(name.trim());
  const roleName = escapeHtml(appliedRole || 'Applied Position');
  const resumeName = escapeHtml(fileName || 'Submitted Document');

  const text = `Dear ${name.trim()},

Thank you for your interest in career opportunities at Velvora Solutions.

We are pleased to confirm that we have successfully received your application and resume.

Our recruitment team will carefully review your submitted details and qualifications. If your profile matches our current requirements, our team will contact you regarding the next steps in the recruitment process.

Our team will get in touch with you within 48 business hours.

We appreciate your interest in becoming a part of Velvora Solutions and thank you for considering us for your career journey.

Best Regards,
HR & Recruitment Team
Velvora Solutions
Email: info@velvorasolutions.com
Website: https://velvorasolutions.com
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received Successfully – Velvora Solutions</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Velvora Luxury Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 30px 32px 26px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      VELVORA<span style="color: #00d2ff;">.</span>SOLUTIONS
                    </div>
                    <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8; margin-top: 3px;">
                      Content &bull; Accessibility &bull; Technology
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Application Confirmed
                    </span>
                  </td>
                </tr>
              </table>
              <div style="height: 2px; background: linear-gradient(90deg, #00d2ff, #38bdf8, transparent); margin-top: 18px;"></div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 32px 24px; color: #1e293b; font-size: 15px; line-height: 1.7;">
              
              <p style="margin: 0 0 18px 0; font-size: 17px; font-weight: 700; color: #0f172a;">
                Dear ${candidateName},
              </p>
              
              <p style="margin: 0 0 16px 0; color: #334155;">
                Thank you for your interest in career opportunities at <strong>Velvora Solutions</strong>.
              </p>

              <!-- Success Callout Box -->
              <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 8px; padding: 15px 18px; margin: 20px 0;">
                <p style="margin: 0; color: #15803d; font-weight: 600; font-size: 14.5px;">
                  &#10003; We are pleased to confirm that we have successfully received your application and resume.
                </p>
              </div>

              <!-- Application Summary Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13.5px;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 130px;">Applied Role:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${roleName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #64748b;">Resume File:</td>
                  <td style="padding: 10px 14px; color: #16a34a; font-weight: 600;">&#128206; ${resumeName}</td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; color: #334155;">
                Our recruitment team will carefully review your submitted details and qualifications. If your profile matches our current requirements, our team will contact you regarding the next steps in the recruitment process.
              </p>

              <!-- 48 Business Hours Callout -->
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 20px 0; color: #1e40af; font-weight: 600; font-size: 14px;">
                &#9201; Our team will get in touch with you within 48 business hours.
              </div>

              <p style="margin: 0 0 28px 0; color: #334155;">
                We appreciate your interest in becoming a part of Velvora Solutions and thank you for considering us for your career journey.
              </p>

              <!-- Sign-off Block -->
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Best Regards,</p>
                <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 600; color: #0284c7;">HR &amp; Recruitment Team</p>
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
              <p style="margin: 0; font-size: 11px; color: #64748b;">This is an automated application confirmation. Please do not reply directly to this email.</p>
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
    await runMiddleware(req, res, upload.single('resume'));

    const { name, email, phone, role, portfolio, websiteUrl, message } = req.body || {};

    if (!name || !name.trim()) {
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
      return res.status(400).json({ success: false, error: 'Phone number is required.' });
    }
    if (!role || !role.trim()) {
      return res.status(400).json({ success: false, error: 'Applied role is required.' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload your resume document (PDF, DOC, DOCX up to 10MB).' });
    }

    // Check for duplicate submission within 60 seconds
    const duplicateCheck = checkAndRecordSubmission(email, req.file.originalname);
    if (duplicateCheck.isDuplicate) {
      return res.status(200).json({
        success: true,
        message: 'Your application has already been received and is being processed by our talent team.'
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
    const sender = (process.env.EMAIL_FROM || process.env.SMTP_FROM || `"Velvora Solutions" <${user}>`).trim();
    const appliedRole = role.trim();

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <div style="display: inline-block; background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 8px;">
            Careers Application
          </div>
          <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Job Application</h2>
          <p style="margin: 0; font-size: 14px; color: #93c5fd;">Candidate applied for: <strong style="color: #ffffff;">${escapeHtml(appliedRole)}</strong></p>
        </div>

        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;"><strong>Candidate Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Email Address:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Phone Number:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">
                <a href="tel:${escapeHtml(phone.trim().replace(/\s+/g, ''))}" style="color: #0f172a; text-decoration: none;">${escapeHtml(phone.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Role Applied For:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(appliedRole)}</td>
            </tr>
            ${portfolio ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Portfolio / LinkedIn:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="${escapeHtml(portfolio.trim())}" target="_blank" style="color: #0284c7; text-decoration: underline;">${escapeHtml(portfolio.trim())}</a>
              </td>
            </tr>` : ''}
            ${websiteUrl ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Personal Site / URL:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="${escapeHtml(websiteUrl.trim())}" target="_blank" style="color: #0284c7; text-decoration: underline;">${escapeHtml(websiteUrl.trim())}</a>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Resume File:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-size: 14px; font-weight: 600;">
                📎 ${escapeHtml(req.file.originalname)} (${(req.file.size / (1024 * 1024)).toFixed(2)} MB) — Attached
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;"><strong>Submitted At:</strong></td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
            </tr>
          </table>

          ${message ? `
          <div style="background: #f8fafc; border-left: 4px solid #38bdf8; padding: 16px 20px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Cover Note / Candidate Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
          </div>` : ''}
        </div>

        <div style="background: #f1f5f9; padding: 14px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Direct reply to this email will respond to applicant: <strong>${escapeHtml(email.trim())}</strong>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    // 1. Send Internal HR Notification with resume attachment
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Job Application] ${appliedRole} - ${name.trim()}`,
      html: htmlContent,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype
        }
      ]
    });
    console.log(`[Career API] Internal HR application email sent for ${name.trim()} (${email.trim()})`);

    // 2. Automatically Send Confirmation Email to Candidate's Registered Email Address
    let candidateConfirmationSent = false;
    let candidateEmailError = null;
    try {
      const { html: candidateHtml, text: candidateText } = getCandidateConfirmationEmail({
        name: name.trim(),
        appliedRole,
        fileName: req.file.originalname
      });

      await transporter.sendMail({
        from: sender,
        to: email.trim(),
        subject: 'Application Received Successfully – Velvora Solutions',
        text: candidateText,
        html: candidateHtml
      });
      candidateConfirmationSent = true;
      console.log(`[Career API] Candidate confirmation email sent successfully to ${email.trim()}`);
    } catch (confErr) {
      candidateEmailError = confErr.message;
      console.error(`[Career API] Candidate confirmation email failed for ${email.trim()}:`, confErr);
    }

    return res.status(200).json({
      success: true,
      emailSent: true,
      candidateConfirmationSent,
      candidateEmailError: candidateEmailError || undefined,
      message: 'Your application has been submitted successfully and a confirmation email has been sent.'
    });
  } catch (error) {
    console.error('Career Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to submit application.' });
  }
}

