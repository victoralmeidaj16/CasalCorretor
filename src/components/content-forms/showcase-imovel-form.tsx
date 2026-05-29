"use client";

import { useState } from "react";
import { Wand2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

export function ShowcaseImovelForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [form, setForm] = useState({
    nomeImovel: "",
    localizacao: "",
    preco: "",
    quartos: "",
    area: "",
    diferenciais: "",
    incluirFoto: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Crie um carousel premium de 5 slides para Instagram apresentando este imóvel de alto padrão:

Nome: ${form.nomeImovel}
Localização: ${form.localizacao}
Preço: ${form.preco}
Quartos: ${form.quartos}
Área: ${form.area}m²
Diferenciais: ${form.diferenciais}
${form.incluirFoto ? "IMPORTANTE: O corretor aparecerá nas imagens. Inclua sugestões de como ele deve ser posicionado em cada slide (ex: 'corretor na varanda com vista ao fundo', 'corretor na cozinha gourmet')." : ""}

Estrutura obrigatória dos slides:
SLIDE 1: Hook emocional ou de exclusividade
SLIDE 2: O espaço — ambientes principais
SLIDE 3: Os detalhes — acabamentos e diferenciais
SLIDE 4: O investimento — preço, localização, potencial
SLIDE 5: CTA — como agendar visita

Retorne JSON com 'content' (script dos 5 slides com emojis) e 'suggestions' (5 dicas de publicação).`;

    onGenerate(form, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Nome do Imóvel
          </label>
          <input
            type="text"
            value={form.nomeImovel}
            onChange={(e) => setForm({ ...form, nomeImovel: e.target.value })}
            placeholder="Residencial Vista Mar..."
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Localização
          </label>
          <input
            type="text"
            value={form.localizacao}
            onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
            placeholder="Balneário Camboriú, SC"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Preço
          </label>
          <input
            type="text"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
            placeholder="R$ 8.500.000"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Quartos
          </label>
          <input
            type="number"
            value={form.quartos}
            onChange={(e) => setForm({ ...form, quartos: e.target.value })}
            placeholder="4"
            min="1"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Área (m²)
          </label>
          <input
            type="text"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="280"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Principais Diferenciais
        </label>
        <textarea
          value={form.diferenciais}
          onChange={(e) => setForm({ ...form, diferenciais: e.target.value })}
          placeholder="Vista mar panorâmica, piscina privativa, automação residencial, cozinha gourmet Siemens..."
          rows={3}
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          required
        />
      </div>

      {hasBrokerPhotos && (
        <label className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20 cursor-pointer hover:bg-accent/8 transition-colors">
          <input
            type="checkbox"
            checked={form.incluirFoto}
            onChange={(e) => setForm({ ...form, incluirFoto: e.target.checked })}
            className="w-4 h-4 accent-[#C9974D]"
          />
          <ImageIcon size={15} className="text-accent/60" strokeWidth={1.5} />
          <span className="text-sm text-text-primary">
            Incluir sugestões de pose com minha foto no conteúdo
          </span>
        </label>
      )}

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
        {isLoading ? "Gerando..." : "Gerar Showcase"}
      </button>
    </form>
  );
}
