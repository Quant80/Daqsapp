import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import { getDb } from "./db";
import { contactSubmissions, documents, mediaItems, chatMessages } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

// ─── Contact Router ────────────────────────────────────────────────────────────
const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        company: z.string().max(255).optional(),
        service: z.string().max(100).optional(),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        await db.insert(contactSubmissions).values({
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          company: input.company ?? null,
          service: input.service ?? null,
          message: input.message,
        });
      }

      // Notify owners
      const serviceText = input.service ? `\nService: ${input.service}` : "";
      const companyText = input.company ? `\nCompany: ${input.company}` : "";
      const phoneText = input.phone ? `\nPhone: ${input.phone}` : "";

      try {
        await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}${phoneText}${companyText}${serviceText}\n\nMessage:\n${input.message}`,
        });
      } catch (error) {
        console.error("[Contact] notifyOwner failed:", error);
      }

      return { success: true };
    }),
});

// ─── Documents Router ──────────────────────────────────────────────────────────
const documentsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(documents)
      .where(eq(documents.isPublic, true))
      .orderBy(desc(documents.createdAt));
  }),

  upload: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().max(1000).optional(),
        category: z.enum(["whitepaper", "case_study", "research", "robotics", "training", "report", "other"]),
        fileName: z.string().max(255),
        fileData: z.string(), // base64
        mimeType: z.string().max(100),
        fileSize: z.number().int().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      // Decode base64 and upload to S3
      const buffer = Buffer.from(input.fileData, "base64");
      const fileKey = `documents/${ctx.user.openId}/${nanoid()}-${input.fileName}`;
      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      await db.insert(documents).values({
        title: input.title,
        description: input.description ?? null,
        category: input.category,
        fileUrl: url,
        fileKey,
        fileName: input.fileName,
        fileSize: input.fileSize,
        mimeType: input.mimeType,
        isPublic: true,
        uploadedBy: ctx.user.openId,
      });

      try {
        await notifyOwner({
          title: `New Document Uploaded: ${input.title}`,
          content: `A new document has been uploaded to the DAQS document library.\n\nTitle: ${input.title}\nCategory: ${input.category}\nFile: ${input.fileName}\nUploaded by: ${ctx.user.name || ctx.user.openId}`,
        });
      } catch (error) {
        console.error("[Documents] notifyOwner failed:", error);
      }

      return { success: true };
    }),
});

// ─── Media Router ──────────────────────────────────────────────────────────────
const mediaRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(mediaItems)
      .where(eq(mediaItems.isPublished, true))
      .orderBy(desc(mediaItems.createdAt));
  }),

  add: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().max(1000).optional(),
        platform: z.enum(["youtube", "facebook", "tiktok", "vimeo", "other"]),
        embedUrl: z.string().url().max(2000),
        thumbnailUrl: z.string().url().max(2000).optional(),
        category: z.enum(["podcast", "tutorial", "webinar", "talk", "other"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      await db.insert(mediaItems).values({
        title: input.title,
        description: input.description ?? null,
        platform: input.platform,
        embedUrl: input.embedUrl,
        thumbnailUrl: input.thumbnailUrl ?? null,
        category: input.category,
        isPublished: true,
      });

      return { success: true };
    }),
});

// ─── Chatbot Router ────────────────────────────────────────────────────────────
const DAQS_SYSTEM_PROMPT = `You are the DAQS (Data Analytics and Quantitative Solutions) AI assistant. You help website visitors learn about DAQS's services, team, training programs, and how to get in touch.

DAQS offers:
- Data Analysis & Business Intelligence
- Machine Learning & AI (supervised, unsupervised, deep learning, NLP, computer vision)
- Quantitative Solutions (derivatives pricing, risk management, portfolio optimisation, algorithmic trading)
- Accounting Services (bookkeeping, auditing, tax planning, financial reporting)
- Pension Fund Management & Investment Advisory
- Robotics & Automation
  - Industrial robotics integration and robotic cell design
  - Control systems, PLC & SCADA architecture
  - Robot vision and machine perception for inspection and guidance
  - Custom robotic prototyping with ROS, microcontrollers and embedded controllers
  - Robotic Process Automation (RPA) and software workflow automation
- Training Programs
  - Classroom and hands-on courses in data science, ML/AI, quantitative finance, accounting, and robotics & automation
  - Executive workshops for AI and automation strategy
  - Short courses on PLCs, ROS, vision systems, and RPA platforms

Our Team:
- Trymore Ncube (CEO & Director): BSc Mathematics, MSc Financial Engineering, MSc Machine Learning & AI, PhD Data Science (candidate), Microsoft Certified Data Scientist Associate. Contact: +27 60 343 1561, Ncube.T@daqstech.com
- Albert Ncube (CEO & Director): BSc Accounting, MSc Accounting. Specialises in accounting, pensions, and investment advisory. Contact: +263 77 327 8724, A.ncube@daqs.co.za

Website: www.daqs.com

For pricing, always say "Contact us for a customised quote" and direct them to the contact form or phone numbers.
Be professional, concise, and helpful. If asked about something outside DAQS's scope, politely redirect to our services.`;

const chatbotRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        sessionId: z.string().max(64),
        message: z.string().min(1).max(2000),
        history: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ).max(20),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Save user message
      if (db) {
        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "user" as const,
          content: input.message,
        });
      }

      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: DAQS_SYSTEM_PROMPT },
        ...input.history.map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
        { role: "user", content: input.message },
      ];

      const response = await invokeLLM({ messages });
      const rawContent = response.choices[0]?.message?.content;
      const reply = (typeof rawContent === "string" ? rawContent : null) || "I'm sorry, I couldn't process your request. Please contact us directly at Ncube.T@daqstech.com.";

      // Save assistant response
      if (db) {
        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "assistant" as const,
          content: reply,
        });
      }

      return { reply };
    }),
});

// ─── Live AI Demo Router ───────────────────────────────────────────────────────
const DEMO_SYSTEM_PROMPT = `You are a business text analysis engine used in a live product demo for DAQS, a data analytics and AI consulting firm. Given a piece of text (customer feedback, an email, a review, a report excerpt), analyze it and return your findings strictly in the provided JSON schema. Be concise and realistic - do not exaggerate risk or sentiment.`;

const demoOutputSchema = {
  name: "text_analysis",
  schema: {
    type: "object",
    properties: {
      sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
      sentimentScore: { type: "number", description: "0-100 intensity of the detected sentiment" },
      themes: { type: "array", items: { type: "string" }, description: "2-4 short key themes, each 1-4 words" },
      riskFlag: { type: "boolean", description: "true if this text suggests a business risk worth a human's attention (e.g. churn, compliance, dissatisfaction)" },
      riskReason: { type: ["string", "null"], description: "one short sentence explaining the risk, or null if riskFlag is false" },
      summary: { type: "string", description: "one sentence plain-English summary of the text" },
    },
    required: ["sentiment", "sentimentScore", "themes", "riskFlag", "riskReason", "summary"],
    additionalProperties: false,
  },
  strict: true,
};

const demoRouter = router({
  analyze: publicProcedure
    .input(z.object({ text: z.string().min(10).max(1000) }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          { role: "system", content: DEMO_SYSTEM_PROMPT },
          { role: "user", content: input.text },
        ],
        responseFormat: { type: "json_schema", json_schema: demoOutputSchema },
      });

      const rawContent = response.choices[0]?.message?.content;
      const text = typeof rawContent === "string" ? rawContent : null;
      if (!text) throw new Error("The AI didn't return a result. Please try again.");

      const parsed = JSON.parse(text);
      return parsed as {
        sentiment: "positive" | "neutral" | "negative";
        sentimentScore: number;
        themes: string[];
        riskFlag: boolean;
        riskReason: string | null;
        summary: string;
      };
    }),

  ask: publicProcedure
    .input(z.object({ question: z.string().min(5).max(500) }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are DAQS's AI Analyst, demonstrating live AI capability to a website visitor. Answer the question in 2-4 sharp, concrete sentences - the kind of insight a data science/AI/quant finance/accounting consultant would give. No filler, no "as an AI" disclaimers. If the question is unrelated to business, data, AI, or finance, briefly redirect to what DAQS does.`,
          },
          { role: "user", content: input.question },
        ],
      });

      const rawContent = response.choices[0]?.message?.content;
      const answer = typeof rawContent === "string" ? rawContent : null;
      if (!answer) throw new Error("The AI didn't return a result. Please try again.");

      return { answer };
    }),
});

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  contact: contactRouter,
  documents: documentsRouter,
  media: mediaRouter,
  chatbot: chatbotRouter,
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
