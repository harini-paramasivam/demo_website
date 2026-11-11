export default function handler(req, res) {
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME || '').trim();
  const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465);

  res.status(200).json({
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
}
