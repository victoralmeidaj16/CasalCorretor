"use client";

import { useEffect, useState, useRef } from "react";
import {
  Building2,
  Users,
  Monitor,
  Key,
  Phone,
  BarChart2,
  Sunset,
  Pencil,
  Upload,
  Sparkles,
  X,
  CheckCircle2,
  Camera,
  Briefcase,
  Star,
  Film,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrokerConfig } from "@/data/broker-presets";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
  brokerConfig: BrokerConfig;
  onGenerateImage: (photo: string, prompt: string) => void;
  isGeneratingImage: boolean;
}

const CENARIOS = [
  {
    id: "imovel-luxo",
    label: "Frente a um Imóvel",
    icon: <Building2 size={18} strokeWidth={1.5} />,
    promptBase:
      "standing confidently in front of a luxury high-rise residential building entrance, professional business attire, authoritative and welcoming posture",
  },
  {
    id: "reuniao-clientes",
    label: "Em Reunião",
    icon: <Users size={18} strokeWidth={1.5} />,
    promptBase:
      "in a modern premium meeting room presenting to clients across a glass table, professional setting, confident body language",
  },
  {
    id: "escritorio",
    label: "No Escritório",
    icon: <Monitor size={18} strokeWidth={1.5} />,
    promptBase:
      "at a sleek modern executive desk, reviewing real estate documents or laptop screen, professional home office or corporate environment",
  },
  {
    id: "entrega-chaves",
    label: "Entregando Chaves",
    icon: <Key size={18} strokeWidth={1.5} />,
    promptBase:
      "handing house keys to a happy couple at a luxury apartment building entrance, warm celebratory moment, genuine smile",
  },
  {
    id: "telefone",
    label: "Negociando",
    icon: <Phone size={18} strokeWidth={1.5} />,
    promptBase:
      "on a business phone call in a sophisticated setting, confident posture, luxury real estate building or city skyline background",
  },
  {
    id: "graficos",
    label: "Análise de Mercado",
    icon: <BarChart2 size={18} strokeWidth={1.5} />,
    promptBase:
      "pointing at real estate market growth charts on a screen or whiteboard, professional consultant appearance, authority pose",
  },
  {
    id: "panoramica",
    label: "Vista da Cidade",
    icon: <Sunset size={18} strokeWidth={1.5} />,
    promptBase:
      "standing on a luxury rooftop or high-rise balcony with a panoramic city skyline behind, upscale lifestyle context, golden hour light",
  },
  {
    id: "personalizado",
    label: "Personalizado",
    icon: <Pencil size={18} strokeWidth={1.5} />,
    promptBase: "",
  },
] as const;

type CenarioId = (typeof CENARIOS)[number]["id"];

const ESTILOS = [
  {
    id: "premium-dark",
    label: "Premium Dark",
    desc: "Fundo escuro, iluminação dramática",
    style: "dark moody background, dramatic cinematic lighting, deep shadows, luxury editorial aesthetic",
  },
  {
    id: "natural-light",
    label: "Natural Light",
    desc: "Clean, editorial, luminoso",
    style: "bright natural daylight, clean white or neutral background, editorial magazine aesthetic",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    desc: "Tons quentes, candid, autêntico",
    style: "warm golden tones, candid authentic feel, lifestyle photography aesthetic, approachable",
  },
] as const;

type EstiloId = (typeof ESTILOS)[number]["id"];

const MODELOS_PERFIL = [
  {
    id: "dark-studio",
    label: "Dark Studio",
    desc: "Estúdio escuro, contraste dramático, 85mm f/2",
    icon: <Camera size={16} strokeWidth={1.5} />,
    fullPrompt: `Modern branding photo in dark studio with controlled contrast. Subject sits square to camera, arms resting forward, face softly illuminated. Clothing black-on-white combination, matte textures only. Key light above-left, fill minimal, shadows deep yet refined. Gray seamless background with slight gradient halo behind subject. Lens 85 mm f/2 ISO 100. Color palette neutral and cinematic. The person in the reference photo is the subject — preserve their face, features and appearance exactly.`,
  },
  {
    id: "standing-portrait",
    label: "Retrato em Pé",
    desc: "Terno azul marinho, sorriso natural, fundo degradê",
    icon: <Star size={16} strokeWidth={1.5} />,
    fullPrompt: `Confident studio portrait reflecting the physical characteristics of the person in the reference photo. Standing relaxed against a dark gradient backdrop. The subject faces the camera directly with a friendly, natural smile that conveys approachability and confidence. One hand rests casually inside a pocket while the other lightly holds the front of the jacket, posture upright yet relaxed. Wardrobe modern and refined: deep navy blue tailored blazer with subtle texture, paired with a clean black crew-neck shirt. Minimal accessories with a metallic wristwatch visible on the wrist, reinforcing a polished professional aesthetic. Background smooth charcoal-to-black gradient creating a clean studio environment with no visible distractions. Composition centered with balanced negative space around the subject. Lighting soft and directional from the front-left, producing gentle highlights across the face and jacket texture while maintaining natural skin tones. Camera positioned at chest height for a natural perspective. Framing mid-length portrait capturing upper torso and arms. Portrait lens look (85mm, shallow depth of field). Preserve the subject's face and features exactly as in the reference photo.`,
  },
  {
    id: "executive-desk",
    label: "Executivo",
    desc: "Apoiado na mesa, postura de autoridade",
    icon: <Briefcase size={16} strokeWidth={1.5} />,
    fullPrompt: `Executive portrait of the person shown in the reference photo, preserving their physical features exactly. Leaning forward with both hands firmly placed on a wooden desk, determined expression. Posture conveys authority and strategic confidence. Wardrobe: deep navy tailored blazer, black dress shirt open at collar. Background: wooden shelving with warm integrated LED horizontal lines. Cinematic professional lighting, soft frontal key with golden ambient glow. Symmetrical composition, 85mm lens look.`,
  },
  {
    id: "editorial-luxury",
    label: "Editorial Luxo",
    desc: "Ultra realista, magazine premium, iluminação dramática",
    icon: <Star size={16} strokeWidth={1.5} />,
    fullPrompt: `Ultra-realistic professional portrait of the person shown in the reference photo — preserve their face, skin tone, hair and features exactly. High-end editorial photography, luxury aesthetic. Confident and powerful expression. Clean hairstyle, no hat, no headwear, no accessories. Sharp jawline lighting. Soft but dramatic key light from the left. Subtle rim light separating from background. Dark charcoal background with smooth gradient. Shallow depth of field. 85mm lens, f/1.8. Cinematic color grading. High dynamic range. Ultra detailed skin texture. Natural skin tones. Premium fashion magazine style. Symmetrical composition. Centered framing. 4K resolution. No hat. No headwear. No accessories. No glasses. No distortion. No extra limbs. No text. No watermark.`,
  },
  {
    id: "cinematic-founder",
    label: "Founder Cinemático",
    desc: "Suéter neutro, smartwatch, postura introspectiva",
    icon: <Film size={16} strokeWidth={1.5} />,
    fullPrompt: `Modern cinematic editorial portrait photography used in premium personal branding and founder portraits. The person in the reference photo is the subject — preserve their face, features and appearance exactly. Sitting slightly forward with one arm resting and the other hand near the face, wearing a light neutral sweater and a modern smartwatch. Close portrait framing from chest to head with the subject centered, direct eye contact with the camera, subtle foreground depth created by the arm and hand. Soft cinematic studio lighting with a slightly directional key light creating gentle shadows and a dark gradient background. Muted neutral tones with a dark blue-gray background, warm skin tones, light clothing, and subtle dark accessories. Professional portrait photography using an 85mm lens, eye-level perspective, moderate depth of field with sharp focus on the eyes. Confident, introspective, modern and intelligent. Natural skin texture, soft fabric folds, subtle reflections on watch surface, smooth gradient background. 8k, ultra detailed, professional cinematic portrait photography.`,
  },
] as const;

type ModeloPerfilId = (typeof MODELOS_PERFIL)[number]["id"];

type ModoGeracao = "cenario" | "modelo-perfil";

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
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AutoridadeForm({
  isGeneratingImage,
  brokerConfig,
  onGenerateImage,
}: Props) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    brokerConfig.photos.length > 0 ? 0 : null
  );
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [modo, setModo] = useState<ModoGeracao>("modelo-perfil");
  const [cenario, setCenario] = useState<CenarioId>("imovel-luxo");
  const [modeloPerfil, setModeloPerfil] = useState<ModeloPerfilId>("dark-studio");
  const [customPrompt, setCustomPrompt] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [estilo, setEstilo] = useState<EstiloId>("premium-dark");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const savedPhotos = brokerConfig.photos;

  useEffect(() => {
    if (savedPhotos.length > 0 && selectedPhotoIndex === null && !tempPhoto) {
      setSelectedPhotoIndex(0);
    }
  }, [savedPhotos.length, selectedPhotoIndex, tempPhoto]);

  const activePhoto =
    tempPhoto ??
    (selectedPhotoIndex !== null ? savedPhotos[selectedPhotoIndex] : null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    try {
      const compressed = await compressImage(file);
      setTempPhoto(compressed);
      setSelectedPhotoIndex(null);
    } catch {
      setUploadError("Erro ao processar imagem. Use JPG ou PNG.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePhoto) return;

    let finalPrompt: string;

    if (modo === "modelo-perfil") {
      const modeloObj = MODELOS_PERFIL.find((m) => m.id === modeloPerfil)!;
      finalPrompt = modeloObj.fullPrompt;
      if (instrucoes.trim()) {
        finalPrompt += `\n\nAdditional instructions: ${instrucoes}`;
      }
    } else {
      const cenarioObj = CENARIOS.find((c) => c.id === cenario)!;
      const estiloObj = ESTILOS.find((s) => s.id === estilo)!;

      const sceneDescription =
        cenario === "personalizado"
          ? customPrompt
          : cenarioObj.promptBase;

      finalPrompt = `Using the person shown in the reference photo as the subject, generate a professional Instagram authority photo for a real estate broker in Brazil.

Scene: The broker is ${sceneDescription}.
Visual style: ${estiloObj.style}.
${instrucoes ? `Additional instructions: ${instrucoes}` : ""}

Requirements:
- The broker's face, features and appearance must closely match the reference photo
- Professional real estate authority aesthetic for Brazilian market
- Premium Instagram-ready composition, portrait or square format
- Cinematic professional lighting
- No text overlays or watermarks
- High-end photography quality`;
    }

    onGenerateImage(activePhoto, finalPrompt);
  };

  const canGenerate =
    !!activePhoto &&
    (modo === "modelo-perfil" ||
      (modo === "cenario" && (cenario !== "personalizado" || customPrompt.trim().length > 0)));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Section A: Photo */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted/60 font-semibold">
          1. Sua Foto de Referência
        </p>

        {savedPhotos.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted/50">Fotos salvas no seu perfil:</p>
            <div className="flex gap-2 flex-wrap">
              {savedPhotos.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setSelectedPhotoIndex(i); setTempPhoto(null); }}
                  className={cn(
                    "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                    selectedPhotoIndex === i && !tempPhoto
                      ? "border-accent shadow-[0_0_0_2px_rgba(201,151,77,0.3)]"
                      : "border-accent/20 hover:border-accent/40"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  {selectedPhotoIndex === i && !tempPhoto && (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-accent" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload new / temp photo */}
        <div className="space-y-2">
          {tempPhoto ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tempPhoto} alt="Foto temporária" className="w-12 h-12 rounded-lg object-cover border border-accent/20" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-primary font-medium">Foto carregada</p>
                <p className="text-[10px] text-muted/50">Usada apenas nesta geração</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTempPhoto(null);
                  if (savedPhotos.length > 0) setSelectedPhotoIndex(0);
                }}
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={12} className="text-muted/60" />
              </button>
            </div>
          ) : (
            <label className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed cursor-pointer transition-all duration-200",
              savedPhotos.length === 0
                ? "border-accent/40 bg-accent/5 hover:border-accent/60 hover:bg-accent/8"
                : "border-accent/20 bg-white/2 hover:border-accent/30"
            )}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Upload size={15} strokeWidth={1.5} className="text-accent/70" />
              </div>
              <div>
                <p className="text-sm text-text-primary font-medium">
                  {savedPhotos.length === 0 ? "Anexar minha foto" : "Usar outra foto"}
                </p>
                <p className="text-[10px] text-muted/50">JPG ou PNG · Compressão automática · Não é salvo</p>
              </div>
            </label>
          )}
          {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
          {savedPhotos.length === 0 && !tempPhoto && (
            <p className="text-[10px] text-muted/40">
              💡 Salve fotos no{" "}
              <a href="/perfil-corretor" className="text-accent/60 hover:text-accent underline">
                Perfil Corretor
              </a>{" "}
              para reutilizá-las sem fazer upload toda vez.
            </p>
          )}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/3 border border-accent/15">
        <button
          type="button"
          onClick={() => setModo("modelo-perfil")}
          className={cn(
            "flex-1 py-2 rounded-md text-xs font-medium transition-all duration-200",
            modo === "modelo-perfil"
              ? "bg-accent/15 text-accent border border-accent/30"
              : "text-muted/60 hover:text-muted"
          )}
        >
          Modelos de Foto de Perfil
        </button>
        <button
          type="button"
          onClick={() => setModo("cenario")}
          className={cn(
            "flex-1 py-2 rounded-md text-xs font-medium transition-all duration-200",
            modo === "cenario"
              ? "bg-accent/15 text-accent border border-accent/30"
              : "text-muted/60 hover:text-muted"
          )}
        >
          Cenário de Autoridade
        </button>
      </div>

      {/* Section B: Profile Models */}
      {modo === "modelo-perfil" && (
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/60 font-semibold">
            2. Modelo de Foto
          </p>
          <div className="space-y-2">
            {MODELOS_PERFIL.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeloPerfil(m.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-3 py-3 rounded-lg border text-left transition-all duration-200",
                  modeloPerfil === m.id
                    ? "border-accent/60 bg-accent/8"
                    : "border-accent/15 bg-white/2 hover:border-accent/30"
                )}
              >
                <span className={cn("flex-shrink-0 mt-0.5", modeloPerfil === m.id ? "text-accent" : "text-muted/40")}>
                  {m.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-semibold leading-tight", modeloPerfil === m.id ? "text-text-primary" : "text-muted/80")}>
                    {m.label}
                  </p>
                  <p className="text-[10px] text-muted/50 mt-0.5 leading-snug">{m.desc}</p>
                </div>
                {modeloPerfil === m.id && (
                  <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section B: Scenario (alt mode) */}
      {modo === "cenario" && (
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/60 font-semibold">
            2. Cenário
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CENARIOS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCenario(c.id)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all duration-200",
                  cenario === c.id
                    ? "border-accent/60 bg-accent/8 text-text-primary"
                    : "border-accent/15 bg-white/2 text-muted hover:border-accent/30 hover:text-text-primary"
                )}
              >
                <span className={cn("flex-shrink-0", cenario === c.id ? "text-accent" : "text-muted/40")}>
                  {c.icon}
                </span>
                <span className="text-xs font-medium leading-tight">{c.label}</span>
              </button>
            ))}
          </div>

          {cenario === "personalizado" && (
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Descreva o cenário em inglês ou português. Ex: standing in a luxury penthouse living room with ocean view, pointing to the view..."
              rows={3}
              className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              required={cenario === "personalizado"}
            />
          )}
        </div>
      )}

      {/* Section C: Style (only for cenario mode) */}
      {modo === "cenario" && (
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted/60 font-semibold">
            3. Estilo Visual
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ESTILOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setEstilo(s.id)}
                className={cn(
                  "flex flex-col gap-1 px-3 py-3 rounded-lg border text-left transition-all duration-200",
                  estilo === s.id
                    ? "border-accent/60 bg-accent/8"
                    : "border-accent/15 bg-white/2 hover:border-accent/30"
                )}
              >
                <span className={cn("text-xs font-medium", estilo === s.id ? "text-accent" : "text-text-primary")}>
                  {s.label}
                </span>
                <span className="text-[10px] text-muted/50 leading-tight">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section D: Extra instructions */}
      <div className="space-y-1.5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted/60 font-semibold">
          {modo === "modelo-perfil" ? "3." : "4."} Instruções Adicionais (opcional)
        </p>
        <textarea
          value={instrucoes}
          onChange={(e) => setInstrucoes(e.target.value)}
          placeholder="Ex: Use terno escuro. Expressão séria e confiante. Fundo desfocado. Não mostrar outros rostos..."
          rows={2}
          className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
        />
      </div>

      {/* Generate button */}
      <button
        type="submit"
        disabled={isGeneratingImage || !canGenerate}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isGeneratingImage || !canGenerate
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-gradient-to-r from-accent to-warm-highlight text-[#050505] hover:opacity-90"
        )}
      >
        <Sparkles size={15} strokeWidth={1.5} />
        {isGeneratingImage ? "Gerando imagem..." : !activePhoto ? "Selecione uma foto para gerar" : "Gerar Imagem de Autoridade"}
      </button>

      {!activePhoto && (
        <p className="text-center text-xs text-muted/40">
          Anexe sua foto acima para habilitar a geração
        </p>
      )}
    </form>
  );
}
