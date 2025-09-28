import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`
  
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [email],
      subject: 'Verify your EasyConfigs account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your EasyConfigs account</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to EasyConfigs!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-top: 0; font-size: 24px;">Verify your email address</h2>
            
            <p style="color: #4a5568; font-size: 16px; margin-bottom: 30px;">
              Thanks for signing up! To complete your registration and start creating error-free configuration files, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 16px 32px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: 600; 
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.39);">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #718096; font-size: 14px; margin-top: 30px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            <p style="color: #4299e1; font-size: 14px; word-break: break-all; background: #f7fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #4299e1;">
              ${verificationUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0;">
            
            <p style="color: #718096; font-size: 14px; margin-bottom: 8px;">
              This verification link will expire in 24 hours for security reasons.
            </p>
            
            <p style="color: #718096; font-size: 14px;">
              If you didn't create an account with EasyConfigs, you can safely ignore this email.
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} EasyConfigs. Made with ❤️ for developers worldwide.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    
    // Check if Resend returned an error in the response
    if (data.error) {
      console.error('Resend API error:', data.error)
      return { success: false, error: data.error }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send verification email:', error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@easyconfigs.com',
      to: [email],
      subject: 'Reset your EasyConfigs password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset your EasyConfigs password</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Password Reset</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-top: 0; font-size: 24px;">Reset your password</h2>
            
            <p style="color: #4a5568; font-size: 16px; margin-bottom: 30px;">
              You requested to reset your password for your EasyConfigs account. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 16px 32px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: 600; 
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.39);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #718096; font-size: 14px; margin-top: 30px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            <p style="color: #4299e1; font-size: 14px; word-break: break-all; background: #f7fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #4299e1;">
              ${resetUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0;">
            
            <p style="color: #718096; font-size: 14px; margin-bottom: 8px;">
              This password reset link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #718096; font-size: 14px;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} EasyConfigs. Made with ❤️ for developers worldwide.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    return { success: false, error }
  }
}
