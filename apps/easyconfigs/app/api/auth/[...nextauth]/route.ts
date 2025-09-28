import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    // OAuth Providers - only include if environment variables are set
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ] : []),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    ] : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log('SignIn callback:', { user, account: account?.provider, profile: profile?.email })
      // Allow OAuth sign-ins (Google, GitHub)
      if (account?.provider === 'google' || account?.provider === 'github') {
        return true
      }
      return true
    },
    async session({ session, token }: any) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.sub = user.id
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/login?error=true',
  },
  session: {
    strategy: 'jwt' as const,
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
