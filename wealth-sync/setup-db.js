import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database setup...');
    
    // Create schema if it doesn't exist
    await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS public`;
    
    console.log('Schema created or already exists.');
    console.log('Creating tables...');
    
    // Create users table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT,
        "email" TEXT UNIQUE,
        "emailVerified" TIMESTAMP,
        "image" TEXT,
        "password" TEXT
      )
    `);
    console.log('Users table created.');
    
    // Create accounts table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "accounts" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "provider" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        "scope" TEXT,
        "id_token" TEXT,
        "session_state" TEXT,
        "refresh_token_expires_in" INTEGER,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        UNIQUE("provider", "providerAccountId")
      )
    `);
    console.log('Accounts table created.');
    
    // Create sessions table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "id" TEXT PRIMARY KEY,
        "sessionToken" TEXT UNIQUE,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    console.log('Sessions table created.');
    
    // Create verification_tokens table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "verification_tokens" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "expires" TIMESTAMP NOT NULL,
        UNIQUE("identifier", "token")
      )
    `);
    console.log('Verification tokens table created.');
    
    // Create Post table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Post" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL,
        "createdById" TEXT NOT NULL,
        FOREIGN KEY ("createdById") REFERENCES "users"("id")
      )
    `);
    console.log('Post table created.');
    
    // Create Post index
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Post_name_idx" ON "Post"("name")
    `);
    console.log('Post index created.');
    
    // Create PlatformConnection table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PlatformConnection" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "platformId" TEXT NOT NULL,
        "apiKey" TEXT NOT NULL,
        "isConnected" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        UNIQUE("userId", "platformId")
      )
    `);
    console.log('PlatformConnection table created.');
    
    console.log('All tables created successfully!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
