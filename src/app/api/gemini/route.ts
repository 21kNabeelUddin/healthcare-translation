import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, targetLang, mode } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;
  const prompt =
    mode === "enhance"
      ? `Correct any medical terms in this transcript to their proper medical terminology. Return only the corrected transcript: "${text}"`
      : `Translate the following text to ${targetLang}: "${text}". Respond with only the translated sentence, no explanation, no formatting.`;

  try {
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.error || "Gemini API error" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
