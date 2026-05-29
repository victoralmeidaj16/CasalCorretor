"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp, Heart, Shield, Briefcase, Sunset, Users, Home, Crown,
  ChevronRight, X, AlertTriangle, CheckCircle, Zap, VolumeX, Volume2,
  MessageSquareQuote, Sparkles, PlusCircle, Trash2, Save, Undo
} from "lucide-react";
import { playbooks as defaultPlaybooks, type Playbook } from "@/data/playbooks";
import { cn } from "@/lib/utils";
import { AuthLayout } from "@/components/auth-layout";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Heart, Shield, Briefcase, Sunset, Users, Home, Crown,
};

export default function ArgumentosPage() {
  const [customPlaybooks, setCustomPlaybooks] = useState<Playbook[]>([]);
  const [selected, setSelected] = useState<Playbook | null>(null);
  const [tab, setTab] = useState<"argumentos" | "objecoes" | "fechamento" >("argumentos");
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [perfil, setPerfil] = useState("");
  const [descricao, setDescricao] = useState("");
  const [icon, setIcon] = useState("TrendingUp");
  const [tomDeVoz, setTomDeVoz] = useState("");
  const [gatilhoInput, setGatilhoInput] = useState("");
  const [gatilhos, setGatilhos] = useState<string[]>([]);
  
  const [proibidaInput, setProibidaInput] = useState("");
  const [palavrasProibidas, setPalavrasProibidas] = useState<string[]>([]);
  const [poderosaInput, setPoderosaInput] = useState("");
  const [palavrasPoderosas, setPalavrasPoderosas] = useState<string[]>([]);

  // Arguments sub-form
  const [argErrado, setArgErrado] = useState("");
  const [argCerto, setArgCerto] = useState("");
  const [argNota, setArgNota] = useState("");
  const [argumentos, setArgumentos] = useState<{ errado: string; certo: string; nota: string }[]>([]);

  // Objections sub-form
  const [objText, setObjText] = useState("");
  const [objResp, setObjResp] = useState("");
  const [objecoes, setObjecoes] = useState<{ objecao: string; resposta: string }[]>([]);

  // Closings sub-form
  const [closingInput, setClosingInput] = useState("");
  const [framesDeChamento, setFramesDeChamento] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("custom_playbooks");
      if (saved) {
        try {
          setCustomPlaybooks(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse custom playbooks", e);
        }
      }
    }
  }, []);

  const allPlaybooks = [...defaultPlaybooks, ...customPlaybooks];

  const handleSavePlaybook = () => {
    if (!perfil.trim()) return;

    const newPlaybook: Playbook = {
      id: "custom_" + Date.now(),
      perfil,
      descricao: descricao || "Perfil personalizado criado pelo corretor.",
      icon,
      cor: "#C9974D",
      gatilhos: gatilhos.length > 0 ? gatilhos : ["Proteção patrimonial", "Estabilidade"],
      objecoes: objecoes.length > 0 ? objecoes : [{ objecao: "Exemplo de Objeção", resposta: "Exemplo de Resposta de contorno." }],
      argumentos: argumentos.length > 0 ? argumentos : [{ errado: "Exemplo de argumento fraco/vendedor", certo: "Exemplo de argumento sofisticado focado em patrimônio", nota: "Explicação estratégica do argumento." }],
      palavrasProibidas: palavrasProibidas.length > 0 ? palavrasProibidas : ["desconto", "barato"],
      palavrasPoderosas: palavrasPoderosas.length > 0 ? palavrasPoderosas : ["ativo de valor", "escassez"],
      tomDeVoz: tomDeVoz || "Profissional, exclusivo e sereno.",
      framesDeChamento: framesDeChamento.length > 0 ? framesDeChamento : ["Vamos dar o próximo passo para consolidar este ativo?"],
    };

    const updated = [...customPlaybooks, newPlaybook];
    setCustomPlaybooks(updated);
    localStorage.setItem("custom_playbooks", JSON.stringify(updated));

    // Reset and select newly created playbook
    setSelected(newPlaybook);
    setIsCreating(false);
    resetForm();
  };

  const handleDeletePlaybook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPlaybooks.filter(p => p.id !== id);
    setCustomPlaybooks(updated);
    localStorage.setItem("custom_playbooks", JSON.stringify(updated));
    if (selected?.id === id) {
      setSelected(null);
    }
  };

  const resetForm = () => {
    setPerfil("");
    setDescricao("");
    setIcon("TrendingUp");
    setTomDeVoz("");
    setGatilhos([]);
    setPalavrasProibidas([]);
    setPalavrasPoderosas([]);
    setArgumentos([]);
    setObjecoes([]);
    setFramesDeChamento([]);
    setGatilhoInput("");
    setProibidaInput("");
    setPoderosaInput("");
    setArgErrado("");
    setArgCerto("");
    setArgNota("");
    setObjText("");
    setObjResp("");
    setClosingInput("");
  };

  return (
    <AuthLayout>
    <div className="min-h-screen">
      {/* Page header */}
      <div className="relative px-8 pt-10 pb-8 border-b border-accent/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
        <div className="relative flex justify-between items-end">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.4em] text-accent/60 uppercase mb-2">
              Inteligência Comercial
            </p>
            <h1
              className="text-4xl font-light text-text-primary leading-none mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Biblioteca de Argumentos
            </h1>
            <p className="text-xs text-muted/50 font-light tracking-wider max-w-lg">
              Selecione o perfil do cliente e acesse os playbooks calibrados para cada persona — ou crie novos argumentos personalizados.
            </p>
          </div>
          <button
            onClick={() => { setIsCreating(true); setSelected(null); resetForm(); }}
            className={cn(
              "px-5 py-2.5 rounded-lg border text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-200 flex items-center gap-2",
              isCreating 
                ? "border-accent/40 bg-accent/10 text-accent" 
                : "border-accent/20 hover:border-accent/50 text-accent hover:bg-accent/5"
            )}
          >
            <PlusCircle size={14} />
            Novo Perfil
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Left — Profile selector */}
        <div className="w-72 flex-shrink-0 border-r border-accent/10 overflow-y-auto py-6 px-4 space-y-1">
          <p className="text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase px-3 mb-4">
            Perfis de Cliente
          </p>
          {allPlaybooks.map((pb) => {
            const Icon = iconMap[pb.icon] ?? TrendingUp;
            const isActive = selected?.id === pb.id;
            const isCustom = pb.id.startsWith("custom_");
            return (
              <button
                key={pb.id}
                onClick={() => { setSelected(pb); setTab("argumentos"); setIsCreating(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group relative",
                  isActive
                    ? "bg-accent/10 border border-accent/30"
                    : "border border-transparent hover:bg-white/3 hover:border-accent/10"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent rounded-r" />
                )}
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                  isActive ? "bg-accent/20" : "bg-white/5 group-hover:bg-accent/10"
                )}>
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                    className={isActive ? "text-accent" : "text-muted/50 group-hover:text-accent/60"}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className={cn(
                      "text-sm font-medium leading-none truncate",
                      isActive ? "text-accent" : "text-text-primary/80"
                    )}>
                      {pb.perfil}
                    </p>
                    {isCustom && (
                      <span className="text-[7px] font-bold tracking-wider uppercase text-accent/60 bg-accent/10 px-1 rounded">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted/40 leading-tight line-clamp-1">
                    {pb.descricao}
                  </p>
                </div>
                {isCustom ? (
                  <button
                    onClick={(e) => handleDeletePlaybook(pb.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-500/10 text-muted/40 hover:text-red-400 transition-all ml-1"
                  >
                    <Trash2 size={12} />
                  </button>
                ) : (
                  <ChevronRight
                    size={12}
                    className={cn(
                      "flex-shrink-0 ml-auto transition-colors",
                      isActive ? "text-accent/60" : "text-muted/20 group-hover:text-accent/40"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right — Playbook content or Creation Form */}
        {isCreating ? (
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a]/30">
            {/* Header Form */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-accent/10 px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.3em] text-accent uppercase mb-1">
                  Criação de Perfil
                </p>
                <h2
                  className="text-2xl font-light text-text-primary leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Novo Playbook de Argumentação
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-muted/60 text-[10px] font-semibold tracking-wider hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Undo size={12} />
                  Cancelar
                </button>
                <button
                  onClick={handleSavePlaybook}
                  disabled={!perfil.trim()}
                  className="px-5 py-2 rounded-lg bg-accent text-primary text-[10px] font-bold tracking-wider hover:bg-accent/90 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Save size={12} />
                  Salvar Playbook
                </button>
              </div>
            </div>

            <div className="px-8 py-8 space-y-6 max-w-4xl">
              {/* Informações Básicas */}
              <div className="bg-[#111] border border-accent/15 rounded-xl p-6 space-y-4">
                <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase">
                  1. Informações Básicas
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-[9px] font-semibold tracking-wider text-muted/50 uppercase block mb-1.5">
                      Nome do Perfil *
                    </label>
                    <input
                      type="text"
                      value={perfil}
                      onChange={(e) => setPerfil(e.target.value)}
                      placeholder="Ex: Jovem Solteiro High Ticket, Herdeiro do Agro"
                      className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-semibold tracking-wider text-muted/50 uppercase block mb-1.5">
                      Ícone Representativo
                    </label>
                    <select
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent/40 cursor-pointer"
                    >
                      <option value="TrendingUp">Gráfico / Investimentos (TrendingUp)</option>
                      <option value="Heart">Coração / Sentimental (Heart)</option>
                      <option value="Shield">Escudo / Segurança (Shield)</option>
                      <option value="Briefcase">Maleta / Executivo (Briefcase)</option>
                      <option value="Sunset">Pôr do Sol / Estilo de Vida (Sunset)</option>
                      <option value="Users">Família / Comunidade (Users)</option>
                      <option value="Home">Casa / Imóveis (Home)</option>
                      <option value="Crown">Coroa / Alto Padrão (Crown)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-semibold tracking-wider text-muted/50 uppercase block mb-1.5">
                    Descrição Curta da Persona
                  </label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Defina o perfil psicológico e objetivos básicos desse cliente..."
                    rows={2}
                    className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none focus:border-accent/40 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-semibold tracking-wider text-muted/50 uppercase block mb-1.5">
                    Diretriz de Tom de Voz
                  </label>
                  <input
                    type="text"
                    value={tomDeVoz}
                    onChange={(e) => setTomDeVoz(e.target.value)}
                    placeholder="Ex: Focado em discrição, termos técnicos, postura corporativa..."
                    className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>

              {/* Gatilhos e Palavras */}
              <div className="grid grid-cols-2 gap-4">
                {/* Gatilhos */}
                <div className="bg-[#111] border border-accent/15 rounded-xl p-5 space-y-3">
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase">
                    2. Gatilhos Emocionais
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={gatilhoInput}
                      onChange={(e) => setGatilhoInput(e.target.value)}
                      placeholder="Adicionar gatilho emocional..."
                      className="flex-1 bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none"
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (gatilhoInput.trim()) { setGatilhos([...gatilhos, gatilhoInput.trim()]); setGatilhoInput(""); } } }}
                    />
                    <button
                      type="button"
                      onClick={() => { if (gatilhoInput.trim()) { setGatilhos([...gatilhos, gatilhoInput.trim()]); setGatilhoInput(""); } }}
                      className="px-3 bg-accent text-primary rounded-lg text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {gatilhos.map((g, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#0d0d0d] border border-accent/5 px-2.5 py-1.5 rounded-md text-xs text-text-primary/70">
                        <span className="truncate">{g}</span>
                        <button type="button" onClick={() => setGatilhos(gatilhos.filter((_, i) => i !== idx))} className="text-muted/40 hover:text-red-400 ml-2">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {gatilhos.length === 0 && (
                      <p className="text-[10px] text-muted/30 italic">Nenhum gatilho adicionado ainda.</p>
                    )}
                  </div>
                </div>

                {/* Palavras */}
                <div className="bg-[#111] border border-accent/15 rounded-xl p-5 space-y-4">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase mb-2">
                      3. Vocabulário Calibrado
                    </p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={proibidaInput}
                        onChange={(e) => setProibidaInput(e.target.value)}
                        placeholder="Palavra Proibida (ex: promoção)..."
                        className="flex-1 bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (proibidaInput.trim()) { setPalavrasProibidas([...palavrasProibidas, proibidaInput.trim()]); setProibidaInput(""); } } }}
                      />
                      <button
                        type="button"
                        onClick={() => { if (proibidaInput.trim()) { setPalavrasProibidas([...palavrasProibidas, proibidaInput.trim()]); setProibidaInput(""); } }}
                        className="px-3 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                      {palavrasProibidas.map((p, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-red-500/5 border border-red-500/10 text-red-400/60 line-through">
                          {p}
                          <button type="button" onClick={() => setPalavrasProibidas(palavrasProibidas.filter((_, i) => i !== idx))} className="text-red-400/50 hover:text-red-400">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={poderosaInput}
                        onChange={(e) => setPoderosaInput(e.target.value)}
                        placeholder="Palavra Poderosa (ex: escassez)..."
                        className="flex-1 bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (poderosaInput.trim()) { setPalavrasPoderosas([...palavrasPoderosas, poderosaInput.trim()]); setPoderosaInput(""); } } }}
                      />
                      <button
                        type="button"
                        onClick={() => { if (poderosaInput.trim()) { setPalavrasPoderosas([...palavrasPoderosas, poderosaInput.trim()]); setPoderosaInput(""); } }}
                        className="px-3 bg-accent text-primary rounded-lg text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                      {palavrasPoderosas.map((p, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-accent/5 border border-accent/10 text-accent/70">
                          {p}
                          <button type="button" onClick={() => setPalavrasPoderosas(palavrasPoderosas.filter((_, i) => i !== idx))} className="text-accent/50 hover:text-accent">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Argumentos Comparativos */}
              <div className="bg-[#111] border border-accent/15 rounded-xl p-6 space-y-4">
                <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase">
                  4. Argumentos (Errado vs Certo)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-semibold text-red-400/60 uppercase block mb-1">
                      Abordagem Errada (Vendedor Tradicional)
                    </label>
                    <textarea
                      value={argErrado}
                      onChange={(e) => setArgErrado(e.target.value)}
                      placeholder="Ex: Esse apartamento é o mais barato do bairro, não perca essa oportunidade!"
                      rows={2}
                      className="w-full bg-[#0d0d0d] border border-red-500/10 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none focus:border-red-500/30 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-semibold text-accent/80 uppercase block mb-1">
                      Abordagem Certa (Private Broker)
                    </label>
                    <textarea
                      value={argCerto}
                      onChange={(e) => setArgCerto(e.target.value)}
                      placeholder="Ex: Trata-se de um ativo sob demanda em endereço escasso, assegurando estabilidade inflacionária..."
                      rows={2}
                      className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none focus:border-accent/40 resize-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-semibold text-muted/50 uppercase block mb-1">
                    Nota Estratégica / Justificativa
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={argNota}
                      onChange={(e) => setArgNota(e.target.value)}
                      placeholder="Ex: O investidor foge do tom comercial. Use justificativas macroeconômicas."
                      className="flex-1 bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none"
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (argCerto.trim() && argErrado.trim()) { setArgumentos([...argumentos, { errado: argErrado, certo: argCerto, nota: argNota }]); setArgErrado(""); setArgCerto(""); setArgNota(""); } } }}
                    />
                    <button
                      type="button"
                      onClick={() => { if (argCerto.trim() && argErrado.trim()) { setArgumentos([...argumentos, { errado: argErrado, certo: argCerto, nota: argNota }]); setArgErrado(""); setArgCerto(""); setArgNota(""); } }}
                      className="px-4 bg-accent text-primary rounded-lg text-xs font-bold"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-4 max-h-56 overflow-y-auto">
                  {argumentos.map((arg, idx) => (
                    <div key={idx} className="bg-[#0d0d0d] border border-accent/10 rounded-lg p-3 flex justify-between gap-4 text-xs">
                      <div className="flex-1 space-y-1">
                        <p className="text-red-400/70 font-light line-clamp-1 italic">Errado: &ldquo;{arg.errado}&rdquo;</p>
                        <p className="text-accent font-light line-clamp-1">Certo: &ldquo;{arg.certo}&rdquo;</p>
                        {arg.nota && <p className="text-[10px] text-muted/40 font-light">Nota: {arg.nota}</p>}
                      </div>
                      <button type="button" onClick={() => setArgumentos(argumentos.filter((_, i) => i !== idx))} className="text-muted/40 hover:text-red-400 flex-shrink-0 self-start mt-0.5">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objeções */}
              <div className="bg-[#111] border border-accent/15 rounded-xl p-6 space-y-4">
                <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase">
                  5. Objeções & Contornos de Objeção
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-semibold text-muted/50 uppercase block mb-1">
                      Objeção Comum do Cliente
                    </label>
                    <textarea
                      value={objText}
                      onChange={(e) => setObjText(e.target.value)}
                      placeholder="Ex: Acho o preço por metro quadrado irracional nesta quadra."
                      rows={2}
                      className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-semibold text-accent/80 uppercase block mb-1">
                      Resposta / Contorno Sofisticado
                    </label>
                    <textarea
                      value={objResp}
                      onChange={(e) => setObjResp(e.target.value)}
                      placeholder="Ex: A escassez de terrenos frontais dita a valorização real, superando métricas tradicionais..."
                      rows={2}
                      className="w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { if (objText.trim() && objResp.trim()) { setObjecoes([...objecoes, { objecao: objText, resposta: objResp }]); setObjText(""); setObjResp(""); } }}
                    className="px-6 py-2 bg-accent text-primary rounded-lg text-xs font-bold"
                  >
                    Adicionar Objeção
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {objecoes.map((obj, idx) => (
                    <div key={idx} className="bg-[#0d0d0d] border border-accent/10 rounded-lg p-3 flex justify-between gap-4 text-xs">
                      <div className="flex-1 space-y-1">
                        <p className="text-muted/50 italic line-clamp-1">Objeção: &ldquo;{obj.objecao}&rdquo;</p>
                        <p className="text-text-primary/80 line-clamp-1">Contorno: {obj.resposta}</p>
                      </div>
                      <button type="button" onClick={() => setObjecoes(objecoes.filter((_, i) => i !== idx))} className="text-muted/40 hover:text-red-400 flex-shrink-0 self-start mt-0.5">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fechamento */}
              <div className="bg-[#111] border border-accent/15 rounded-xl p-6 space-y-3">
                <p className="text-[9px] font-semibold tracking-[0.25em] text-accent uppercase">
                  6. Frases de Fechamento
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={closingInput}
                    onChange={(e) => setClosingInput(e.target.value)}
                    placeholder="Adicionar frase final de impacto / fechamento..."
                    className="flex-1 bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2 text-xs text-text-primary placeholder-muted/30 focus:outline-none"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (closingInput.trim()) { setFramesDeChamento([...framesDeChamento, closingInput.trim()]); setClosingInput(""); } } }}
                  />
                  <button
                    type="button"
                    onClick={() => { if (closingInput.trim()) { setFramesDeChamento([...framesDeChamento, closingInput.trim()]); setClosingInput(""); } }}
                    className="px-4 bg-accent text-primary rounded-lg text-xs font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {framesDeChamento.map((f, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#0d0d0d] border border-accent/5 px-2.5 py-1.5 rounded-md text-xs text-text-primary/70">
                      <span className="truncate">{f}</span>
                      <button type="button" onClick={() => setFramesDeChamento(framesDeChamento.filter((_, i) => i !== idx))} className="text-muted/40 hover:text-red-400 ml-2">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {framesDeChamento.length === 0 && (
                    <p className="text-[10px] text-muted/30 italic">Nenhuma frase de fechamento adicionada.</p>
                  )}
                </div>
              </div>

              {/* Botões de Ação Inferiores */}
              <div className="pt-4 flex justify-end gap-3 border-t border-accent/10">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-2.5 rounded-lg border border-white/10 text-muted/60 text-xs font-semibold tracking-wider hover:bg-white/5 transition-all"
                >
                  Descartar
                </button>
                <button
                  type="button"
                  onClick={handleSavePlaybook}
                  disabled={!perfil.trim()}
                  className="px-8 py-2.5 bg-accent text-primary text-xs font-bold tracking-wider hover:bg-accent/90 transition-all rounded-lg disabled:opacity-40 disabled:pointer-events-none shadow-[0_0_20px_rgba(201,151,77,0.2)]"
                >
                  Salvar e Ativar Perfil
                </button>
              </div>
            </div>
          </div>
        ) : selected ? (
          <div className="flex-1 overflow-y-auto">
            {/* Playbook header */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-accent/10 px-8 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/50 uppercase mb-1">
                    Playbook Emocional
                  </p>
                  <h2
                    className="text-2xl font-light text-text-primary leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {selected.perfil}
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center hover:border-accent/40 transition-colors"
                >
                  <X size={14} strokeWidth={1.5} className="text-muted/50" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mt-5">
                {(["argumentos", "objecoes", "fechamento"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-200",
                      tab === t
                        ? "bg-accent text-primary"
                        : "text-muted/50 hover:text-muted hover:bg-white/5"
                    )}
                  >
                    {t === "argumentos" ? "Argumentos" : t === "objecoes" ? "Objeções" : "Fechamento"}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Gatilhos — always visible */}
              <div className="bg-[#111] border border-accent/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} strokeWidth={1.5} className="text-accent" />
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-accent uppercase">
                    Gatilhos Emocionais
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selected.gatilhos.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-text-primary/70 font-light leading-snug">{g}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tom de voz — always visible */}
              <div className="bg-[#0f0e0c] border border-warm-highlight/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 size={14} strokeWidth={1.5} className="text-warm-highlight" />
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-warm-highlight uppercase">
                    Tom de Voz
                  </p>
                </div>
                <p className="text-sm text-text-primary/60 font-light leading-relaxed italic">
                  &ldquo;{selected.tomDeVoz}&rdquo;
                </p>
              </div>

              {/* Tab content */}
              {tab === "argumentos" && (
                <div className="space-y-4">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase">
                    Comparativo de Argumentos
                  </p>
                  {selected.argumentos.map((arg, i) => (
                    <div key={i} className="bg-[#111] border border-accent/10 rounded-xl overflow-hidden">
                      {/* Wrong */}
                      <div className="px-6 py-4 border-b border-accent/10">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X size={10} strokeWidth={2} className="text-red-400/70" />
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold tracking-[0.2em] text-red-400/50 uppercase mb-1.5">
                              Errado
                            </p>
                            <p className="text-sm text-muted/50 font-light italic">
                              &ldquo;{arg.errado}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Right */}
                      <div className="px-6 py-4 bg-accent/[0.03]">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={10} strokeWidth={2} className="text-accent" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[9px] font-semibold tracking-[0.2em] text-accent/60 uppercase mb-1.5">
                              Certo
                            </p>
                            <p
                              className="text-sm text-text-primary font-light leading-relaxed"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}
                            >
                              &ldquo;{arg.certo}&rdquo;
                            </p>
                            {arg.nota && (
                              <p className="text-[10px] text-muted/40 mt-2 font-light italic">
                                ↳ {arg.nota}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Palavras proibidas + poderosas */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#111] border border-red-500/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <VolumeX size={13} strokeWidth={1.5} className="text-red-400/50" />
                        <p className="text-[9px] font-semibold tracking-[0.25em] text-red-400/50 uppercase">
                          Palavras Proibidas
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selected.palavrasProibidas.map((p, i) => (
                          <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-red-500/8 border border-red-500/15 text-red-400/50 line-through">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#111] border border-accent/15 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={13} strokeWidth={1.5} className="text-accent/60" />
                        <p className="text-[9px] font-semibold tracking-[0.25em] text-accent/60 uppercase">
                          Palavras Poderosas
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selected.palavrasPoderosas.map((p, i) => (
                          <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent/70">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "objecoes" && (
                <div className="space-y-4">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase">
                    Objeções e Como Responder
                  </p>
                  {selected.objecoes.map((obj, i) => (
                    <div key={i} className="bg-[#111] border border-accent/10 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-accent/10 flex items-start gap-3">
                        <AlertTriangle size={14} strokeWidth={1.5} className="text-amber-400/50 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted/60 font-light italic">
                          &ldquo;{obj.objecao}&rdquo;
                        </p>
                      </div>
                      <div className="px-6 py-5 bg-accent/[0.03]">
                        <p className="text-[9px] font-semibold tracking-[0.2em] text-accent/50 uppercase mb-2">
                          Como responder
                        </p>
                        <p
                          className="text-text-primary/80 font-light leading-relaxed"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}
                        >
                          {obj.resposta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "fechamento" && (
                <div className="space-y-4">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase">
                    Frases de Fechamento
                  </p>
                  {selected.framesDeChamento.map((frase, i) => (
                    <div
                      key={i}
                      className="bg-[#111] border border-accent/20 rounded-xl p-6 relative overflow-hidden group hover:border-accent/40 transition-colors duration-200"
                    >
                      <div className="absolute top-4 right-4">
                        <MessageSquareQuote size={20} strokeWidth={1} className="text-accent/10 group-hover:text-accent/20 transition-colors" />
                      </div>
                      <span
                        className="text-5xl font-light text-accent/15 leading-none block mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        &ldquo;
                      </span>
                      <p
                        className="text-text-primary/80 font-light leading-relaxed -mt-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}
                      >
                        {frase}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="w-16 h-16 rounded-full bg-accent/5 border border-accent/15 flex items-center justify-center mb-6">
              <MessageSquareQuote size={24} strokeWidth={1} className="text-accent/40" />
            </div>
            <h3
              className="text-2xl font-light text-text-primary/50 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Selecione um perfil
            </h3>
            <p className="text-xs text-muted/30 font-light tracking-wider max-w-xs">
              Escolha o tipo de cliente ao lado para acessar o playbook emocional completo.
            </p>
          </div>
        )}
      </div>
    </div>
    </AuthLayout>
  );
}
