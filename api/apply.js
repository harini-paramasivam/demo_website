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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

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

    const appliedRole = (role && role.trim()) ? role.trim() : 'Specialist Role';
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

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    // 1. Send Internal Notification to HR
    const internalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Job Application</h2>
          <p style="margin: 0; font-size: 14px; color: #93c5fd;">Candidate applied for: <strong style="color: #ffffff;">${escapeHtml(appliedRole)}</strong></p>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;"><strong>Candidate Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Phone Number:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${escapeHtml(phone || 'Not provided')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Role Applied:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${escapeHtml(appliedRole)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Experience:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${escapeHtml(experience || 'Not specified')} (${escapeHtml(location || '')})</td>
            </tr>
            ${portfolio ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Portfolio:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7;">${escapeHtml(portfolio)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Resume Reference:</strong></td>
              <td style="padding: 8px 0; color: #16a34a; font-weight: 600;">${escapeHtml(resumeName || 'On File')}</td>
            </tr>
          </table>
          ${message ? `
          <div style="background: #f8fafc; border-left: 4px solid #38bdf8; padding: 14px 18px; border-radius: 6px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #475569;">Cover Note</p>
            <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: #1e293b;">${escapeHtml(message)}</p>
          </div>` : ''}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Job Application] ${appliedRole} - ${name.trim()}`,
      html: internalHtml
    });

    // 2. Automatically Send Confirmation Email to Candidate
    let candidateConfirmationSent = false;
    try {
      const candidateHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 28px 32px; color: #ffffff;">
            <h2 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #ffffff;">VELVORA<span style="color: #00d2ff;">.</span>SOLUTIONS</h2>
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">Careers &bull; Recruitment Desk</p>
          </div>
          <div style="padding: 32px; font-size: 15px; line-height: 1.7; color: #1e293b;">
            <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Dear ${escapeHtml(name.trim())},</p>
            <p style="margin: 0 0 16px 0;">Thank you for your interest in career opportunities at <strong>Velvora Solutions</strong>.</p>
            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 14px 18px; margin: 18px 0; color: #15803d; font-weight: 600;">
              &#10003; We are pleased to confirm that we have successfully received your application for <strong>${escapeHtml(appliedRole)}</strong>.
            </div>
            <p style="margin: 0 0 16px 0;">Our recruitment team will carefully review your submitted details and qualifications. If your profile matches our current requirements, our team will contact you regarding the next steps in the recruitment process.</p>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 20px 0; color: #1e40af; font-weight: 600; font-size: 14px;">
              &#9201; Our team will get in touch with you within 48 business hours.
            </div>
            <p style="margin: 0 0 24px 0;">We appreciate your interest in becoming a part of Velvora Solutions and thank you for considering us for your career journey.</p>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13.5px; color: #64748b;">
              <strong style="color: #0f172a;">Best Regards,</strong><br>
              <span style="color: #0284c7; font-weight: 600;">HR &amp; Recruitment Team</span><br>
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
        subject: 'Application Received Successfully – Velvora Solutions',
        text: `Dear ${name.trim()},\n\nThank you for your interest in career opportunities at Velvora Solutions.\n\nWe are pleased to confirm that we have successfully received your application for ${appliedRole}.\n\nOur recruitment team will carefully review your qualifications and reach out within 48 business hours.\n\nBest Regards,\nHR & Recruitment Team\nVelvora Solutions\nEmail: info@velvorasolutions.com\nWebsite: https://velvorasolutions.com`,
        html: candidateHtml
      });
      candidateConfirmationSent = true;
      console.log(`[Apply API] Candidate confirmation email sent to ${email.trim()}`);
    } catch (confErr) {
      console.error(`[Apply API] Candidate confirmation email failed:`, confErr);
    }

    return res.status(200).json({
      success: true,
      candidateConfirmationSent,
      message: 'Your application has been received successfully.'
    });

  } catch (err) {
    console.error('Apply Handler Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to submit application.' });
  }
}

