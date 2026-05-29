"use client";

import { useState } from "react";
import { Wand2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

export function AnuncioPremiumForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [form, setForm] = useState({
    construtora: "",
    fraseTop: "",
    frase2: "",
    frase3: "",
    frase4: "",
    telefone: "",
    website: "",
    incluirCorretor: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Gere uma legenda de vendas premium e engajadora para o Instagram acompanhando o anúncio imobiliário da construtora "${form.construtora || "AB INVEST"}".
    
Título do Anúncio: ${form.frase2} - ${form.frase3}
Detalhes adicionados: ${form.frase4}
Contato: ${form.telefone || "+91-8088 900 660"}
Website: ${form.website || "www.abinvest.com"}

O texto deve:
1. Começar com um gancho forte de alto padrão
2. Descrever a exclusividade do empreendimento e a sofisticação do design
3. Apresentar os benefícios de investimento e qualidade de vida
4. Ter um Call to Action claro direcionando para o telefone ou site
5. Incluir emojis elegantes e 5-6 hashtags selecionadas de alta conversão.

Retorne JSON com 'content' (a legenda para o Instagram) e 'suggestions' (5 dicas estratégicas de tráfego pago ou publicação para este anúncio).`;

    onGenerate(form, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Nome da Construtora
          </label>
          <input
            type="text"
            value={form.construtora}
            onChange={(e) => setForm({ ...form, construtora: e.target.value })}
            placeholder="Ex: AB INVEST"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Frase do Topo (Logo/Slogan)
          </label>
          <input
            type="text"
            value={form.fraseTop}
            onChange={(e) => setForm({ ...form, fraseTop: e.target.value })}
            placeholder="Ex: DESIGN EXCLUSIVO"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Título Principal (Frase 2)
          </label>
          <input
            type="text"
            value={form.frase2}
            onChange={(e) => setForm({ ...form, frase2: e.target.value })}
            placeholder="Ex: SEU NOVO LAR DE LUXO"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Subtítulo (Frase 3)
          </label>
          <input
            type="text"
            value={form.frase3}
            onChange={(e) => setForm({ ...form, frase3: e.target.value })}
            placeholder="Ex: FRENTE MAR EM BALNEÁRIO"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Descrição Corporativa (Frase 4)
        </label>
        <textarea
          value={form.frase4}
          onChange={(e) => setForm({ ...form, frase4: e.target.value })}
          placeholder="Ex: Viva a experiência única de morar no melhor endereço da cidade com acabamentos italianos e automação total."
          rows={2}
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Telefone de Contato
          </label>
          <input
            type="text"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            placeholder="Ex: +55 (47) 99999-9999"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Website corporativo
          </label>
          <input
            type="text"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="Ex: www.abinvest.com"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {hasBrokerPhotos && (
        <label className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20 cursor-pointer hover:bg-accent/8 transition-colors">
          <input
            type="checkbox"
            checked={form.incluirCorretor}
            onChange={(e) => setForm({ ...form, incluirCorretor: e.target.checked })}
            className="w-4 h-4 accent-[#C9974D]"
          />
          <ImageIcon size={15} className="text-accent/60" strokeWidth={1.5} />
          <span className="text-sm text-text-primary">
            Integrar minha foto de corretor no design do anúncio
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
        {isLoading ? "Gerando..." : "Gerar Anúncio & Legenda"}
      </button>
    </form>
  );
}
