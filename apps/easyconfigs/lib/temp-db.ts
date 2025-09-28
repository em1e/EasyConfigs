import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

// Temporary file-based storage for development
const USERS_FILE = path.join(process.cwd(), 'temp-users.json')
const TOKENS_FILE = path.join(process.cwd(), 'temp-tokens.json')

interface User {
  id: string
  name: string
  email: string
  password: string
  emailVerified: Date | null
  createdAt: Date
}

interface VerificationToken {
  id: string
  userId: string
  email: string
  token: string
  expires: Date
  type: string
}

function readUsers(): User[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading users file:', error)
  }
  return []
}

function writeUsers(users: User[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error writing users file:', error)
  }
}

function readTokens(): VerificationToken[] {
  try {
    if (fs.existsSync(TOKENS_FILE)) {
      const data = fs.readFileSync(TOKENS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading tokens file:', error)
  }
  return []
}

function writeTokens(tokens: VerificationToken[]) {
  try {
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2))
  } catch (error) {
    console.error('Error writing tokens file:', error)
  }
}

export const tempDb = {
  user: {
    findUnique: ({ where }: { where: { email: string } }) => {
      const users = readUsers()
      return users.find(user => user.email === where.email) || null
    },
    
    create: ({ data }: { data: Omit<User, 'id' | 'createdAt'> }) => {
      const users = readUsers()
      const newUser: User = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date()
      }
      users.push(newUser)
      writeUsers(users)
      return newUser
    },
    
    update: ({ where, data }: { where: { id: string }, data: Partial<User> }) => {
      const users = readUsers()
      const index = users.findIndex(user => user.id === where.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...data }
        writeUsers(users)
        return users[index]
      }
      return null
    }
  },
  
  verificationToken: {
    create: ({ data }: { data: Omit<VerificationToken, 'id'> }) => {
      const tokens = readTokens()
      const newToken: VerificationToken = {
        id: crypto.randomUUID(),
        ...data
      }
      tokens.push(newToken)
      writeTokens(tokens)
      return newToken
    },
    
    findUnique: ({ where }: { where: { token: string } }) => {
      const tokens = readTokens()
      return tokens.find(token => token.token === where.token) || null
    },
    
    delete: ({ where }: { where: { id: string } }) => {
      const tokens = readTokens()
      const filtered = tokens.filter(token => token.id !== where.id)
      writeTokens(filtered)
    }
  }
}
