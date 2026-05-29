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

export function VendidoForm({ onGenerate, isLoading, hasBrokerPhotos }: Props) {
  const [useExisting, setUseExisting] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [nomeImovel, setNomeImovel] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tempoVenda, setTempoVenda] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [incluirFoto, setIncluirFoto] = useState(hasBrokerPhotos);

  const selected = properties.find((p) => p.id === selectedId);

  const imovelInfo = useExisting && selected
    ? `${selected.name} — ${selected.location} · ${selected.size} · ${selected.bedrooms} quartos · ${selected.price}`
    : `${nomeImovel}${localizacao ? ` — ${localizacao}` : ""}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useExisting && !selectedId) return;
    if (!useExisting && !nomeImovel) return;

    const prompt = `Crie um post comemorativo "VENDIDO!" para Instagram celebrando a venda deste imóvel:

Imóvel: ${imovelInfo}
${tempoVenda ? `Tempo até a venda: ${tempoVenda}` : ""}
${mensagem ? `Mensagem especial do corretor: ${mensagem}` : ""}
${incluirFoto ? "IMPORTANTE: O corretor aparecerá na foto segurando as chaves ou ao lado do cliente. Sugira a cena ideal." : ""}

O post deve:
1. Começar com "VENDIDO! 🔑" em destaque
2. Celebrar a conquista do cliente (não do corretor)
3. Humanizar a história — por que este imóvel era especial
4. Agradecer a confiança do cliente
5. Fazer CTA sutil para novos clientes interessados em vender ou comprar
6. Hashtags: #Vendido #CorretorDeImóveis + hashtags do bairro/cidade

Tom: celebratório, grato, humano. Não exagerado.

Retorne JSON com 'content' (post completo com emojis) e 'suggestions' (4 dicas para maximizar o alcance deste post).`;

    onGenerate(
      { imovelInfo, tempoVenda, mensagem, incluirFoto },
      prompt
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Toggle: existing vs custom */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setUseExisting(true)}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            useExisting
              ? "bg-accent text-[#050505]"
              : "bg-white/3 border border-accent/20 text-muted hover:text-text-primary"
          )}
        >
          Do portfólio
        </button>
        <button
          type="button"
          onClick={() => setUseExisting(false)}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            !useExisting
              ? "bg-accent text-[#050505]"
              : "bg-white/3 border border-accent/20 text-muted hover:text-text-primary"
          )}
        >
          Imóvel personalizado
        </button>
      </div>

      {/* From portfolio */}
      {useExisting && (
        <div className="space-y-2">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Selecionar Imóvel Vendido
          </label>
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
                  <p className="text-xs text-muted/60 mt-0.5">{p.location} · {p.size}</p>
                </div>
                <span className="text-xs font-semibold text-accent">{p.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Custom */}
      {!useExisting && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
              Nome do Imóvel
            </label>
            <input
              type="text"
              value={nomeImovel}
              onChange={(e) => setNomeImovel(e.target.value)}
              placeholder="Cobertura Duplex no Centro..."
              className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
              required={!useExisting}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
              Localização
            </label>
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              placeholder="Balneário Camboriú, SC"
              className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Tempo até a Venda (opcional)
          </label>
          <input
            type="text"
            value={tempoVenda}
            onChange={(e) => setTempoVenda(e.target.value)}
            placeholder="47 dias, 3 semanas..."
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Mensagem Especial (opcional)
          </label>
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Família incrível, foi um prazer..."
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {hasBrokerPhotos && (
        <label className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20 cursor-pointer hover:bg-accent/8 transition-colors">
          <input
            type="checkbox"
            checked={incluirFoto}
            onChange={(e) => setIncluirFoto(e.target.checked)}
            className="w-4 h-4 accent-[#C9974D]"
          />
          <span className="text-sm text-text-primary">
            Incluir sugestão de pose com as chaves / entrega ao cliente
          </span>
        </label>
      )}

      <button
        type="submit"
        disabled={isLoading || (useExisting && !selectedId) || (!useExisting && !nomeImovel)}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isLoading || (useExisting && !selectedId) || (!useExisting && !nomeImovel)
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-accent text-[#050505] hover:bg-accent/90"
        )}
      >
        <Wand2 size={15} strokeWidth={1.5} />
        {isLoading ? "Gerando..." : "Gerar Post Vendido!"}
      </button>
    </form>
  );
}
