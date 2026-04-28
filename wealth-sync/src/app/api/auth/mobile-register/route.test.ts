import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock dependencies before importing the route
vi.mock("@/server/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
  },
  hash: vi.fn(),
}));

vi.mock("jsonwebtoken", () => ({
  sign: vi.fn(),
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn((body: unknown, init?: ResponseInit) => ({
      body,
      status: init?.status ?? 200,
      json: async () => body,
    })),
  },
}));

import { POST } from "./route";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/unbound-method
const mockFindUnique = vi.mocked(db.user.findUnique);
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockCreate = vi.mocked(db.user.create);
const mockBcryptHash = vi.mocked(bcrypt.hash);
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockSign = vi.mocked(sign);
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockNextResponseJson = vi.mocked(NextResponse.json);

function makeRequest(body: unknown): Request {
  return {
    json: async () => body,
  } as unknown as Request;
}

const defaultCreatedUser = {
  id: "new-user-123",
  email: "new@example.com",
  name: "new",
};

describe("POST /api/auth/mobile-register", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      JWT_SECRET: "test-jwt-secret",
      JWT_REFRESH_SECRET: "test-jwt-refresh-secret",
    };
    mockFindUnique.mockResolvedValue(null);
    mockBcryptHash.mockResolvedValue("hashed-password" as never);
    mockCreate.mockResolvedValue(defaultCreatedUser as never);
    mockSign
      .mockReturnValueOnce("mock-access-token" as never)
      .mockReturnValueOnce("mock-refresh-token" as never);
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("input validation – missing fields", () => {
    it("returns 400 when email is missing", async () => {
      const req = makeRequest({ password: "password123" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Email and password are required" },
        { status: 400 },
      );
    });

    it("returns 400 when password is missing", async () => {
      const req = makeRequest({ email: "user@example.com" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Email and password are required" },
        { status: 400 },
      );
    });

    it("returns 400 when both email and password are missing", async () => {
      const req = makeRequest({});

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Email and password are required" },
        { status: 400 },
      );
    });

    it("returns 400 when email is an empty string", async () => {
      const req = makeRequest({ email: "", password: "password123" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Email and password are required" },
        { status: 400 },
      );
    });

    it("returns 400 when password is an empty string", async () => {
      const req = makeRequest({ email: "user@example.com", password: "" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Email and password are required" },
        { status: 400 },
      );
    });
  });

  describe("email format validation", () => {
    it("returns 400 for email without @ symbol", async () => {
      const req = makeRequest({
        email: "notanemail",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid email format" },
        { status: 400 },
      );
    });

    it("returns 400 for email without domain", async () => {
      const req = makeRequest({ email: "user@", password: "password123" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid email format" },
        { status: 400 },
      );
    });

    it("returns 400 for email without TLD", async () => {
      const req = makeRequest({
        email: "user@domain",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid email format" },
        { status: 400 },
      );
    });

    it("returns 400 for email with spaces", async () => {
      const req = makeRequest({
        email: "user @example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid email format" },
        { status: 400 },
      );
    });

    it("accepts a valid email address", async () => {
      const req = makeRequest({
        email: "valid@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).not.toHaveBeenCalledWith(
        { error: "Invalid email format" },
        { status: 400 },
      );
    });
  });

  describe("password length validation", () => {
    it("returns 400 when password is shorter than 8 characters", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "short",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    });

    it("returns 400 when password is exactly 7 characters (boundary)", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "1234567",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    });

    it("accepts a password of exactly 8 characters (boundary)", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "12345678",
      });

      await POST(req);

      expect(mockNextResponseJson).not.toHaveBeenCalledWith(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    });

    it("does not return password length error for valid long password", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "averylongpassword",
      });

      await POST(req);

      expect(mockNextResponseJson).not.toHaveBeenCalledWith(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    });
  });

  describe("duplicate user detection", () => {
    it("returns 409 when email already exists", async () => {
      mockFindUnique.mockResolvedValueOnce({
        id: "existing-id",
        email: "user@example.com",
      } as never);
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    });

    it("queries db.user.findUnique with the provided email", async () => {
      const req = makeRequest({
        email: "query@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { email: "query@example.com" },
      });
    });
  });

  describe("password hashing", () => {
    it("hashes the password with bcrypt using 10 salt rounds", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockBcryptHash).toHaveBeenCalledWith("password123", 10);
    });

    it("stores the hashed password, not the plain text", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ password: "hashed-password" }),
        }),
      );
    });
  });

  describe("user creation", () => {
    it("creates user with email and hashed password", async () => {
      const req = makeRequest({
        email: "newuser@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: "newuser@example.com",
            password: "hashed-password",
          }),
        }),
      );
    });

    it("uses provided name when name is supplied", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
        name: "John Doe",
      });

      await POST(req);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: "John Doe" }),
        }),
      );
    });

    it("derives name from email prefix when name is not provided", async () => {
      const req = makeRequest({
        email: "johndoe@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: "johndoe" }),
        }),
      );
    });

    it("selects only id, email, and name from the created user", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          select: { id: true, email: true, name: true },
        }),
      );
    });
  });

  describe("environment variable checks", () => {
    it("returns 500 when JWT_SECRET is missing", async () => {
      delete process.env.JWT_SECRET;
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    });

    it("returns 500 when JWT_REFRESH_SECRET is missing", async () => {
      delete process.env.JWT_REFRESH_SECRET;
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    });

    it("returns 500 when both JWT secrets are missing", async () => {
      delete process.env.JWT_SECRET;
      delete process.env.JWT_REFRESH_SECRET;
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    });
  });

  describe("successful registration", () => {
    it("returns 201 with accessToken, refreshToken, user, and message", async () => {
      const req = makeRequest({
        email: "new@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        {
          message: "User registered successfully",
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          user: {
            id: defaultCreatedUser.id,
            email: defaultCreatedUser.email,
            name: defaultCreatedUser.name,
          },
        },
        { status: 201 },
      );
    });

    it("signs accessToken with JWT_SECRET and 15m expiry", async () => {
      const req = makeRequest({
        email: "new@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockSign).toHaveBeenCalledWith(
        { userId: defaultCreatedUser.id },
        "test-jwt-secret",
        { expiresIn: "15m" },
      );
    });

    it("signs refreshToken with JWT_REFRESH_SECRET and 7d expiry", async () => {
      const req = makeRequest({
        email: "new@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockSign).toHaveBeenCalledWith(
        { userId: defaultCreatedUser.id },
        "test-jwt-refresh-secret",
        { expiresIn: "7d" },
      );
    });

    it("does not include hashed password in the response", async () => {
      const req = makeRequest({
        email: "new@example.com",
        password: "password123",
      });

      await POST(req);

      const call = mockNextResponseJson.mock.calls[0];
      const responseBody = call?.[0] as Record<string, unknown>;
      const user = responseBody?.user as Record<string, unknown>;
      expect(user).not.toHaveProperty("password");
    });
  });

  describe("error handling", () => {
    it("returns 500 when db.user.findUnique throws an unexpected error", async () => {
      mockFindUnique.mockRejectedValueOnce(new Error("DB connection failed"));
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Internal server error" },
        { status: 500 },
      );
    });

    it("returns 500 when db.user.create throws an unexpected error", async () => {
      mockCreate.mockRejectedValueOnce(new Error("DB write failed"));
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Internal server error" },
        { status: 500 },
      );
    });

    it("returns 500 when bcrypt.hash throws", async () => {
      mockBcryptHash.mockRejectedValueOnce(new Error("bcrypt failed"));
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Internal server error" },
        { status: 500 },
      );
    });

    it("does not call db.user.create when email validation fails", async () => {
      const req = makeRequest({
        email: "not-valid",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).not.toHaveBeenCalled();
    });

    it("does not call db.user.create when user already exists", async () => {
      mockFindUnique.mockResolvedValueOnce({ id: "existing" } as never);
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });
});