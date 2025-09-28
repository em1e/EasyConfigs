"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Alert, AlertDescription } from "@/registry/new-york-v4/ui/alert"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage("No verification token provided")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify email')
        }
        
        setStatus('success')
        setMessage(data.message)
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : "Failed to verify email. The link may be expired or invalid.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && "Verifying your email..."}
            {status === 'success' && "Email verified!"}
            {status === 'error' && "Verification failed"}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && "Please wait while we verify your email address"}
            {status === 'success' && "Welcome to EasyConfigs! Your account is now active"}
            {status === 'error' && "There was a problem verifying your email"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'loading' && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {status === 'success' && (
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          
          {message && (
            <Alert className={`mb-6 ${status === 'error' ? 'border-red-200' : 'border-green-200'}`}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            {status === 'success' && (
              <Button asChild className="w-full">
                <Link href="/generators">Start using EasyConfigs</Link>
              </Button>
            )}
            
            {status === 'error' && (
              <>
                <Button asChild className="w-full">
                  <Link href="/signup">Create a new account</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Contact support</Link>
                </Button>
              </>
            )}
            
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">Back to homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
