import { z } from "zod";
import { buildPhysicsSystemPrompt } from "@/services/ai.service";
import type { NextRequest } from "next/server";

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(20)
    .optional()
    .default([]),
});

// Demo response — used when ANTHROPIC_API_KEY is not set
function getDemoResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("newton") || (lower.includes("force") && lower.includes("law"))) {
    return `Newton's Three Laws of Motion form the foundation of classical mechanics.

**First Law (Law of Inertia):** A body continues in its state of rest or uniform motion unless acted upon by a net external force.

**Second Law:** $\\vec{F}_{net} = m\\vec{a}$ — the net force on a body equals its mass times acceleration.

**Third Law:** For every action there is an equal and opposite reaction: $\\vec{F}_{12} = -\\vec{F}_{21}$

**JEE Key Insight:** Third-law pairs *always* act on *different* bodies — they never cancel each other.`;
  }

  if (lower.includes("energy") || lower.includes("work")) {
    return `The Work-Energy Theorem is one of the most powerful tools in mechanics.

$$W_{net} = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$$

**Strategy for problem-solving:**
1. Identify all forces and compute work done by each: $W = Fd\\cos\\theta$
2. Sum all works to get $W_{net}$
3. Equate to $\\Delta KE$

**Conservation of Mechanical Energy** applies when only conservative forces act:
$$KE_i + PE_i = KE_f + PE_f$$

**JEE Tip:** When friction is present, use $W_{net} = \\Delta KE$ (the theorem still holds — friction's work is negative).`;
  }

  if (lower.includes("electric") || lower.includes("charge") || lower.includes("coulomb")) {
    return `Electrostatics revolves around Coulomb's Law:

$$F = k\\frac{q_1 q_2}{r^2}, \\quad k = 9 \\times 10^9 \\text{ N·m}^2/\\text{C}^2$$

**Electric Field** at distance $r$ from a point charge:
$$E = \\frac{kq}{r^2}$$

**Electric Potential** (scalar — much easier to sum):
$$V = \\frac{kq}{r}$$

**Superposition Principle:** Add fields/potentials from each charge independently.

**JEE Trick:** For potential, add algebraically (scalar sum). For field, add as vectors. Whenever possible, work with potential first.`;
  }

  if (lower.includes("wave") || lower.includes("frequency") || lower.includes("oscillat")) {
    return `Waves carry energy without transporting matter.

**Wave equation:** $v = f\\lambda$

**Simple Harmonic Motion** underpins all wave theory:
$$x = A\\sin(\\omega t + \\phi), \\quad a = -\\omega^2 x$$

The restoring acceleration proportional to displacement is the defining feature of SHM.

**Angular frequency:**
- Spring-mass: $\\omega = \\sqrt{k/m}$
- Simple pendulum: $\\omega = \\sqrt{g/L}$
- LC circuit: $\\omega = 1/\\sqrt{LC}$

**JEE Pattern:** Many problems disguise SHM — look for a restoring force that is linear in displacement.`;
  }

  if (lower.includes("gravit") || lower.includes("orbit") || lower.includes("satellite")) {
    return `Gravitation: Newton's Universal Law and its consequences.

$$F = \\frac{Gm_1 m_2}{r^2}, \\quad G = 6.674 \\times 10^{-11}\\text{ N·m}^2/\\text{kg}^2$$

**Orbital Speed** (circular orbit at radius $r$):
$$v_o = \\sqrt{\\frac{GM}{r}}$$

**Escape Velocity** from surface:
$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s for Earth}$$

**Kepler's Third Law:** $T^2 \\propto r^3$

**JEE Insight:** $v_e = \\sqrt{2}\\, v_o$ always. If you know orbital speed, escape speed is just $\\sqrt{2}$ times it.`;
  }

  // Default thoughtful response
  return `Great question! Here's how to approach this Physics problem systematically.

**Step 1 — Identify the principle:**
Determine which law or concept applies: Newton's laws, energy conservation, Gauss's law, etc.

**Step 2 — Draw and label:**
A free body diagram (mechanics) or field diagram (EM) clarifies the problem immediately.

**Step 3 — Write equations:**
$$F_{net} = ma, \\quad W_{net} = \\Delta KE, \\quad \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{Q_{enc}}{\\varepsilon_0}$$

Choose the equation that connects your known quantities to the unknown.

**Step 4 — Solve and sanity-check:**
Check units and limiting cases (e.g., does the answer go to zero when it should?).

**JEE/NEET Tip:** Most questions test one concept deeply — don't over-complicate. Identify the single governing principle first.

*(Demo mode — add your Anthropic API key to enable full AI tutoring with real-time streaming.)*`;
}

async function* parseAnthropicStream(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let currentEvent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("event: ")) {
        currentEvent = line.slice(7).trim();
      } else if (line.startsWith("data: ") && currentEvent === "content_block_delta") {
        try {
          const data = JSON.parse(line.slice(6)) as {
            delta?: { type?: string; text?: string };
          };
          if (data.delta?.type === "text_delta" && data.delta.text) {
            yield data.delta.text;
          }
        } catch {
          // skip malformed event
        }
      }
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const { message, history } = parsed.data;
  const encoder = new TextEncoder();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const hasRealKey = !!apiKey && apiKey !== "placeholder";

  // ── Demo mode (no real API key) ──────────────────────────────
  if (!hasRealKey) {
    const demo = getDemoResponse(message);
    // Stream word-by-word for a realistic feel
    const words = demo.split(/(?<=\s)/);
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (const word of words) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: word })}\n\n`)
          );
          // slight delay between words
          await new Promise<void>((r) => setTimeout(r, 18));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  // ── Live Anthropic streaming ─────────────────────────────────
  const systemPrompt = buildPhysicsSystemPrompt();
  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  });

  if (!anthropicRes.ok || !anthropicRes.body) {
    return Response.json({ success: false, error: "AI service unavailable" }, { status: 503 });
  }

  const anthropicBody = anthropicRes.body;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of parseAnthropicStream(anthropicBody)) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
