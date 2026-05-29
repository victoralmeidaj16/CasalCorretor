"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { properties } from "@/data/properties";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

export function ImovelSemanaForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [destaque, setDestaque] = useState("");

  const selected = properties.find((p) => p.id === selectedId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    const prompt = `Crie um post "Imóvel da Semana" para Instagram com o seguinte imóvel:

Nome: ${selected.name}
Localização: ${selected.location}
Tipo: ${selected.type}
Tamanho: ${selected.size}
Quartos: ${selected.bedrooms} | Banheiros: ${selected.bathrooms}
Preço: ${selected.price}
${selected.tag ? `Tag: ${selected.tag}` : ""}
${destaque ? `Destaque especial desta semana: ${destaque}` : ""}
${hasBrokerPhotos ? "O corretor aparecerá na foto. Sugira como ele deve ser posicionado na imagem de capa." : ""}

Formato desejado:
- Título impactante com o nome do imóvel
- 3-4 bullet points dos principais atributos
- Chamada de urgência (disponibilidade limitada)
- Hashtags relevantes (10-15)
- CTA direto para contato

Retorne JSON com 'content' (post completo) e 'suggestions' (3-4 dicas de publicação).`;

    onGenerate({ propertyId: selectedId, destaque }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Selecionar Imóvel
        </label>
        <div className="space-y-2">
          {properties.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200",
                selectedId === p.id
                  ? "border-accent/60 bg-accent/8 text-text-primary"
                  : "border-accent/15 bg-white/2 text-muted hover:border-accent/30 hover:text-text-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted/60 mt-0.5">{p.location} · {p.size} · {p.bedrooms} quartos</p>
                </div>
                <span className="text-xs font-semibold text-accent">{p.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
          Destaque Especial desta Semana (opcional)
        </label>
        <input
          type="text"
          value={destaque}
          onChange={(e) => setDestaque(e.target.value)}
          placeholder="Ex: preço reduzido, última unidade, novo lançamento..."
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !selectedId}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isLoading || !selectedId
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-accent text-[#050505] hover:bg-accent/90"
        )}
      >
        <Wand2 size={15} strokeWidth={1.5} />
        {isLoading ? "Gerando..." : "Gerar Post da Semana"}
      </button>
    </form>
  );
}
