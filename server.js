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

// Nodemailer Transporter Factory
function createTransporter() {
  dotenv.config({ override: true });
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  if (!user || !pass) {
    throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS in your .env file.');
  }

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
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(user && pass)
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

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Contact Enquiry] ${cleanSubject}`,
      text: plainText,
      html: htmlContent
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.'
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

      const recipient = process.env.EMAIL_TO || 'harinip0301@gmail.com';
      const sender = process.env.EMAIL_FROM || `"Velvora Solutions" <${process.env.SMTP_USER || 'no-reply@velvorasolutions.com'}>`;
      const appliedRole = role.trim();

      // HTML Email Template
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

      return res.status(200).json({
        success: true,
        message: 'Your application has been submitted successfully.'
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
// 3. VORA CHATBOT & LIVE KNOWLEDGE SYNCHRONIZATION ENDPOINTS
// -------------------------------------------------------------

// Chat query endpoint
app.post('/api/vora/chat', (req, res) => {
  try {
    const { message } = req.body || {};
    const result = voraStore.answerQuery(message);
    res.json({
      success: true,
      reply: result.reply,
      sources: result.sources,
      metadata: voraStore.getMetadata()
    });
  } catch (err) {
    console.error('Vora Chat Error:', err);
    res.status(500).json({
      success: false,
      error: 'VORA encountered a processing error. Please try again.',
      reply: "I'm having a brief connection pause. Please feel free to check our Services or Careers pages directly!",
      sources: [
        { title: 'Services Overview', url: '/services' },
        { title: 'Careers Portal', url: '/careers' }
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

