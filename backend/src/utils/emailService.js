const nodemailer = require('nodemailer')

// Create reusable transporter
let transporter = null

const initTransporter = () => {
  if (transporter) return transporter
  
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('Email configuration incomplete - notifications disabled')
    return null
  }
  
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })
  
  return transporter
}

// Send email notification to owner for new contact form submission
const notifyNewContact = async (contact) => {
  const transport = initTransporter()
  if (!transport) return false
  
  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER
  
  try {
    await transport.sendMail({
      from: `"Brainiax Website" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: `🔔 New Contact Form Submission - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1f2937, #374151); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Contact Inquiry</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${contact.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${contact.email}" style="color: #2563eb;">${contact.email}</a>
                </td>
              </tr>
              ${contact.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="tel:${contact.phone}" style="color: #2563eb;">${contact.phone}</a>
                </td>
              </tr>
              ` : ''}
              ${contact.company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Company:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${contact.company}</td>
              </tr>
              ` : ''}
              ${contact.preferredDate ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Preferred Date:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${contact.preferredDate}</td>
              </tr>
              ` : ''}
              ${contact.preferredTime ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Preferred Time:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${contact.preferredTime}</td>
              </tr>
              ` : ''}
            </table>
            
            ${contact.message ? `
            <h3 style="color: #1f2937; margin-top: 25px;">Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #374151; white-space: pre-wrap;">${contact.message}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 15px; background: #dbeafe; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                💡 <strong>Quick Action:</strong> Reply directly to this email to contact ${contact.name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: contact.email
    })
    console.log('Contact notification email sent to', ownerEmail)
    return true
  } catch (err) {
    console.error('Failed to send contact notification:', err.message)
    return false
  }
}

// Send email notification to owner for new job application
const notifyNewApplication = async (resume, job = null) => {
  const transport = initTransporter()
  if (!transport) return false
  
  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER
  const jobTitle = job?.title || resume.position || 'General Application'
  
  try {
    await transport.sendMail({
      from: `"Brainiax Website" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: `📄 New Job Application - ${resume.name} for ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Job Application</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Position: ${jobTitle}</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${resume.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${resume.email}" style="color: #2563eb;">${resume.email}</a>
                </td>
              </tr>
              ${resume.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="tel:${resume.phone}" style="color: #2563eb;">${resume.phone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Resume:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  ${resume.resumeFileName || 'Attached'}
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 25px; padding: 20px; background: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                📎 <strong>Resume file:</strong> The resume has been saved to the server.<br>
                Access it via the admin dashboard or at: <code>${resume.resumeUrl}</code>
              </p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                💡 <strong>Quick Action:</strong> Reply directly to this email to contact ${resume.name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: resume.email
    })
    console.log('Application notification email sent to', ownerEmail)
    return true
  } catch (err) {
    console.error('Failed to send application notification:', err.message)
    return false
  }
}

module.exports = {
  notifyNewContact,
  notifyNewApplication
}
