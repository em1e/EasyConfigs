import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Always return success message for security (don't reveal if email exists)
    const successMessage = 'If an account with that email exists, we\'ve sent a password reset link.'

    if (!user) {
      return NextResponse.json({ message: successMessage })
    }

    // Delete any existing password reset tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        email,
        type: 'password_reset'
      }
    })

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save password reset token
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        email,
        token: resetToken,
        expires: expiresAt,
        type: 'password_reset'
      }
    })

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(email, resetToken)

    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error)
    }

    return NextResponse.json({ message: successMessage })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
