import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock dependencies before importing the route
vi.mock("@/server/auth/validateUser", () => ({
  validateUser: vi.fn(),
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
import { validateUser } from "@/server/auth/validateUser";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const mockValidateUser = vi.mocked(validateUser);
const mockSign = vi.mocked(sign);
const mockNextResponseJson = vi.mocked(NextResponse.json);

function makeRequest(body: unknown): Request {
  return {
    json: async () => body,
  } as unknown as Request;
}

describe("POST /api/auth/mobile-login", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      JWT_SECRET: "test-jwt-secret",
      JWT_REFRESH_SECRET: "test-jwt-refresh-secret",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("input validation", () => {
    it("returns 400 when email is missing", async () => {
      const req = makeRequest({ password: "password123" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Missing credentials" },
        { status: 400 },
      );
    });

    it("returns 400 when password is missing", async () => {
      const req = makeRequest({ email: "user@example.com" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Missing credentials" },
        { status: 400 },
      );
    });

    it("returns 400 when both email and password are missing", async () => {
      const req = makeRequest({});

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Missing credentials" },
        { status: 400 },
      );
    });

    it("returns 400 when email is empty string", async () => {
      const req = makeRequest({ email: "", password: "password123" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Missing credentials" },
        { status: 400 },
      );
    });

    it("returns 400 when password is empty string", async () => {
      const req = makeRequest({ email: "user@example.com", password: "" });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Missing credentials" },
        { status: 400 },
      );
    });
  });

  describe("authentication", () => {
    it("returns 401 when validateUser returns null", async () => {
      mockValidateUser.mockResolvedValueOnce(null as never);
      const req = makeRequest({
        email: "user@example.com",
        password: "wrongpassword",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    });

    it("calls validateUser with the provided email and password", async () => {
      mockValidateUser.mockResolvedValueOnce(null as never);
      const req = makeRequest({
        email: "user@example.com",
        password: "mypassword",
      });

      await POST(req);

      expect(mockValidateUser).toHaveBeenCalledWith(
        "user@example.com",
        "mypassword",
      );
    });
  });

  describe("environment variable checks", () => {
    it("returns 500 when JWT_SECRET is missing", async () => {
      delete process.env.JWT_SECRET;
      mockValidateUser.mockResolvedValueOnce({
        id: "user-1",
        email: "user@example.com",
        name: "Test User",
        password: "hashed",
      } as never);
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
      mockValidateUser.mockResolvedValueOnce({
        id: "user-1",
        email: "user@example.com",
        name: "Test User",
        password: "hashed",
      } as never);
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
      mockValidateUser.mockResolvedValueOnce({
        id: "user-1",
        email: "user@example.com",
        name: "Test User",
        password: "hashed",
      } as never);
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

  describe("successful login", () => {
    const mockUser = {
      id: "user-123",
      email: "user@example.com",
      name: "Test User",
      password: "hashed-password",
    };

    beforeEach(() => {
      mockValidateUser.mockResolvedValue(mockUser as never);
      mockSign
        .mockReturnValueOnce("mock-access-token" as never)
        .mockReturnValueOnce("mock-refresh-token" as never);
    });

    it("returns 200 with accessToken, refreshToken, and user data", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
        },
      });
    });

    it("signs accessToken with JWT_SECRET and 15m expiry", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockSign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        "test-jwt-secret",
        { expiresIn: "15m" },
      );
    });

    it("signs refreshToken with JWT_REFRESH_SECRET and 7d expiry", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      expect(mockSign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        "test-jwt-refresh-secret",
        { expiresIn: "7d" },
      );
    });

    it("does not include password in the user response", async () => {
      const req = makeRequest({
        email: "user@example.com",
        password: "password123",
      });

      await POST(req);

      const call = mockNextResponseJson.mock.calls[0];
      const responseBody = call?.[0] as Record<string, unknown>;
      const user = responseBody?.user as Record<string, unknown>;
      expect(user).not.toHaveProperty("password");
    });

    it("does not call sign when input validation fails", async () => {
      const req = makeRequest({ email: "user@example.com" });

      await POST(req);

      expect(mockSign).not.toHaveBeenCalled();
    });
  });

  describe("response uses NextResponse.json", () => {
    it("uses NextResponse.json for missing credentials error (not plain Response)", async () => {
      const req = makeRequest({});

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledTimes(1);
    });

    it("uses NextResponse.json for invalid credentials error", async () => {
      mockValidateUser.mockResolvedValueOnce(null as never);
      const req = makeRequest({
        email: "user@example.com",
        password: "bad-pass",
      });

      await POST(req);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    });
  });
});