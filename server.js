import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { voraStore } from './server/voraKnowledgeStore.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer memory storage for resume uploads (max 10MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream' // fallback for some browsers
    ];

    if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

// HTML sanitizer helper
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

// Nodemailer Transporter Factory
function createTransporter() {
  dotenv.config({ override: true });
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME || 'info@velvorasolutions.com').trim();
  const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || 'd3FqN7XdXueq').replace(/\s+/g, '');

  let host = (process.env.SMTP_HOST || 'smtppro.zoho.in').trim();
  if (!host || (host === 'smtp.gmail.com' && (user.includes('@velvorasolutions.com') || user.includes('zoho')))) {
    host = 'smtppro.zoho.in';
  }

  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  dotenv.config({ override: true });
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME || '').trim();
  const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465);

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(user && pass),
    details: {
      hasHost: Boolean(host),
      hasPort: Boolean(process.env.SMTP_PORT),
      hasSecure: Boolean(process.env.SMTP_SECURE),
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      hasFrom: Boolean(process.env.EMAIL_FROM || process.env.SMTP_FROM),
      hasTo: Boolean(process.env.EMAIL_TO || process.env.SMTP_TO),
      resolvedHost: host || (user.includes('@velvorasolutions.com') ? 'smtppro.zoho.in' : 'smtp.gmail.com'),
      port,
      secure
    }
  });
});

// -------------------------------------------------------------
// 1. CONTACT FORM ENDPOINT
// -------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
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
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    const recipient = process.env.EMAIL_TO || 'harinip0301@gmail.com';
    const sender = process.env.EMAIL_FROM || `"Velvora Solutions" <${process.env.SMTP_USER || 'no-reply@velvorasolutions.com'}>`;
    const cleanSubject = (subject && subject.trim()) ? subject.trim() : `Contact Enquiry from ${name.trim()}`;

    // HTML Email Template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Contact Enquiry</h2>
          <p style="margin: 0; font-size: 13px; color: #93c5fd;">Velvora Solutions — Client & Partner Form</p>
        </div>

        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 120px;"><strong>Sender Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Sender Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Subject:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(cleanSubject)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;"><strong>Submitted At:</strong></td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
            </tr>
          </table>

          <div style="background: #f8fafc; border-left: 4px solid #f97316; padding: 16px 20px; border-radius: 6px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message Content</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
          </div>
        </div>

        <div style="background: #f1f5f9; padding: 14px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Direct reply to this email will respond to: <strong>${escapeHtml(email.trim())}</strong>
        </div>
      </div>
    `;

    const plainText = `
New Contact Enquiry - Velvora Solutions
-----------------------------------------
Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${cleanSubject}
Submitted At: ${new Date().toISOString()}

Message:
${message.trim()}
-----------------------------------------
Reply-To: ${email.trim()}
    `;

    const transporter = createTransporter();

    // 1. Send internal notification to Velvora
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Contact Enquiry] ${cleanSubject}`,
      text: plainText,
      html: htmlContent
    });

    // 2. Automatically Send Confirmation Email to the User
    try {
      const userHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 28px 32px; color: #ffffff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <h2 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #ffffff;">VELVORA<span style="color: #00d2ff;">.</span>SOLUTIONS</h2>
                  <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">Client Consultation &bull; Solutions &bull; Support</p>
                </td>
                <td align="right" valign="middle">
                  <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
                    Enquiry Confirmed
                  </span>
                </td>
              </tr>
            </table>
            <div style="height: 2px; background: linear-gradient(90deg, #00d2ff, #38bdf8, transparent); margin-top: 18px;"></div>
          </div>
          <div style="padding: 32px; font-size: 15px; line-height: 1.7; color: #1e293b;">
            <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Dear ${escapeHtml(name.trim())},</p>
            <p style="margin: 0 0 16px 0; color: #334155;">Thank you for contacting <strong>Velvora Solutions</strong> regarding our professional content and digital technology services.</p>
            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 14px 18px; margin: 18px 0; color: #15803d; font-weight: 600;">
              &#10003; We are pleased to confirm that we have successfully received your project enquiry.
            </div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 18px 0; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13.5px;">
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Service Focus:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${escapeHtml(cleanSubject)}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Contact Phone:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${escapeHtml(phone.trim())}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 14px; color: #64748b;">Enquiry Status:</td>
                <td style="padding: 10px 14px; color: #0284c7; font-weight: 600;">Assigned to Solutions Specialist</td>
              </tr>
            </table>

            <p style="margin: 0 0 16px 0; color: #334155;">Our technical directors and engagement managers are reviewing your project requirements to prepare an initial consultation, scope assessment, and workflow proposal.</p>
            
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 20px 0; color: #1e40af; font-weight: 600; font-size: 14px;">
              &#9201; A dedicated solutions manager will connect with you within 24 business hours.
            </div>

            <p style="margin: 0 0 24px 0; color: #64748b; font-size: 13.5px;">If you have immediate project deadlines or urgent requests, you may also reach our team directly at <a href="tel:+919500834236" style="color: #0284c7; text-decoration: none; font-weight: 600;">+91 95008 34236</a>.</p>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13.5px; color: #64748b;">
              <strong style="color: #0f172a;">Best Regards,</strong><br>
              <span style="color: #0284c7; font-weight: 600;">Client Relations &amp; Technical Solutions Team</span><br>
              <strong style="color: #0f172a;">Velvora Solutions</strong><br>
              Email: <a href="mailto:info@velvorasolutions.com" style="color: #0284c7; text-decoration: none;">info@velvorasolutions.com</a><br>
              Website: <a href="https://velvorasolutions.com" style="color: #0284c7; text-decoration: none;">https://velvorasolutions.com</a>
            </div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: sender,
        to: email.trim(),
        subject: `Enquiry Received – ${cleanSubject} | Velvora Solutions`,
        text: `Dear ${name.trim()},\n\nThank you for contacting Velvora Solutions.\nWe have received your enquiry regarding ${cleanSubject}.\n\nOur client team will contact you within 24 business hours.\n\nBest Regards,\nClient Solutions Team\nVelvora Solutions\nEmail: info@velvorasolutions.com\nWebsite: https://velvorasolutions.com`,
        html: userHtml
      });
      console.log(`[Express Contact] Confirmation email sent successfully to ${email.trim()}`);
    } catch (candErr) {
      console.error(`[Express Contact] Failed to send user confirmation email:`, candErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully and a confirmation email has been dispatched to your inbox.'
    });

  } catch (error) {
    console.error('Contact Form Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send message. Please try again or reach out to us directly.'
    });
  }
});

// -------------------------------------------------------------
// 1.1 TRAINING & INTERNSHIP ENQUIRY ENDPOINT
// -------------------------------------------------------------
app.post('/api/training-enquiry', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      applicantType,
      institution,
      degree,
      program,
      trainingMode,
      duration,
      message
    } = req.body || {};

    // Validation
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

    // Persist to local JSON log
    try {
      const enqFile = path.join(process.cwd(), 'data', 'training-enquiries.json');
      let enquiries = [];
      if (fs.existsSync(enqFile)) {
        try {
          enquiries = JSON.parse(fs.readFileSync(enqFile, 'utf8'));
        } catch (e) {
          enquiries = [];
        }
      }
      enquiries.unshift({
        referenceId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        applicantType: cleanType,
        institution: (institution || '').trim(),
        degree: (degree || '').trim(),
        program: chosenProgram,
        trainingMode: cleanMode,
        duration: cleanDuration,
        message: (message || '').trim(),
        submittedAt: new Date().toISOString()
      });
      fs.writeFileSync(enqFile, JSON.stringify(enquiries.slice(0, 500), null, 2), 'utf8');
    } catch (saveErr) {
      console.warn('Could not save training enquiry to JSON:', saveErr.message);
    }

    // Prepare Email
    const recipient = process.env.EMAIL_TO || 'harinip0301@gmail.com';
    const sender = process.env.EMAIL_FROM || `"Velvora Academy" <${process.env.SMTP_USER || 'no-reply@velvorasolutions.com'}>`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <div style="display: inline-block; background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 8px;">
            Academy & Training Admission
          </div>
          <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Training / Internship Enquiry</h2>
          <p style="margin: 0; font-size: 14px; color: #93c5fd;">Ref ID: <strong style="color: #ffffff;">${referenceId}</strong> | Course: <strong style="color: #ffffff;">${escapeHtml(chosenProgram)}</strong></p>
        </div>

        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;"><strong>Applicant Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(fullName.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Email Address:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Phone / WhatsApp:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">
                <a href="tel:${escapeHtml(phone.trim().replace(/\s+/g, ''))}" style="color: #0f172a; text-decoration: none;">${escapeHtml(phone.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Applicant Type:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(cleanType)}</td>
            </tr>
            ${institution ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>College / Company:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(institution.trim())}</td>
            </tr>` : ''}
            ${degree ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Degree & Branch:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(degree.trim())}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Program Selected:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #f97316; font-size: 14px; font-weight: 700;">${escapeHtml(chosenProgram)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Learning Mode:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(cleanMode)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Preferred Duration:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(cleanDuration)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;"><strong>Submitted At:</strong></td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
            </tr>
          </table>

          ${message && message.trim() ? `
          <div style="background: #f8fafc; border-left: 4px solid #38bdf8; padding: 16px 20px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Career Goals / Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
          </div>` : ''}
        </div>

        <div style="background: #f1f5f9; padding: 14px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Direct reply to this email will respond to: <strong>${escapeHtml(email.trim())}</strong>
        </div>
      </div>
    `;

    try {
      const transporter = createTransporter();
      // 1. Send Internal Notification
      await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: email.trim(),
        subject: `[Training Admission] ${escapeHtml(chosenProgram)} - ${escapeHtml(fullName.trim())} (${referenceId})`,
        text: `New Training Enquiry (${referenceId})\nName: ${fullName.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim()}\nProgram: ${chosenProgram}\nMode: ${cleanMode}`,
        html: htmlContent
      });

      // 2. Automatically Send Confirmation Email to the Candidate
      try {
        await transporter.sendMail({
          from: sender,
          to: email.trim(),
          subject: `Application Received – ${chosenProgram} | Velvora Solutions`,
          text: `Dear ${fullName.trim()},\n\nThank you for your interest in career opportunities and training programs at Velvora Solutions.\n\nWe have received your enrollment application (Ref: ${referenceId}) for ${chosenProgram}.\n\nOur academic coordinators will contact you within 24 to 48 business hours with batch schedules and next steps.\n\nBest Regards,\nAdmissions & Training Desk\nVelvora Solutions\nEmail: info@velvorasolutions.com\nWebsite: https://velvorasolutions.com`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 26px 30px; color: #ffffff;">
                <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 700; color: #ffffff;">VELVORA<span style="color: #00d2ff;">.</span>SOLUTIONS</h2>
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">Training &bull; Internships &bull; Academy</p>
              </div>
              <div style="padding: 28px; font-size: 14.5px; line-height: 1.6; color: #1e293b;">
                <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Dear ${escapeHtml(fullName.trim())},</p>
                <p style="margin: 0 0 16px 0;">Thank you for your interest in our programs at <strong>Velvora Solutions</strong>.</p>
                <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 12px 16px; margin: 16px 0; color: #15803d; font-weight: 600;">
                  &#10003; We are pleased to confirm that we have successfully received your enrollment application.
                </div>
                <p style="margin: 0 0 8px 0;"><strong>Reference ID:</strong> <span style="color: #0284c7;">${referenceId}</span></p>
                <p style="margin: 0 0 8px 0;"><strong>Program:</strong> ${escapeHtml(chosenProgram)}</p>
                <p style="margin: 0 0 16px 0;"><strong>Mode & Duration:</strong> ${escapeHtml(cleanMode)} (${escapeHtml(cleanDuration)})</p>
                <p style="margin: 0 0 16px 0;">Our academic coordinators will carefully review your details and contact you within <strong>24 to 48 business hours</strong> with syllabus details and next steps.</p>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 20px; font-size: 13.5px; color: #64748b;">
                  <strong style="color: #0f172a;">Admissions &amp; Training Desk</strong><br>
                  Velvora Solutions<br>
                  Email: <a href="mailto:info@velvorasolutions.com" style="color: #0284c7;">info@velvorasolutions.com</a><br>
                  Website: <a href="https://velvorasolutions.com" style="color: #0284c7;">https://velvorasolutions.com</a>
                </div>
              </div>
            </div>
          `
        });
        console.log(`[Express Training] Confirmation email sent to ${email.trim()}`);
      } catch (candMailErr) {
        console.warn('Could not send candidate confirmation email:', candMailErr.message);
      }

    } catch (mailErr) {
      console.warn('SMTP Send Warning for Training Enquiry (logged to JSON):', mailErr.message);
    }

    return res.status(200).json({
      success: true,
      referenceId,
      candidateConfirmationSent: true,
      message: 'Your training enrollment enquiry has been submitted successfully and a confirmation email has been sent.'
    });

  } catch (error) {
    console.error('Training Enquiry Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit enquiry. Please try again or contact us directly.'
    });
  }
});

// -------------------------------------------------------------
// 2. CAREER APPLICATION ENDPOINT (WITH RESUME ATTACHMENT)
// -------------------------------------------------------------
app.post('/api/career', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'Resume file size exceeds the 10MB limit.' });
      }
      return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { name, email, phone, role, portfolio, websiteUrl, message } = req.body;

      // Validation
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

      // Check for resume file attachment
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

      const recipient = process.env.EMAIL_TO || 'info@velvorasolutions.com';
      const sender = process.env.EMAIL_FROM || `"Velvora Solutions" <${process.env.SMTP_USER || 'no-reply@velvorasolutions.com'}>`;
      const appliedRole = role.trim();

      // HTML Email Template for HR
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
                  📎 ${escapeHtml(req.file.originalname)} (${(req.file.size / (1024 * 1024)).toFixed(2)} MB) — Attached Below
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

      const plainText = `
New Job Application - Velvora Solutions
-----------------------------------------
Candidate: ${name.trim()}
Role Applied: ${appliedRole}
Email: ${email.trim()}
Phone: ${phone.trim()}
${portfolio ? `Portfolio/LinkedIn: ${portfolio.trim()}\n` : ''}${websiteUrl ? `Personal Site/URL: ${websiteUrl.trim()}\n` : ''}Resume Attached: ${req.file.originalname} (${(req.file.size / (1024 * 1024)).toFixed(2)} MB)
Submitted At: ${new Date().toISOString()}

${message ? `Cover Note:\n${message.trim()}\n` : ''}-----------------------------------------
Reply-To: ${email.trim()}
      `;

      const transporter = createTransporter();

      // 1. Send Internal HR Notification with resume
      await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: email.trim(),
        subject: `[Job Application] ${appliedRole} - ${name.trim()}`,
        text: plainText,
        html: htmlContent,
        attachments: [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: req.file.mimetype
          }
        ]
      });
      console.log(`[Express Career] Internal HR application email sent for ${name.trim()} (${email.trim()})`);

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
        console.log(`[Express Career] Candidate confirmation email sent successfully to ${email.trim()}`);
      } catch (confErr) {
        candidateEmailError = confErr.message;
        console.error(`[Express Career] Candidate confirmation email failed for ${email.trim()}:`, confErr);
      }

      return res.status(200).json({
        success: true,
        emailSent: true,
        candidateConfirmationSent,
        candidateEmailError: candidateEmailError || undefined,
        message: 'Your application has been submitted successfully and a confirmation email has been sent.'
      });

    } catch (error) {
      console.error('Career Form Error:', error.message);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to submit application. Please try again or contact us directly.'
      });
    }
  });
});

// -------------------------------------------------------------
// 2.1 JOB DETAIL APPLY ENDPOINT (/api/apply)
// -------------------------------------------------------------
app.post('/api/apply', async (req, res) => {
  try {
    const { name, email, phone, location, experience, role, portfolio, resumeName, message } = req.body || {};

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

    const appliedRole = (role && role.trim()) ? role.trim() : 'Applied Role';
    const recipient = process.env.EMAIL_TO || 'info@velvorasolutions.com';
    const sender = process.env.EMAIL_FROM || `"Velvora Solutions" <${process.env.SMTP_USER || 'info@velvorasolutions.com'}>`;
    const transporter = createTransporter();

    // 1. Send Internal HR Notification
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Job Application] ${appliedRole} - ${name.trim()}`,
      text: `New Application for ${appliedRole}\nCandidate: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone || 'Not provided'}\nLocation: ${location || ''}\nExperience: ${experience || ''}\nMessage: ${message || ''}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 22px 26px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; color: #ffffff;">New Job Application: ${escapeHtml(appliedRole)}</h2>
          </div>
          <div style="padding: 24px;">
            <p><strong>Candidate:</strong> ${escapeHtml(name.trim())}</p>
            <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
            <p><strong>Experience:</strong> ${escapeHtml(experience || 'Not specified')}</p>
            ${portfolio ? `<p><strong>Portfolio:</strong> ${escapeHtml(portfolio)}</p>` : ''}
            ${message ? `<p><strong>Note:</strong> ${escapeHtml(message)}</p>` : ''}
          </div>
        </div>
      `
    });

    // 2. Automatically Send Confirmation Email to Candidate
    try {
      const { html: candHtml, text: candText } = getCandidateConfirmationEmail({
        name: name.trim(),
        appliedRole,
        fileName: resumeName || 'Application on file'
      });

      await transporter.sendMail({
        from: sender,
        to: email.trim(),
        subject: 'Application Received Successfully – Velvora Solutions',
        text: candText,
        html: candHtml
      });
      console.log(`[Express Apply] Confirmation email dispatched to ${email.trim()}`);
    } catch (candErr) {
      console.error(`[Express Apply] Failed to send candidate confirmation email:`, candErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Your application has been received and a confirmation email has been dispatched to your inbox.'
    });

  } catch (err) {
    console.error('Express Apply Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to submit application.' });
  }
});

// -------------------------------------------------------------
// 3. VORA CHATBOT & LIVE KNOWLEDGE SYNCHRONIZATION ENDPOINTS
// -------------------------------------------------------------

// Chat query endpoint
app.post('/api/vora/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    const result = await voraStore.answerQuery(message, history);
    res.json({
      success: true,
      reply: result.reply,
      sources: result.sources || [],
      metadata: voraStore.getMetadata()
    });
  } catch (err) {
    console.error('Vora Chat Error:', err);
    res.status(500).json({
      success: false,
      error: 'VORA encountered a processing error. Please try again.',
      reply: "Thank you for reaching out! Our assistant encountered a momentary server issue. You can explore our verified sections or reach out directly to our team at info@velvorasolutions.com / +91 9500834236.",
      sources: [
        { title: 'Services Overview', url: '/services' },
        { title: 'Training & Internships', url: '/training' },
        { title: 'Contact Our Team', url: '/contact' }
      ]
    });
  }
});

// Knowledge summary and sync status
app.get('/api/vora/knowledge', (req, res) => {
  res.json({
    success: true,
    metadata: voraStore.getMetadata(),
    pagesCount: voraStore.getPages().length,
    activeCareersCount: voraStore.getCareers({ status: 'Active' }).length,
    pages: voraStore.getPages().map(p => ({ id: p.id, title: p.title, url: p.url, category: p.category })),
    activeCareers: voraStore.getCareers({ status: 'Active' })
  });
});

// Dynamic Careers management
app.get('/api/vora/careers', (req, res) => {
  const { status, type, query } = req.query;
  const list = voraStore.getCareers({ status, type, query });
  res.json({ success: true, careers: list, total: list.length });
});

app.post('/api/vora/careers', (req, res) => {
  try {
    const { title, department, type, workMode, location, experience, skills, eligibility, summary } = req.body || {};
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Job title is required.' });
    }
    const record = voraStore.addCareer({
      title: title.trim(),
      department: (department || 'Engineering & Operations').trim(),
      type: (type || 'Full-Time / Hybrid').trim(),
      workMode: (workMode || 'Hybrid').trim(),
      location: (location || 'Cuddalore, TN / Hybrid').trim(),
      experience: (experience || 'Fresher / Experienced').trim(),
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : ['Problem Solving']),
      eligibility: (eligibility || 'Relevant degree or equivalent experience.').trim(),
      summary: (summary || `Exciting opportunity for ${title} at Velvora Solutions.`).trim(),
      status: 'Active'
    });
    res.status(201).json({ success: true, career: record, message: 'Career listing published successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/vora/careers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updated = voraStore.updateCareer(id, req.body || {});
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Career listing not found.' });
    }
    res.json({ success: true, career: updated, message: 'Career listing updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/vora/careers/:id/close', (req, res) => {
  try {
    const { id } = req.params;
    const closed = voraStore.closeCareer(id);
    if (!closed) {
      return res.status(404).json({ success: false, error: 'Career listing not found.' });
    }
    res.json({ success: true, career: closed, message: 'Career listing marked as Closed.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin synchronization trigger
app.post('/api/vora/sync', async (req, res) => {
  try {
    const result = await voraStore.syncAll(true);
    res.json({
      success: result.success,
      metadata: voraStore.getMetadata(),
      message: result.success ? 'Website content synchronized successfully with VORA knowledge base.' : result.error
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/vora/sync/status', (req, res) => {
  res.json({
    success: true,
    metadata: voraStore.getMetadata(),
    indexedPages: voraStore.getPages().length,
    indexedCareers: voraStore.getCareers().length
  });
});

// Start Express Server if run directly
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('server.js') || 
  process.argv[1].endsWith('server')
);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`Velvora Solutions Email API server is running on http://localhost:${PORT}`);
  });
}

export { app };
export default app;

