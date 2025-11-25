export interface EmailOptions {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailConfig {
  // Resend API (recommended - works perfectly with Cloudflare Workers)
  resendApiKey?: string;
  
  // SendGrid API (alternative)
  sendgridApiKey?: string;
  
  // Email addresses
  fromEmail: string;
  toEmail: string;
}

/**
 * Send an email using HTTP-based API (compatible with Cloudflare Workers)
 * Uses Resend API by default, falls back to SendGrid if configured
 * @param options Email options including subject and HTML content
 * @param config Email configuration
 * @returns Promise that resolves to the result of sending the email
 */
export async function sendEmail(options: EmailOptions, config: EmailConfig) {
  if (!config.fromEmail || !config.toEmail) {
    throw new Error('Missing required email configuration (fromEmail and toEmail).');
  }

  const textContent = options.text || options.html.replace(/<[^>]*>/g, '');

  // Use Resend API (recommended for Cloudflare Workers)
  if (config.resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.fromEmail,
          to: config.toEmail,
          subject: options.subject,
          html: options.html,
          text: textContent,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.id,
      };
    } catch (error) {
      console.error('Resend API error:', error);
      throw error;
    }
  }

  // Fallback to SendGrid API
  if (config.sendgridApiKey) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.sendgridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: { email: config.fromEmail },
          personalizations: [{
            to: [{ email: config.toEmail }],
            subject: options.subject,
          }],
          content: [
            { type: 'text/html', value: options.html },
            { type: 'text/plain', value: textContent },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`SendGrid API error: ${response.status} - ${error}`);
      }

      return {
        success: true,
        messageId: response.headers.get('x-message-id') || 'unknown',
      };
    } catch (error) {
      console.error('SendGrid API error:', error);
      throw error;
    }
  }

  throw new Error('No email API configuration found. Please set RESEND_API_KEY or SENDGRID_API_KEY environment variable.');
}

