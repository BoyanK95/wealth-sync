-- Create tables with proper casing
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMP,
  "image" TEXT,
  "password" TEXT
);

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
);

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" TEXT PRIMARY KEY,
  "sessionToken" TEXT UNIQUE,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "expires" TIMESTAMP NOT NULL,
  UNIQUE("identifier", "token")
);

CREATE TABLE IF NOT EXISTS "Post" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL,
  "createdById" TEXT NOT NULL,
  FOREIGN KEY ("createdById") REFERENCES "users"("id")
);

CREATE INDEX IF NOT EXISTS "Post_name_idx" ON "Post"("name");

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
);