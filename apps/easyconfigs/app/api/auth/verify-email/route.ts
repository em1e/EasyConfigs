import { NextRequest, NextResponse } from 'next/server'
import { tempDb } from '@/lib/temp-db'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find the verification token
    const verificationToken = tempDb.verificationToken.findUnique({
      where: { token }
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date(verificationToken.expires) < new Date()) {
      // Clean up expired token
      tempDb.verificationToken.delete({
        where: { id: verificationToken.id }
      })
      
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Update user's emailVerified status
    const user = tempDb.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      )
    }

    // Delete the verification token
    tempDb.verificationToken.delete({
      where: { id: verificationToken.id }
    })

    return NextResponse.json({
      message: 'Email verified successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      }
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
