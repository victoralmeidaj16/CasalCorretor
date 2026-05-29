"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

const CIDADES_DATA: Record<string, { bairro: string; valorizacao: number; nivel: "alta" | "moderada" | "potencial" }[]> = {
  balneario: [
    { bairro: "Centro (Av. Brasil)", valorizacao: 12.5, nivel: "alta" },
    { bairro: "Barra Sul", valorizacao: 11.8, nivel: "alta" },
    { bairro: "Pioneiros", valorizacao: 11.2, nivel: "alta" },
    { bairro: "Nações", valorizacao: 8.5, nivel: "moderada" },
    { bairro: "Municípios", valorizacao: 7.9, nivel: "moderada" },
    { bairro: "Tabuleiro", valorizacao: 7.2, nivel: "moderada" },
    { bairro: "Estaleiro", valorizacao: 5.8, nivel: "potencial" },
    { bairro: "Barra Norte", valorizacao: 4.9, nivel: "potencial" },
  ],
  florianopolis: [
    { bairro: "Jurerê Internacional", valorizacao: 13.1, nivel: "alta" },
    { bairro: "Trindade", valorizacao: 10.8, nivel: "alta" },
    { bairro: "Agronômica", valorizacao: 9.5, nivel: "alta" },
    { bairro: "Ingleses", valorizacao: 7.8, nivel: "moderada" },
    { bairro: "Canasvieiras", valorizacao: 7.1, nivel: "moderada" },
    { bairro: "Campeche", valorizacao: 8.3, nivel: "moderada" },
    { bairro: "Ribeirão da Ilha", valorizacao: 5.2, nivel: "potencial" },
    { bairro: "Santo Antônio de Lisboa", valorizacao: 6.1, nivel: "potencial" },
  ],
  porto_belo: [
    { bairro: "Centro", valorizacao: 10.2, nivel: "alta" },
    { bairro: "Perequê", valorizacao: 9.8, nivel: "alta" },
    { bairro: "Porto Belo Beach", valorizacao: 9.1, nivel: "alta" },
    { bairro: "Cabral", valorizacao: 7.5, nivel: "moderada" },
    { bairro: "Campinas", valorizacao: 6.8, nivel: "moderada" },
    { bairro: "Araçatuba", valorizacao: 5.5, nivel: "potencial" },
  ],
  itapema: [
    { bairro: "Centro", valorizacao: 11.5, nivel: "alta" },
    { bairro: "Meia Praia", valorizacao: 10.9, nivel: "alta" },
    { bairro: "Ilhota", valorizacao: 8.2, nivel: "moderada" },
    { bairro: "Sertãozinho", valorizacao: 7.4, nivel: "moderada" },
    { bairro: "Fazenda", valorizacao: 5.9, nivel: "potencial" },
  ],
};

const NIVEL_CONFIG = {
  alta: { label: "Alta Valorização", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  moderada: { label: "Valorização Moderada", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  potencial: { label: "Em Maturação", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
};

const CIDADES = [
  { value: "balneario", label: "Balneário Camboriú" },
  { value: "florianopolis", label: "Florianópolis" },
  { value: "porto_belo", label: "Porto Belo" },
  { value: "itapema", label: "Itapema" },
];

export function MapaBairrosForm({ onGenerate, isLoading }: Props) {
  const [cidade, setCidade] = useState("balneario");

  const bairros = CIDADES_DATA[cidade] ?? [];
  const cidadeLabel = CIDADES.find((c) => c.value === cidade)?.label ?? cidade;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bairrosStr = bairros
      .map((b) => `${b.bairro}: +${b.valorizacao}% a.a. (${b.nivel})`)
      .join("\n");

    const prompt = `Crie um post de mapa de valorização de bairros para Instagram:

Cidade: ${cidadeLabel}
Dados de valorização por bairro:
${bairrosStr}

O post deve:
1. Apresentar os dados como "guia do corretor especialista local"
2. Explicar o que cada nível significa para o comprador
3. Dar uma dica estratégica: verde = comprar agora, amarelo = bom custo-benefício, vermelho = especulação
4. Convidar para análise personalizada no direct

Tom: especialista de mercado local, educativo, confiável.

Retorne JSON com 'content' (post completo para legenda do Instagram + sugestão de legenda para os bairros) e 'suggestions' (4 formas de usar este conteúdo para posicionamento de autoridade local).`;

    onGenerate({ cidade, bairros }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Cidade
        </label>
        <div className="flex gap-2 flex-wrap">
          {CIDADES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCidade(c.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                cidade === c.value
                  ? "bg-accent text-[#050505]"
                  : "bg-white/3 border border-accent/20 text-muted hover:text-text-primary"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood visualization */}
      <div className="bg-white/2 border border-accent/10 rounded-lg p-4 space-y-2">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-medium mb-3">
          Mapa de Valorização — {cidadeLabel}
        </p>
        {(["alta", "moderada", "potencial"] as const).map((nivel) => {
          const bairrosNivel = bairros.filter((b) => b.nivel === nivel);
          if (bairrosNivel.length === 0) return null;
          const cfg = NIVEL_CONFIG[nivel];
          return (
            <div key={nivel} className={cn("rounded-lg border px-3 py-2.5", cfg.color)}>
              <p className="text-[9px] uppercase tracking-wider font-semibold mb-1.5">{cfg.label}</p>
              <div className="space-y-1">
                {bairrosNivel.map((b) => (
                  <div key={b.bairro} className="flex items-center justify-between">
                    <span className="text-xs opacity-90">{b.bairro}</span>
                    <span className="text-xs font-semibold">+{b.valorizacao}% a.a.</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
        {isLoading ? "Gerando..." : "Gerar Post do Mapa"}
      </button>
    </form>
  );
}
