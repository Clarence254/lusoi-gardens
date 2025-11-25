import type { APIRoute } from 'astro';
import { sendEmail } from '../../utils/email';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  // Get environment variables from Cloudflare runtime
  const env = (locals as any).runtime?.env || {};
  
  const smtpHost = env.ZOHO_SMTP_HOST || import.meta.env.ZOHO_SMTP_HOST || process.env.ZOHO_SMTP_HOST;
  const smtpPort = parseInt(env.ZOHO_SMTP_PORT || import.meta.env.ZOHO_SMTP_PORT || process.env.ZOHO_SMTP_PORT || '587');
  const smtpUser = env.ZOHO_SMTP_USER || import.meta.env.ZOHO_SMTP_USER || process.env.ZOHO_SMTP_USER;
  const smtpPass = env.ZOHO_SMTP_PASS || import.meta.env.ZOHO_SMTP_PASS || process.env.ZOHO_SMTP_PASS;
  const fromEmail = env.ZOHO_FROM_EMAIL || import.meta.env.ZOHO_FROM_EMAIL || process.env.ZOHO_FROM_EMAIL;
  const toEmail = env.ZOHO_TO_EMAIL || import.meta.env.ZOHO_TO_EMAIL || process.env.ZOHO_TO_EMAIL;
  try {
    let formData: FormData;
    const contentType = request.headers.get('content-type') || '';
    
    // Handle different content types
    if (contentType.includes('application/json')) {
      // If JSON is sent, convert to FormData
      const json = await request.json();
      formData = new FormData();
      Object.keys(json).forEach(key => {
        if (json[key] !== null && json[key] !== undefined) {
          formData.append(key, String(json[key]));
        }
      });
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Handle URL-encoded form data
      const text = await request.text();
      const params = new URLSearchParams(text);
      formData = new FormData();
      params.forEach((value, key) => {
        formData.append(key, value);
      });
    } else {
      // Default to FormData (multipart/form-data)
      formData = await request.formData();
    }
    
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const stayDate = formData.get('stay-date')?.toString() || '';
    const rating = formData.get('rating')?.toString() || '';
    const accommodation = formData.get('accommodation')?.toString() || '';
    const service = formData.get('service')?.toString() || '';
    const food = formData.get('food')?.toString() || '';
    const activities = formData.get('activities')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Validate required fields
    if (!name || !email || !rating || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please fill in all required fields.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please provide a valid email address.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Format ratings display
    const formatRating = (value: string) => {
      if (!value) return 'Not provided';
      return `${value}/5`;
    };

    // Format email content
    const htmlContent = `
      <h2>New Guest Feedback Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${stayDate ? `<p><strong>Date of Stay:</strong> ${escapeHtml(stayDate)}</p>` : ''}
      <hr>
      <h3>Ratings</h3>
      <p><strong>Overall Rating:</strong> ${formatRating(rating)}</p>
      ${accommodation ? `<p><strong>Accommodation:</strong> ${formatRating(accommodation)}</p>` : ''}
      ${service ? `<p><strong>Service:</strong> ${formatRating(service)}</p>` : ''}
      ${food ? `<p><strong>Food & Dining:</strong> ${formatRating(food)}</p>` : ''}
      ${activities ? `<p><strong>Activities & Experiences:</strong> ${formatRating(activities)}</p>` : ''}
      <hr>
      <h3>Feedback</h3>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This email was sent from the Lusoi Gardens guest feedback form.</small></p>
    `;

    // Send email
    await sendEmail({
      subject: `Guest Feedback: ${name} - ${formatRating(rating)} Rating`,
      html: htmlContent,
    }, {
      smtpHost: smtpHost || '',
      smtpPort,
      smtpUser: smtpUser || '',
      smtpPass: smtpPass || '',
      fromEmail: fromEmail || '',
      toEmail: toEmail || '',
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your feedback! We appreciate you taking the time to share your experience.' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing guest feedback form:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An error occurred while submitting your feedback. Please try again later.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

