import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { tempDb } from '@/lib/temp-db'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = tempDb.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const autoVerify = process.env.NODE_ENV === 'development' && process.env.DEV_AUTO_VERIFY_EMAIL === 'true'
    const user = tempDb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: autoVerify ? new Date() : null
      }
    })

    // If auto-verify is enabled, skip email verification process
    if (autoVerify) {
      return NextResponse.json({
        message: 'Account created and automatically verified for development!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified
        },
        developmentMode: true,
        autoVerified: true
      })
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Save verification token
    tempDb.verificationToken.create({
      data: {
        userId: user.id,
        email,
        token: verificationToken,
        expires: expiresAt,
        type: 'email_verification'
      }
    })

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken)

    if (!emailResult.success) {
      // If email fails, we still want to return success but log the error
      console.error('Failed to send verification email:', emailResult.error)
      
      // In development, provide the verification URL directly
      if (process.env.NODE_ENV === 'development') {
        const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`
        console.log('='.repeat(80))
        console.log('📧 EMAIL VERIFICATION (Development Mode)')
        console.log('='.repeat(80))
        console.log('Email sending failed, but here is your verification link:')
        console.log(verificationUrl)
        console.log('='.repeat(80))
        
        return NextResponse.json({
          message: 'Account created successfully! Check the server console for your verification link.',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified
          },
          developmentMode: true,
          verificationUrl: verificationUrl,
          note: 'In development: verification link provided in response and console'
        })
      }
    } else {
      console.log('Email sent successfully!')
    }

    return NextResponse.json({
      message: 'Account created successfully! Please check your email to verify your account.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
