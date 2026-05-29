import { NextRequest, NextResponse } from "next/server";

interface GenerateImageRequest {
  prompt: string;
  brokerPhotos?: string[];
  systemPrompt?: string;
  style?: string;
}

interface GenerateImageResponse {
  imageData?: string;
  mimeType?: string;
  error?: string;
  mock?: boolean;
}

function stripDataUriPrefix(dataUri: string): string {
  const base64Index = dataUri.indexOf("base64,");
  return base64Index !== -1 ? dataUri.slice(base64Index + 7) : dataUri;
}

function getMimeType(dataUri: string): string {
  const match = dataUri.match(/^data:([^;]+);/);
  return match ? match[1] : "image/jpeg";
}

const IMAGE_STYLE_SYSTEM = `Você é um gerador de imagens para posts de Instagram de imóveis de alto padrão.
Crie imagens profissionais, premium e visualmente impactantes.
Estilo: fotografia arquitetônica de luxo, iluminação dramática, composição elegante.
Formato: quadrado (1:1) ou retrato (4:5) adequado para Instagram.
Paleta: tons escuros com detalhes em dourado/âmbar, clean e sofisticado.
Texto na imagem: mínimo, apenas se explicitamente solicitado.`;

export async function POST(req: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  const body: GenerateImageRequest = await req.json();
  const { prompt, brokerPhotos = [], systemPrompt = "" } = body;

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ mock: true, error: "GOOGLE_AI_API_KEY não configurada" });
  }

  const combinedSystem = [IMAGE_STYLE_SYSTEM, systemPrompt].filter(Boolean).join("\n\n");

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

  const model = process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    system_instruction: {
      parts: [{ text: combinedSystem }],
    },
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      temperature: 0.9,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];

    for (const part of parts) {
      if (part.inlineData?.data) {
        return NextResponse.json({
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType ?? "image/png",
        });
      }
    }

    throw new Error("Nenhuma imagem retornada pelo Gemini");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: message, mock: true });
  }
}
