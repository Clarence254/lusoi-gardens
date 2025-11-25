import nodemailer from 'nodemailer';

export interface EmailOptions {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  toEmail: string;
}

/**
 * Send an email using nodemailer
 * @param options Email options including subject and HTML content
 * @param config Email configuration (SMTP settings)
 * @returns Promise that resolves to the result of sending the email
 */
export async function sendEmail(options: EmailOptions, config: EmailConfig) {
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass || !config.fromEmail || !config.toEmail) {
    throw new Error('Missing required email configuration. Please check your environment variables.');
  }

  // Create transporter with provided config
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
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

