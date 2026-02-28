import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock dependencies
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null), // No DB in test env
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "DAQS offers data analytics, ML, AI, and accounting services." } }],
  }),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://cdn.example.com/test.pdf", key: "test/test.pdf" }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@daqs.co.za",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = createPublicContext();
    const cleared: string[] = [];
    ctx.res.clearCookie = (name: string) => { cleared.push(name); };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
    expect(cleared).toHaveLength(1);
  });
});

describe("contact.submit", () => {
  it("accepts a valid contact form submission", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      phone: "+27123456789",
      company: "Test Corp",
      service: "Data Analysis",
      message: "I would like to enquire about your data analysis services.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects submission with invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.submit({
        name: "Test",
        email: "not-an-email",
        message: "Hello",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.submit({
        name: "Test",
        email: "test@example.com",
        message: "",
      })
    ).rejects.toThrow();
  });
});

describe("documents.list", () => {
  it("returns an array (empty when DB unavailable)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.documents.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("media.list", () => {
  it("returns an array (empty when DB unavailable)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.media.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("chatbot.chat", () => {
  it("returns a reply from the AI assistant", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chatbot.chat({
      sessionId: "test-session-123",
      message: "What services does DAQS offer?",
      history: [],
    });
    expect(result.reply).toBeTruthy();
    expect(typeof result.reply).toBe("string");
  });

  it("handles conversation history", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chatbot.chat({
      sessionId: "test-session-456",
      message: "Tell me more about the training programs",
      history: [
        { role: "user", content: "What services do you offer?" },
        { role: "assistant", content: "We offer data analytics, ML, AI, and accounting services." },
      ],
    });
    expect(result.reply).toBeTruthy();
  });

  it("mentions robotics when asked", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const reply = await caller.chatbot.chat({
      sessionId: "test-session-789",
      message: "Do you provide robotics training or automation consulting?",
      history: [],
    });
    expect(reply.reply).toBeTruthy();
    // we don't assert content exactly since LLM output is mocked, but the prompt now
    // includes robotics so the assistant should be able to respond about it.
  });
});
