"use client";

import { useState } from "react";
import { Wand2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

const CIDADES = [
  "Balneário Camboriú",
  "Florianópolis",
  "Porto Belo",
  "Itapema",
  "Camboriú",
  "Blumenau",
  "Joinville",
  "São Paulo",
  "Rio de Janeiro",
  "Outra",
];

const TIPOS_IMOVEL = [
  "Apartamento",
  "Cobertura",
  "Casa de Alto Padrão",
  "Penthouse",
  "Flat",
  "Studio",
  "Casa em Condomínio",
  "Terreno",
];

const OBJETIVOS = [
  "Venda — gerar leads de compradores",
  "Locação — alugar o imóvel",
  "Autoridade — posicionamento de especialista",
  "Engajamento — interação e alcance orgânico",
  "Captação — atrair proprietários",
];

// Static hashtag bank organized by category
const HASHTAG_BANK: Record<string, string[]> = {
  "Balneário Camboriú": [
    "#BalneárioCamboriú", "#BC", "#BCImóveis", "#ImóveisBC",
    "#ApartamentosBC", "#LuxoBC", "#BCLuxury", "#BalneárioCamboriúSC",
    "#VidaBeiraMar", "#AltoPadrãoBC",
  ],
  "Florianópolis": [
    "#Florianópolis", "#Floripa", "#ImóveisFloripa", "#FlorianópolisSC",
    "#ImóveisFlorianópolis", "#JurereInternacional", "#FlorianópolisLuxo",
    "#ImóvelFloripa",
  ],
  "Porto Belo": [
    "#PortoBelo", "#PortoBeloSC", "#ImóveisPortoBelo", "#PortoBeloLitoral",
    "#LitoralCatarinense", "#SCLitoral",
  ],
  "Itapema": [
    "#Itapema", "#ItapemaSC", "#ImóveisItapema", "#MeiaPraiaItapema",
    "#ItapemaLuxo",
  ],
  "geral": [
    "#ImóvelDeLuxo", "#AltoPatrimônio", "#CorretorDeImóveis",
    "#MercadoImobiliário", "#InvestimentoImobiliário", "#ImóveisLuxo",
    "#RealEstateBrasil", "#VendaDeImóveis", "#CompraDeImóveis",
    "#ImóveisAltoPatrimônio", "#CorretoraDeImóveis", "#ImóveisSC",
    "#PatrimônioImobiliário", "#SonhoRealizado",
  ],
  "engajamento": [
    "#ImóvelDoMês", "#LançamentoImobiliário", "#ImóvelExclusivo",
    "#OportunidadeÚnica", "#VistaParaOMar", "#ImóvelNaPlanta",
    "#EntregaImediata", "#ImóvelPremium",
  ],
};

export function HashtagsForm({ onGenerate, isLoading }: Props) {
  const [cidade, setCidade] = useState("Balneário Camboriú");
  const [cidadeCustom, setCidadeCustom] = useState("");
  const [tipoImovel, setTipoImovel] = useState("Apartamento");
  const [objetivo, setObjetivo] = useState(OBJETIVOS[0]);
  const [copiedStatic, setCopiedStatic] = useState(false);

  const cidadeFinal = cidade === "Outra" ? cidadeCustom : cidade;

  // Generate static preview from bank
  const staticHashtags = [
    ...(HASHTAG_BANK[cidadeFinal] ?? HASHTAG_BANK["Balneário Camboriú"]),
    ...HASHTAG_BANK.geral.slice(0, 6),
    ...HASHTAG_BANK.engajamento.slice(0, 4),
  ].slice(0, 25);

  const handleCopyStatic = () => {
    navigator.clipboard.writeText(staticHashtags.join(" ")).then(() => {
      setCopiedStatic(true);
      setTimeout(() => setCopiedStatic(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `Gere um conjunto otimizado de 30 hashtags para Instagram para um post de imóveis com as seguintes características:

Cidade/Região: ${cidadeFinal}
Tipo de imóvel: ${tipoImovel}
Objetivo do post: ${objetivo}

Os hashtags devem ser:
1. Mix estratégico: 30% muito populares (+1M posts), 50% médios (100K-1M), 20% de nicho (<100K)
2. Em português do Brasil
3. Organizados em 3 grupos: Localização, Mercado Imobiliário, Engajamento
4. Incluir variações com e sem acento
5. Relevantes e específicos — não genéricos demais

Formato: liste os 30 hashtags separados por espaço, sem numeração.

Retorne JSON com 'content' (os 30 hashtags em um único parágrafo, prontos para copiar) e 'suggestions' (4 estratégias de uso de hashtags no Instagram para corretores de imóveis).`;

    onGenerate({ cidade: cidadeFinal, tipoImovel, objetivo }, prompt);
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
              <option key={c} value={c} className="bg-[#111]">{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Tipo de Imóvel
          </label>
          <select
            value={tipoImovel}
            onChange={(e) => setTipoImovel(e.target.value)}
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
          >
            {TIPOS_IMOVEL.map((t) => (
              <option key={t} value={t} className="bg-[#111]">{t}</option>
            ))}
          </select>
        </div>
      </div>

      {cidade === "Outra" && (
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Nome da Cidade
          </label>
          <input
            type="text"
            value={cidadeCustom}
            onChange={(e) => setCidadeCustom(e.target.value)}
            placeholder="Digite o nome da cidade"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Objetivo do Post
        </label>
        <div className="space-y-2">
          {OBJETIVOS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setObjetivo(o)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all duration-200",
                objetivo === o
                  ? "border-accent/60 bg-accent/8 text-text-primary"
                  : "border-accent/15 bg-white/2 text-muted hover:border-accent/30 hover:text-text-primary"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Static hashtag preview */}
      <div className="bg-white/2 border border-accent/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-medium">
            Banco Estático — Copiar Agora
          </p>
          <button
            type="button"
            onClick={handleCopyStatic}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/8 text-accent text-xs hover:bg-accent/15 transition-colors border border-accent/20"
          >
            {copiedStatic ? <Check size={10} strokeWidth={2} /> : <Copy size={10} strokeWidth={1.5} />}
            {copiedStatic ? "Copiado!" : "Copiar"}
          </button>
        </div>
        <p className="text-xs text-muted/60 leading-relaxed">
          {staticHashtags.join(" ")}
        </p>
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
        {isLoading ? "Gerando..." : "Gerar Hashtags com IA"}
      </button>
    </form>
  );
}
