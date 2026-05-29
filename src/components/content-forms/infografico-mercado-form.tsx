"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

const CIDADES = [
  { value: "balneario", label: "Balneário Camboriú" },
  { value: "florianopolis", label: "Florianópolis" },
  { value: "porto_belo", label: "Porto Belo" },
  { value: "itapema", label: "Itapema" },
];

const INDICADORES = [
  { value: "valorizacao", label: "Valorização Imobiliária" },
  { value: "selic", label: "Taxa Selic" },
  { value: "incc", label: "INCC (Custo da Construção)" },
  { value: "comparativo", label: "Comparativo: Imóvel vs CDI vs Poupança" },
];

const MARKET_DATA: Record<string, Record<string, { year: string; value: number }[]>> = {
  balneario: {
    valorizacao: [
      { year: "2020", value: 8.2 },
      { year: "2021", value: 14.5 },
      { year: "2022", value: 12.1 },
      { year: "2023", value: 11.3 },
      { year: "2024", value: 10.8 },
    ],
    selic: [
      { year: "2020", value: 2.0 },
      { year: "2021", value: 9.25 },
      { year: "2022", value: 13.75 },
      { year: "2023", value: 11.75 },
      { year: "2024", value: 10.5 },
    ],
    incc: [
      { year: "2020", value: 6.5 },
      { year: "2021", value: 18.1 },
      { year: "2022", value: 7.8 },
      { year: "2023", value: 6.2 },
      { year: "2024", value: 5.4 },
    ],
    comparativo: [
      { year: "Imóvel BC", value: 11.3 },
      { year: "CDI", value: 10.5 },
      { year: "Poupança", value: 6.2 },
      { year: "INCC", value: 5.4 },
    ],
  },
  florianopolis: {
    valorizacao: [
      { year: "2020", value: 7.1 },
      { year: "2021", value: 11.8 },
      { year: "2022", value: 9.5 },
      { year: "2023", value: 9.2 },
      { year: "2024", value: 8.7 },
    ],
    selic: [
      { year: "2020", value: 2.0 },
      { year: "2021", value: 9.25 },
      { year: "2022", value: 13.75 },
      { year: "2023", value: 11.75 },
      { year: "2024", value: 10.5 },
    ],
    incc: [
      { year: "2020", value: 6.5 },
      { year: "2021", value: 18.1 },
      { year: "2022", value: 7.8 },
      { year: "2023", value: 6.2 },
      { year: "2024", value: 5.4 },
    ],
    comparativo: [
      { year: "Imóvel Floripa", value: 8.7 },
      { year: "CDI", value: 10.5 },
      { year: "Poupança", value: 6.2 },
      { year: "INCC", value: 5.4 },
    ],
  },
  porto_belo: {
    valorizacao: [
      { year: "2020", value: 6.8 },
      { year: "2021", value: 12.3 },
      { year: "2022", value: 10.2 },
      { year: "2023", value: 9.8 },
      { year: "2024", value: 9.1 },
    ],
    selic: [
      { year: "2020", value: 2.0 },
      { year: "2021", value: 9.25 },
      { year: "2022", value: 13.75 },
      { year: "2023", value: 11.75 },
      { year: "2024", value: 10.5 },
    ],
    incc: [
      { year: "2020", value: 6.5 },
      { year: "2021", value: 18.1 },
      { year: "2022", value: 7.8 },
      { year: "2023", value: 6.2 },
      { year: "2024", value: 5.4 },
    ],
    comparativo: [
      { year: "Porto Belo", value: 9.1 },
      { year: "CDI", value: 10.5 },
      { year: "Poupança", value: 6.2 },
      { year: "INCC", value: 5.4 },
    ],
  },
  itapema: {
    valorizacao: [
      { year: "2020", value: 7.5 },
      { year: "2021", value: 13.1 },
      { year: "2022", value: 11.4 },
      { year: "2023", value: 10.6 },
      { year: "2024", value: 9.9 },
    ],
    selic: [
      { year: "2020", value: 2.0 },
      { year: "2021", value: 9.25 },
      { year: "2022", value: 13.75 },
      { year: "2023", value: 11.75 },
      { year: "2024", value: 10.5 },
    ],
    incc: [
      { year: "2020", value: 6.5 },
      { year: "2021", value: 18.1 },
      { year: "2022", value: 7.8 },
      { year: "2023", value: 6.2 },
      { year: "2024", value: 5.4 },
    ],
    comparativo: [
      { year: "Itapema", value: 9.9 },
      { year: "CDI", value: 10.5 },
      { year: "Poupança", value: 6.2 },
      { year: "INCC", value: 5.4 },
    ],
  },
};

export function InfograficoMercadoForm({ onGenerate, isLoading }: Props) {
  const [cidade, setCidade] = useState("balneario");
  const [indicador, setIndicador] = useState("valorizacao");

  const chartData = MARKET_DATA[cidade]?.[indicador] ?? [];
  const cidadeLabel = CIDADES.find((c) => c.value === cidade)?.label ?? cidade;
  const indicadorLabel = INDICADORES.find((i) => i.value === indicador)?.label ?? indicador;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataStr = chartData.map((d) => `${d.year}: ${d.value}%`).join(", ");

    const prompt = `Crie um post de infográfico de mercado imobiliário para Instagram com os seguintes dados:

Cidade/Região: ${cidadeLabel}
Indicador: ${indicadorLabel}
Dados históricos: ${dataStr}
Período: 2020-2024

O post deve:
1. Contextualizar o que esse indicador significa para o comprador
2. Explicar em linguagem simples o que os números revelam
3. Trazer uma conclusão estratégica: é hora de comprar? aguardar?
4. Ter CTA para consulta personalizada

Formato: texto para legenda do Instagram com emojis, análise clara e acessível, não técnica demais.

Retorne JSON com 'content' (legenda completa do post) e 'suggestions' (4 dicas de publicação).`;

    onGenerate({ cidade, indicador, chartData }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Cidade
          </label>
          <select
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
          >
            {CIDADES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#111]">{c.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Indicador
          </label>
          <select
            value={indicador}
            onChange={(e) => setIndicador(e.target.value)}
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
          >
            {INDICADORES.map((i) => (
              <option key={i.value} value={i.value} className="bg-[#111]">{i.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mini chart preview */}
      <div className="bg-white/2 border border-accent/10 rounded-lg p-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-medium mb-3">
          Prévia dos Dados — {indicadorLabel} · {cidadeLabel}
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#B7B0A6" }} />
            <YAxis tick={{ fontSize: 10, fill: "#B7B0A6" }} />
            <Tooltip
              contentStyle={{ background: "#111", border: "1px solid rgba(201,151,77,0.2)", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#F4F1EC" }}
              formatter={(v) => [`${v}%`, indicadorLabel]}
            />
            <Bar dataKey="value" radius={[3, 3, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={i === chartData.length - 1 ? "#C9974D" : "rgba(201,151,77,0.35)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isLoading
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-accent text-[#050505] hover:bg-accent/90"
        )}
      >
        <Wand2 size={15} strokeWidth={1.5} />
        {isLoading ? "Gerando..." : "Gerar Análise de Mercado"}
      </button>
    </form>
  );
}
