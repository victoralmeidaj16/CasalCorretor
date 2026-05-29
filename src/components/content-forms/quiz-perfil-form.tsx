"use client";

import { useState } from "react";
import { Wand2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

const TEMAS = [
  "Perfil de Comprador (Investidor, Familiar, Luxo, Jovem, Aposentado)",
  "Momento de Compra (Agora, Breve, Planejando)",
  "Tipo de Imóvel Ideal (Apartamento, Casa, Flat, Cobertura)",
  "Bairro Ideal (Centro, Praia, Campo, Nobre)",
];

export function QuizPerfilForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [tema, setTema] = useState(TEMAS[0]);
  const [objetivo, setObjetivo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `Crie um carousel de quiz interativo para Instagram com o tema: "${tema}"
${objetivo ? `Objetivo do corretor: ${objetivo}` : ""}
${hasBrokerPhotos ? "O corretor aparecerá no slide final como 'guia' para interpretar o resultado. Sugira como ele deve ser posicionado." : ""}

Estrutura obrigatória dos slides:
SLIDE 1: Título do quiz + instrução "Salve este carousel para responder depois"
SLIDE 2: Pergunta 1 — com 4 opções (A/B/C/D)
SLIDE 3: Pergunta 2 — com 4 opções
SLIDE 4: Perguntas 3, 4 e 5 (mais simples, rápidas)
SLIDE 5: Como descobrir seu resultado + CTA para enviar respostas no direct

As perguntas devem ser leves, curtas e reveladoras do perfil do comprador.
Cada alternativa deve ser uma frase de 4-8 palavras, não um texto longo.
O resultado deve ser enviado para o direct — criar exclusividade.

Retorne JSON com 'content' (script dos 5 slides) e 'suggestions' (4 formas de usar o quiz para capturar leads).`;

    onGenerate({ tema, objetivo }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Tema do Quiz
        </label>
        <div className="space-y-2">
          {TEMAS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTema(t)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 text-sm",
                tema === t
                  ? "border-accent/60 bg-accent/8 text-text-primary"
                  : "border-accent/15 bg-white/2 text-muted hover:border-accent/30 hover:text-text-primary"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Objetivo do Quiz (opcional)
        </label>
        <input
          type="text"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          placeholder="Ex: Gerar leads para lançamento em BC, atrair investidores..."
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
            isLoading
              ? "bg-accent/20 text-accent/40 cursor-not-allowed"
              : "bg-accent text-[#050505] hover:bg-accent/90"
          )}
        >
          <Wand2 size={15} strokeWidth={1.5} />
          {isLoading ? "Gerando..." : "Gerar Quiz"}
        </button>
        <button
          type="button"
          onClick={() => {
            const randomTema = TEMAS[Math.floor(Math.random() * TEMAS.length)];
            setTema(randomTema);
          }}
          title="Tema aleatório"
          className="px-4 py-3 rounded-lg border border-accent/20 text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
        >
          <RefreshCw size={15} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
