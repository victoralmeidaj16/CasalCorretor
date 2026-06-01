import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy-key" });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    valorInicial,
    aporteMensal,
    aporteSemestral,
    aporteExtra,
    periodo,
    tipoImovel,
    cidade,
    perfil,
  } = body;

  const prompt = `Você é um consultor de patrimônio imobiliário premium. Analise este investimento e forneça um insight narrativo sofisticado em português.

Dados do investimento:
- Valor inicial: R$ ${valorInicial.toLocaleString("pt-BR")}
- Aporte mensal: R$ ${aporteMensal.toLocaleString("pt-BR")}
- Aporte semestral: R$ ${(aporteSemestral ?? 0).toLocaleString("pt-BR")}
- Aporte extra anual: R$ ${aporteExtra.toLocaleString("pt-BR")}
- Período: ${periodo} anos
- Tipo de imóvel: ${tipoImovel}
- Cidade/Região: ${cidade}
- Perfil: ${perfil}

Forneça:
1. Uma análise em 2 frases sobre o potencial desse investimento específico (tom: consultor patrimonial premium, não vendedor)
2. Um ponto de atenção estratégico para esse perfil e região
3. Uma frase final de impacto sobre o que esse patrimônio representa em termos de legado

Responda em JSON com as chaves: "analise", "atencao", "impacto". Sem markdown, apenas JSON puro.`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 400,
    });

    const content = response.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({
      analise: "Este portfólio apresenta fundamentos sólidos para acumulação patrimonial de longo prazo.",
      atencao: "Regiões com infraestrutura consolidada tendem a manter valorização consistente independente de ciclos.",
      impacto: "Patrimônio construído com consistência não é apenas riqueza — é liberdade de escolha.",
    });
  }
}
