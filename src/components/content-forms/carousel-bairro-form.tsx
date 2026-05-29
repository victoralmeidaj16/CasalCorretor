"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
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
  "Navegantes",
  "Outra",
];

export function CarouselBairroForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidadeCustom, setCidadeCustom] = useState("");
  const [focoEspecial, setFocoEspecial] = useState("");

  const cidadeFinal = cidade === "Outra" ? cidadeCustom : cidade;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `Crie um carousel de 6 slides para Instagram com o tema "Por que morar em ${bairro}, ${cidadeFinal}?".
${focoEspecial ? `Foco especial: ${focoEspecial}` : ""}
${hasBrokerPhotos ? "O corretor aparecerá como guia do conteúdo. Sugira como ele deve ser posicionado em cada slide (ex: 'corretor caminhando no bairro', 'corretor apontando para prédios')." : ""}

Estrutura obrigatória dos slides:
SLIDE 1: Título impactante + subtítulo instigante sobre o bairro
SLIDE 2: Amenidades e serviços — o que tem por perto
SLIDE 3: Segurança e qualidade de vida — dados e percepção
SLIDE 4: Mobilidade — transporte, vias, distâncias
SLIDE 5: Valorização — crescimento histórico e potencial futuro
SLIDE 6: Lifestyle — quem mora lá e por quê escolheu

Cada slide deve ter emoji no início, título em destaque e 3-5 bullet points concisos.

Retorne JSON com 'content' (script dos 6 slides) e 'suggestions' (4-5 dicas de publicação e engajamento).`;

    onGenerate({ bairro, cidade: cidadeFinal, focoEspecial }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Bairro
          </label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Jurerê Internacional, Barra Sul..."
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Cidade
          </label>
          <select
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
            required
          >
            <option value="">Selecionar...</option>
            {CIDADES.map((c) => (
              <option key={c} value={c} className="bg-[#111]">{c}</option>
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
            required
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Foco Especial (opcional)
        </label>
        <input
          type="text"
          value={focoEspecial}
          onChange={(e) => setFocoEspecial(e.target.value)}
          placeholder="Ex: Novo metrô chegando, valorização recente, perfil familiar..."
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !bairro || !cidadeFinal}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isLoading || !bairro || !cidadeFinal
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-accent text-[#050505] hover:bg-accent/90"
        )}
      >
        <Wand2 size={15} strokeWidth={1.5} />
        {isLoading ? "Gerando..." : "Gerar Carousel do Bairro"}
      </button>
    </form>
  );
}
