import { NextRequest, NextResponse } from "next/server";
import { CONTENT_MOCKS, ContentType, GeneratedContent } from "@/data/content-mocks";
import { BROKER_PRESETS, BrokerPresetId } from "@/data/broker-presets";

interface GenerateContentRequest {
  contentType: ContentType;
  formData: Record<string, unknown>;
  brokerPhotos?: string[];
  systemPrompt?: string;
  brokerPresetId?: BrokerPresetId;
  prompt: string;
}

function stripDataUriPrefix(dataUri: string): string {
  const base64Index = dataUri.indexOf("base64,");
  if (base64Index !== -1) {
    return dataUri.slice(base64Index + 7);
  }
  return dataUri;
}

function getMimeType(dataUri: string): string {
  const match = dataUri.match(/^data:([^;]+);/);
  return match ? match[1] : "image/jpeg";
}

export async function POST(req: NextRequest): Promise<NextResponse<GeneratedContent>> {
  const body: GenerateContentRequest = await req.json();
  const { contentType, brokerPhotos = [], systemPrompt = "", brokerPresetId, prompt } = body;

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(CONTENT_MOCKS[contentType] ?? CONTENT_MOCKS["showcase-imovel"]);
  }

  const preset = brokerPresetId
    ? BROKER_PRESETS.find((p) => p.id === brokerPresetId)
    : null;

  const systemInstruction = [
    preset?.aiPromptGuidelines ?? "",
    systemPrompt,
    "Sempre responda em português do Brasil. Formate o conteúdo com emojis e divisão clara por slides quando aplicável. Ao final, inclua 3 a 5 sugestões estratégicas de publicação no formato JSON com chaves 'content' (string com o conteúdo principal) e 'suggestions' (array de strings). Responda apenas com JSON puro, sem markdown.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const parts: object[] = [];

  for (const photo of brokerPhotos) {
    if (!photo) continue;
    parts.push({
      inlineData: {
        mimeType: getMimeType(photo),
        data: stripDataUriPrefix(photo),
      },
    });
  }

  parts.push({ text: prompt });

  try {
    const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiBody = {
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleanedText) as GeneratedContent;

    return NextResponse.json({
      content: parsed.content ?? "",
      suggestions: parsed.suggestions ?? [],
    });
  } catch {
    return NextResponse.json(CONTENT_MOCKS[contentType] ?? CONTENT_MOCKS["showcase-imovel"]);
  }
}
