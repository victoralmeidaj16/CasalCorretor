"use client";

import { useState, useEffect, useRef } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { BROKER_PRESETS, BrokerPreset, BrokerConfig, DEFAULT_BROKER_CONFIG, BrokerPresetId } from "@/data/broker-presets";
import { BROKER_CONFIG_STORAGE_KEY, getInitialBrokerConfig } from "@/lib/broker-config";
import { cn } from "@/lib/utils";
import {
  Crown,
  Heart,
  TrendingUp,
  Upload,
  X,
  Check,
  Camera,
  Sparkles,
  User,
} from "lucide-react";

const PRESET_ICONS: Record<string, React.ReactNode> = {
  Crown: <Crown size={20} strokeWidth={1.5} />,
  Heart: <Heart size={20} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={20} strokeWidth={1.5} />,
};

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 800;
        const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context unavailable"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PerfilCorretorPage() {
  const [config, setConfig] = useState<BrokerConfig>(DEFAULT_BROKER_CONFIG);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getInitialBrokerConfig()
      .then(setConfig)
      .catch(() => setConfig(DEFAULT_BROKER_CONFIG));
  }, []);

  const handlePresetSelect = (id: BrokerPresetId) => {
    setConfig((prev) => ({ ...prev, selectedPresetId: id }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadError("");

    const remaining = 3 - config.photos.length;
    if (remaining <= 0) {
      setUploadError("Máximo de 3 fotos atingido. Remova uma antes de adicionar.");
      return;
    }

    const toProcess = files.slice(0, remaining);
    try {
      const compressed = await Promise.all(toProcess.map(compressImage));
      setConfig((prev) => ({ ...prev, photos: [...prev.photos, ...compressed].slice(0, 3) }));
    } catch {
      setUploadError("Erro ao processar imagem. Use JPG ou PNG.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    localStorage.setItem(BROKER_CONFIG_STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectedPreset = BROKER_PRESETS.find((p) => p.id === config.selectedPresetId);

  return (
    <AuthLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium mb-2">
            Configuração
          </p>
          <h1
            className="text-3xl font-light text-text-primary mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Perfil & Identidade Visual
          </h1>
          <p className="text-sm text-muted/70">
            Configure seu estilo, faça upload das suas fotos e a IA gerará conteúdo personalizado para o seu perfil.
          </p>
          <div className="h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent mt-5" />
        </div>

        {/* Preset selection */}
        <section className="mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/50 font-semibold mb-4">
            Perfil de Atuação
          </p>
          <div className="grid grid-cols-3 gap-4">
            {BROKER_PRESETS.map((preset: BrokerPreset) => {
              const isSelected = config.selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id)}
                  className={cn(
                    "text-left p-5 rounded-xl border transition-all duration-200 card-gold-hover",
                    isSelected
                      ? "border-accent/60 bg-accent/6"
                      : "border-accent/15 bg-secondary hover:border-accent/30"
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors", isSelected ? "bg-accent/20 text-accent" : "bg-white/5 text-muted/50")}>
                    {PRESET_ICONS[preset.icon]}
                  </div>

                  <h3
                    className="text-base font-medium text-text-primary mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {preset.name}
                  </h3>
                  <p className="text-xs text-muted/60 mb-3">{preset.tagline}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("text-[9px] px-2 py-0.5 rounded-full border font-medium tracking-wide", isSelected ? "border-accent/40 text-accent bg-accent/10" : "border-muted/20 text-muted/50")}>
                      {preset.tone}
                    </span>
                    <span className="text-[9px] text-muted/40">{preset.priceRange}</span>
                  </div>

                  <div className="space-y-1">
                    {preset.editorialPillars.slice(0, 3).map((pillar) => (
                      <p key={pillar} className="text-[10px] text-muted/50">· {pillar}</p>
                    ))}
                    {preset.editorialPillars.length > 3 && (
                      <p className="text-[10px] text-muted/30">+ {preset.editorialPillars.length - 3} mais</p>
                    )}
                  </div>

                  {isSelected && (
                    <div className="mt-3 flex items-center gap-1.5 text-accent">
                      <Check size={12} strokeWidth={2} />
                      <span className="text-[10px] font-medium tracking-wide">Selecionado</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Photo upload */}
        <section className="mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/50 font-semibold mb-4">
            Suas Fotos — IA Personalizada
          </p>
          <div className="bg-secondary border border-accent/15 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Camera size={18} strokeWidth={1.5} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  Fotos do Corretor para Geração de Imagem
                </h3>
                <p className="text-xs text-muted/60">
                  Faça upload de 1 a 3 fotos suas. Elas serão enviadas ao Gemini para gerar conteúdo com sua imagem personalizada. Comprimir automaticamente para otimização.
                </p>
              </div>
            </div>

            {/* Photo grid */}
            {config.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {config.photos.map((photo, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-white/3 border border-accent/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900/80"
                    >
                      <X size={12} className="text-white" />
                    </button>
                    <div className="absolute bottom-2 left-2 text-[9px] text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
                      Foto {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload zone */}
            {config.photos.length < 3 && (
              <label className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-dashed border-accent/25 cursor-pointer hover:border-accent/50 hover:bg-accent/3 transition-all duration-200">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Upload size={18} strokeWidth={1.5} className="text-accent/70" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-primary font-medium">
                    {config.photos.length === 0 ? "Adicionar fotos" : `Adicionar mais (${3 - config.photos.length} restantes)`}
                  </p>
                  <p className="text-xs text-muted/50 mt-0.5">JPG ou PNG · Máx. 3 fotos · Compressão automática</p>
                </div>
              </label>
            )}

            {uploadError && (
              <p className="mt-2 text-xs text-red-400">{uploadError}</p>
            )}
          </div>
        </section>

        {/* Prompt configuration */}
        <section className="mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/50 font-semibold mb-4">
            Instruções para a IA
          </p>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs text-muted/70">
                <User size={13} strokeWidth={1.5} />
                Como usar minha foto nas imagens
              </label>
              <textarea
                value={config.photoUsageInstructions}
                onChange={(e) => setConfig((prev) => ({ ...prev, photoUsageInstructions: e.target.value }))}
                placeholder="Ex: Sempre me mostre em traje profissional. Prefiro poses naturais, não poses forçadas. Me coloque em ambientes de imóveis luxuosos..."
                rows={3}
                className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs text-muted/70">
                <Sparkles size={13} strokeWidth={1.5} />
                Diretrizes adicionais de tom e estilo
              </label>
              <textarea
                value={config.systemPromptOverride}
                onChange={(e) => setConfig((prev) => ({ ...prev, systemPromptOverride: e.target.value }))}
                placeholder="Ex: Sempre mencione que atuo há 10 anos no mercado. Use meu nome Victor nas CTAs. Foque em imóveis acima de R$ 1 milhão..."
                rows={3}
                className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>
          </div>
        </section>

        {/* Selected preset summary */}
        {selectedPreset && (
          <div className="mb-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent/70 font-medium mb-2">
              Diretrizes do Preset Ativo — {selectedPreset.name}
            </p>
            <p className="text-xs text-muted/60 leading-relaxed">{selectedPreset.fullToneDescription}</p>
          </div>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300",
            saved
              ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-400"
              : "bg-accent text-[#050505] hover:bg-accent/90"
          )}
        >
          {saved ? <Check size={15} strokeWidth={2} /> : <Check size={15} strokeWidth={1.5} />}
          {saved ? "Perfil salvo!" : "Salvar Perfil"}
        </button>
      </div>
    </AuthLayout>
  );
}
