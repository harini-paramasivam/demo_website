import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('=== SMTP CONFIGURATION DETECTION ===');
const hasHost = Boolean(process.env.SMTP_HOST);
const hasPort = Boolean(process.env.SMTP_PORT);
const hasSecure = Boolean(process.env.SMTP_SECURE);
const hasUser = Boolean(process.env.SMTP_USER || process.env.SMTP_USERNAME);
const hasPass = Boolean(process.env.SMTP_PASS || process.env.SMTP_PASSWORD);
const hasFrom = Boolean(process.env.EMAIL_FROM || process.env.SMTP_FROM);
const hasTo = Boolean(process.env.EMAIL_TO || process.env.SMTP_TO);

console.log({
  hasHost,
  hasPort,
  hasSecure,
  hasUser,
  hasPass,
  hasFrom,
  hasTo,
  host: process.env.SMTP_HOST || 'default',
  port: process.env.SMTP_PORT || 'default',
  secure: process.env.SMTP_SECURE || 'default',
  userAddress: process.env.SMTP_USER ? process.env.SMTP_USER.replace(/(?<=.).(?=.*@)/g, '*') : 'missing'
});

async function run() {
  const host = (process.env.SMTP_HOST || 'smtppro.zoho.in').trim();
  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465);
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME || '').trim();
  const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
  const recipient = (process.env.EMAIL_TO || process.env.SMTP_TO || 'info@velvorasolutions.com').trim();
  const sender = (process.env.EMAIL_FROM || process.env.SMTP_FROM || `"Velvora Solutions" <${user}>`).trim();

  console.log('\n=== TESTING ZOHO SMTP AUTHENTICATION ===');
  console.log(`Connecting to ${host}:${port} (secure: ${secure})...`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: true
    }
  });

  try {
    await transporter.verify();
    console.log('✅ SUCCESS: Zoho SMTP Authentication verified successfully!');
  } catch (authErr) {
    console.error('❌ AUTH ERROR:', authErr.message);
    if (host !== 'smtppro.zoho.in') {
      console.log('Retrying with smtppro.zoho.in...');
      const zohoTransporter = nodemailer.createTransport({
        host: 'smtppro.zoho.in',
        port: 465,
        secure: true,
        auth: { user, pass }
      });
      try {
        await zohoTransporter.verify();
        console.log('✅ SUCCESS: smtppro.zoho.in verified successfully!');
        return runDelivery(zohoTransporter, user, recipient, sender);
      } catch (err2) {
        console.error('❌ smtppro.zoho.in also failed:', err2.message);
      }
    }
    return;
  }

  await runDelivery(transporter, user, recipient, sender);
}

async function runDelivery(transporter, user, recipient, sender) {
  console.log('\n=== TESTING CONTACT FORM EMAIL DELIVERY ===');
  try {
    const contactInfo = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `[Diagnostic Test] Contact Form Verification — ${new Date().toISOString()}`,
      text: 'This is an automated diagnostic test verifying contact form delivery for Velvora Solutions.',
      html: '<h3>Diagnostic Test</h3><p>Contact form delivery verified successfully.</p>'
    });
    console.log('✅ SUCCESS: Contact email delivered! MessageId:', contactInfo.messageId);
  } catch (deliveryErr) {
    console.error('❌ Contact delivery failed:', deliveryErr.message);
  }

  console.log('\n=== TESTING CAREER FORM PDF ATTACHMENT DELIVERY ===');
  try {
    const samplePdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000010 00000 n \n0000000060 00000 n \n0000000117 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n193\n%%EOF');
    const careerInfo = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `[Diagnostic Test] Career Resume PDF Attachment — ${new Date().toISOString()}`,
      text: 'This is an automated diagnostic test verifying career resume PDF attachment delivery.',
      html: '<h3>Diagnostic Test</h3><p>Career application with PDF attachment verified successfully.</p>',
      attachments: [
        {
          filename: 'Sample_Resume.pdf',
          content: samplePdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
    console.log('✅ SUCCESS: Career PDF attachment email delivered! MessageId:', careerInfo.messageId);
  } catch (careerErr) {
    console.error('❌ Career attachment delivery failed:', careerErr.message);
  }
}

run();
