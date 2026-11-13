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
    const { name, email, phone, lookingFor, subject, message } = req.body || {};

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
    const cleanSubject = (lookingFor && lookingFor.trim()) 
      ? `Contact Enquiry [${lookingFor.trim()}] from ${name.trim()}`
      : ((subject && subject.trim()) ? subject.trim() : `Contact Enquiry from ${name.trim()}`);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #070e24 0%, #0d1e4c 100%); padding: 24px 28px; color: #ffffff;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Contact Enquiry</h2>
          <p style="margin: 0; font-size: 13px; color: #93c5fd;">Velvora Solutions — Client &amp; Partner Form</p>
        </div>

        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 130px;"><strong>Sender Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Sender Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #0284c7; text-decoration: none;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Phone / WhatsApp:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">
                <a href="tel:${escapeHtml(phone.replace(/\s+/g, ''))}" style="color: #0f172a; text-decoration: none;">${escapeHtml(phone.trim())}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;"><strong>Looking For:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 14px; font-weight: 600;">${escapeHtml(lookingFor || cleanSubject)}</td>
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

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    // 1. Send internal notification to Velvora
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email.trim(),
      subject: `[Contact Enquiry] ${cleanSubject}`,
      html: htmlContent
    });

    // 2. Automatically Send Confirmation Email to the user (Client Consultation Specific)
    let userConfirmationSent = false;
    try {
      const serviceTitle = escapeHtml(lookingFor || 'Project Consultation & Services');
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
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${serviceTitle}</td>
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
        subject: `Enquiry Received – ${lookingFor || 'Project Consultation'} | Velvora Solutions`,
        text: `Dear ${name.trim()},\n\nThank you for contacting Velvora Solutions.\nWe have received your enquiry regarding ${lookingFor || 'our services'}.\n\nOur client team will contact you within 24 business hours.\n\nBest Regards,\nClient Solutions Team\nVelvora Solutions\nEmail: info@velvorasolutions.com\nWebsite: https://velvorasolutions.com`,
        html: userHtml
      });
      userConfirmationSent = true;
      console.log(`[Contact API] Client confirmation email sent successfully to ${email.trim()}`);
    } catch (candErr) {
      console.error(`[Contact API] Failed to send user confirmation email:`, candErr);
    }

    return res.status(200).json({
      success: true,
      userConfirmationSent,
      message: 'Your message has been sent successfully and a confirmation email has been dispatched to your inbox.'
    });
  } catch (error) {
    console.error('Contact Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to send message.' });
  }
}

