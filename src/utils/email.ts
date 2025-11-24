import nodemailer from 'nodemailer';

// Get environment variables
const smtpHost = import.meta.env.ZOHO_SMTP_HOST || process.env.ZOHO_SMTP_HOST;
const smtpPort = parseInt(import.meta.env.ZOHO_SMTP_PORT || process.env.ZOHO_SMTP_PORT || '587');
const smtpUser = import.meta.env.ZOHO_SMTP_USER || process.env.ZOHO_SMTP_USER;
const smtpPass = import.meta.env.ZOHO_SMTP_PASS || process.env.ZOHO_SMTP_PASS;
const fromEmail = import.meta.env.ZOHO_FROM_EMAIL || process.env.ZOHO_FROM_EMAIL;
const toEmail = import.meta.env.ZOHO_TO_EMAIL || process.env.ZOHO_TO_EMAIL;

// Create transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export interface EmailOptions {
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using nodemailer
 * @param options Email options including subject and HTML content
 * @returns Promise that resolves to the result of sending the email
 */
export async function sendEmail(options: EmailOptions) {
  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
    throw new Error('Missing required email configuration. Please check your .env file.');
  }

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: options.subject,
    html: options.html,
    text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

