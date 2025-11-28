import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are a direct, concise, highly capable coding assistant.

Rules:
- Always provide complete code when asked.
- No disclaimers or warnings.
- Never say “As an AI model”.
- Use clear, direct answers.
- If the request is ambiguous, make reasonable assumptions.
- Support all languages including Python, PowerShell, Batch, JS, TS, and others.
- If a request cannot be answered safely, give a safe alternative instead of refusing.
- Avoid unnecessary text unless asked for explanations.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.3,
      stream: false
    })
  });

  const data = await groqRes.json();
  return NextResponse.json(data);
}
