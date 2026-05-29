"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

export function DepoimentoClienteForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [form, setForm] = useState({
    nomeCliente: "",
    profissao: "",
    imovelComprado: "",
    historia: "",
    fraseCliente: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `Crie um carousel de depoimento de cliente para Instagram com 5 slides emocionais e autênticos:

Cliente: ${form.nomeCliente}${form.profissao ? `, ${form.profissao}` : ""}
Imóvel adquirido: ${form.imovelComprado}
História: ${form.historia}
${form.fraseCliente ? `Frase do próprio cliente: "${form.fraseCliente}"` : ""}
${hasBrokerPhotos ? "O corretor aparecerá no slide final ao lado do cliente (ou entregando as chaves). Sugira a cena." : ""}

Estrutura dos 5 slides:
SLIDE 1: Citação impactante do cliente (1-2 frases que criam identificação imediata)
SLIDE 2: O problema/desafio inicial (o que eles viviam antes — aluguel, incerteza, sonho distante)
SLIDE 3: O processo (como foi trabalhar juntos — descoberta do imóvel certo, confiança no corretor)
SLIDE 4: A conquista (o momento das chaves, o que mudou na vida deles)
SLIDE 5: A transformação + CTA (o impacto na vida atual + convite para novos clientes)

Tom: emocional, autêntico, não exagerado. Conecta com quem ainda está no início da jornada.

Retorne JSON com 'content' (script dos 5 slides) e 'suggestions' (4 dicas de como usar depoimentos para gerar leads).`;

    onGenerate(form, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Nome do Cliente
          </label>
          <input
            type="text"
            value={form.nomeCliente}
            onChange={(e) => setForm({ ...form, nomeCliente: e.target.value })}
            placeholder="Ana e Pedro"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Profissão (opcional)
          </label>
          <input
            type="text"
            value={form.profissao}
            onChange={(e) => setForm({ ...form, profissao: e.target.value })}
            placeholder="Professor, Médico, Empresário..."
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Imóvel Adquirido
        </label>
        <input
          type="text"
          value={form.imovelComprado}
          onChange={(e) => setForm({ ...form, imovelComprado: e.target.value })}
          placeholder="Apartamento 3 quartos em Balneário Camboriú"
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          História do Cliente
        </label>
        <textarea
          value={form.historia}
          onChange={(e) => setForm({ ...form, historia: e.target.value })}
          placeholder="Moravam de aluguel há 8 anos, tentaram comprar antes e não conseguiram, me procuraram com o FGTS disponível..."
          rows={4}
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Frase do Próprio Cliente (opcional)
        </label>
        <input
          type="text"
          value={form.fraseCliente}
          onChange={(e) => setForm({ ...form, fraseCliente: e.target.value })}
          placeholder="Agora acordo sabendo que estou pagando por algo que é meu"
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
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
        {isLoading ? "Gerando..." : "Gerar Carousel de Depoimento"}
      </button>
    </form>
  );
}
