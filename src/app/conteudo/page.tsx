"use client";

import { useState, useEffect, useRef } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { CONTENT_MOCKS, ContentType, GeneratedContent } from "@/data/content-mocks";
import { BrokerConfig, DEFAULT_BROKER_CONFIG, BROKER_PRESETS } from "@/data/broker-presets";
import { getInitialBrokerConfig } from "@/lib/broker-config";
import { ShowcaseImovelForm } from "@/components/content-forms/showcase-imovel-form";
import { ImovelSemanaForm } from "@/components/content-forms/imovel-semana-form";
import { CarouselBairroForm } from "@/components/content-forms/carousel-bairro-form";
import { InfograficoMercadoForm } from "@/components/content-forms/infografico-mercado-form";
import { DepoimentoClienteForm } from "@/components/content-forms/depoimento-cliente-form";
import { CalculadoraVisualForm } from "@/components/content-forms/calculadora-visual-form";
import { QuizPerfilForm } from "@/components/content-forms/quiz-perfil-form";
import { MapaBairrosForm } from "@/components/content-forms/mapa-bairros-form";
import { VendidoForm } from "@/components/content-forms/vendido-form";
import { HashtagsForm } from "@/components/content-forms/hashtags-form";
import { AutoridadeForm } from "@/components/content-forms/autoridade-form";
import { AnuncioPremiumForm } from "@/components/content-forms/anuncio-premium-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Home,
  Star,
  MapPin,
  BarChart3,
  MessageSquare,
  Calculator,
  HelpCircle,
  Map,
  Wand2,
  Copy,
  Check,
  Loader2,
  Settings,
  ChevronRight,
  Key,
  Hash,
  ImageIcon,
  Download,
  Sparkles,
  AlertCircle,
  Pencil,
  UserCheck,
  Megaphone,
} from "lucide-react";

const TABS: { id: ContentType; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  { id: "showcase-imovel", label: "Showcase de Imóvel", shortLabel: "Showcase", icon: <Home size={14} strokeWidth={1.5} /> },
  { id: "anuncio-premium", label: "Anúncio Premium", shortLabel: "Anúncio Premium", icon: <Megaphone size={14} strokeWidth={1.5} /> },
  { id: "imovel-semana", label: "Imóvel da Semana", shortLabel: "Semana", icon: <Star size={14} strokeWidth={1.5} /> },
  { id: "carousel-bairro", label: "Carousel de Bairro", shortLabel: "Bairro", icon: <MapPin size={14} strokeWidth={1.5} /> },
  { id: "infografico-mercado", label: "Infográfico de Mercado", shortLabel: "Mercado", icon: <BarChart3 size={14} strokeWidth={1.5} /> },
  { id: "depoimento-cliente", label: "Depoimento de Cliente", shortLabel: "Depoimento", icon: <MessageSquare size={14} strokeWidth={1.5} /> },
  { id: "calculadora-visual", label: "Calculadora Visual", shortLabel: "Calculadora", icon: <Calculator size={14} strokeWidth={1.5} /> },
  { id: "quiz-perfil", label: "Quiz de Perfil", shortLabel: "Quiz", icon: <HelpCircle size={14} strokeWidth={1.5} /> },
  { id: "mapa-bairros", label: "Mapa de Bairros", shortLabel: "Mapa", icon: <Map size={14} strokeWidth={1.5} /> },
  { id: "vendido", label: "Post Vendido!", shortLabel: "Vendido!", icon: <Key size={14} strokeWidth={1.5} /> },
  { id: "hashtags", label: "Banco de Hashtags", shortLabel: "Hashtags", icon: <Hash size={14} strokeWidth={1.5} /> },
  { id: "autoridade-pessoal", label: "Autoridade Pessoal", shortLabel: "Autoridade", icon: <UserCheck size={14} strokeWidth={1.5} /> },
];

// Build image prompt based on content type and generated text
function buildImagePrompt(
  contentType: ContentType,
  generatedContent: string,
  customPrompt: string,
  formData?: Record<string, unknown>
): string {
  if (customPrompt.trim()) return customPrompt;

  if (contentType === "anuncio-premium") {
    const fd = formData || {};
    const construtora = (fd.construtora as string) || "AB INVEST";
    const fraseTop = (fd.fraseTop as string) || "CONSTRUTORA DE ALTO PADRÃO";
    const frase2 = (fd.frase2 as string) || "SEU NOVO LAR DE LUXO";
    const frase3 = (fd.frase3 as string) || "OBRA EXCLUSIVA FRENTE AO MAR";
    const frase4 = (fd.frase4 as string) || "Viva a experiência única de morar no melhor endereço da cidade com acabamentos italianos e automação total.";
    const telefone = (fd.telefone as string) || "+91-8088 900 660";
    const website = (fd.website as string) || "www.abinvest.com";
    const incluirCorretor = fd.incluirCorretor as boolean;

    const brokerIntegrationPrompt = incluirCorretor
      ? `
BROKER PORTRAIT INTEGRATION:
• On the right side of the layout, seamlessly integrate a professional, premium, high-quality photograph of the real estate broker shown in the reference photo.
• The broker should be standing confidently, wearing elegant, high-end business attire (such as a tailored blazer or premium suit).
• The background of the broker should blend organically with the modern architectural visualization.
• Maintain exact facial features, skin tone, hair, and appearance of the person in the reference photo.
`
      : "";

    return `Create a premium social media advertisement for a luxury modern apartment construction company called ${construtora}.

STYLE:
Ultra-realistic architectural visualization mixed with high-end real estate social media branding.
The design should feel clean, corporate, premium, aspirational, and visually polished.

FORMAT:
• centered composition
• minimalist but luxurious
• strong hierarchy
• cinematic lighting
• ultra detailed

BACKGROUND:
A soft light-blue sky gradient background with subtle realistic white clouds.
Bright daytime atmosphere.
Very clean and airy.

MAIN ELEMENT:
A stunning modern luxury apartment centered in the composition.

Apartment STYLE:
• contemporary architecture
• large floor-to-ceiling glass windows
• white concrete structure
• warm wooden panels
• black metal framing
• minimalist landscaping
• floating roof design
• elegant balcony
• realistic reflections on glass
• architectural visualization quality
• highly detailed exterior render
• soft shadows
• realistic sunlight

The Apartment should appear slightly elevated and isolated like a premium 3D render showcase.

TREES & LANDSCAPING:
Add realistic decorative trees behind and around the Apartment.
Use warm sunlight hitting the trees.
Minimal modern landscaping with bushes and small plants.
${brokerIntegrationPrompt}
TOP SECTION:
At the top center, place a white rounded rectangle logo container with the text:
"${fraseTop}"

Use a modern sans-serif corporate logo style.
Dark navy + blue typography.

MIDDLE CARD:
Behind the house, place a dark navy-blue rectangular panel/card.

Inside the panel:

LEFT SIDE:
Large bold white typography:
"${frase2}"

Below:
"${frase3}"

RIGHT SIDE:
Smaller corporate paragraph text:
"${frase4}"

Add a thin vertical divider line between the left and right text blocks.

BOTTOM CTA BAR:
Create a full-width dark navy-blue footer bar.

Inside the footer:

LEFT:
white phone icon
text:
“FALE CONOSCO: ${telefone}”

CENTER:
large white rounded button
text:
“LIGUE AGORA”

RIGHT:
white globe/web icon
text:
“PARA MAIS INFORMAÇÕES ACESSE ${website}”

DESIGN LANGUAGE:
• premium real estate branding
• modern luxury construction ad
• corporate architectural marketing
• clean composition
• realistic rendering
• soft cinematic shadows
• glossy surfaces
• high-end brochure aesthetic
• elegant typography
• premium social media ad
• Behance-quality presentation

LIGHTING:
• soft daylight
• architectural render lighting
• subtle ambient occlusion
• realistic reflections
• slightly cinematic

COLOR PALETTE:
• deep navy blue
• sky blue
• white
• warm wood brown
• charcoal gray
• soft green landscaping

QUALITY:
ultra detailed, hyper realistic, octane render, unreal engine quality, architectural digest style, premium real estate advertisement, 8k`;
  }

  const snippets: Record<Exclude<ContentType, "anuncio-premium">, string> = {
    "showcase-imovel": "Premium luxury real estate Instagram post. Dramatic architectural photography, dark moody atmosphere, golden hour lighting. High-end apartment or house exterior/interior. No text overlay.",
    "imovel-semana": "Weekly featured property Instagram visual. Elegant real estate photography. Premium residential building with stunning view. Dark dramatic sky, warm golden tones.",
    "carousel-bairro": "Premium neighborhood lifestyle Instagram visual. Aerial city view or upscale street. Warm golden tones, urban luxury, sophisticated atmosphere.",
    "infografico-mercado": "Clean premium financial infographic visual for Instagram. Dark background with gold accent lines. Abstract chart elements, sophisticated minimalist design.",
    "depoimento-cliente": "Emotional moment of a couple receiving house keys from a real estate agent. Warm, genuine smile, premium modern apartment building entrance, golden hour.",
    "calculadora-visual": "Premium financial comparison visual. Abstract gold coins vs real estate building graphic. Sophisticated dark background, clean modern design for Instagram.",
    "quiz-perfil": "Premium Instagram quiz carousel cover. Abstract luxury lifestyle collage: modern apartment, couple, city view, investment chart. Dark moody aesthetic, gold accents.",
    "mapa-bairros": "Luxury neighborhood map aesthetic. Premium aerial city view with golden overlay. Sophisticated cartographic art for Instagram. Dark background, gold city grid lines.",
    "vendido": "Real estate agent handing keys to happy client. Premium luxury apartment building entrance. Champagne toast moment. Warm golden tones, genuine emotion, celebration.",
    "hashtags": "Premium Instagram content creation workspace. Luxury real estate photography flat lay. Dark minimal desk, gold accents, modern smartphone showing property post.",
    "autoridade-pessoal": "",
  };

  const base = snippets[contentType as Exclude<ContentType, "anuncio-premium">] ?? snippets["showcase-imovel"];
  const contextHint = generatedContent.slice(0, 200).replace(/[#\n]/g, " ").trim();
  return `${base} Context: ${contextHint}`;
}

export default function ConteudoPage() {
  const [activeTab, setActiveTab] = useState<ContentType>("showcase-imovel");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [brokerConfig, setBrokerConfig] = useState<BrokerConfig>(DEFAULT_BROKER_CONFIG);
  const [copied, setCopied] = useState(false);

  // Image generation state
  const [imagePrompt, setImagePrompt] = useState("");
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [imageError, setImageError] = useState("");
  const imageRef = useRef<HTMLAnchorElement>(null);

  // Stored last formData for re-use in image generation
  const lastFormDataRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    getInitialBrokerConfig()
      .then(setBrokerConfig)
      .catch(() => setBrokerConfig(DEFAULT_BROKER_CONFIG));
  }, []);

  // Reset image when tab changes
  useEffect(() => {
    setGeneratedImage(null);
    setImageError("");
    setImagePrompt("");
    setEditingPrompt(false);
  }, [activeTab]);

  const handleGenerate = async (formData: Record<string, unknown>, prompt: string) => {
    setIsLoading(true);
    setResult(null);
    setGeneratedImage(null);
    setImageError("");
    lastFormDataRef.current = formData;

    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: activeTab,
          formData,
          brokerPhotos: brokerConfig.photos,
          systemPrompt: [brokerConfig.systemPromptOverride, brokerConfig.photoUsageInstructions]
            .filter(Boolean).join("\n"),
          brokerPresetId: brokerConfig.selectedPresetId,
          prompt,
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = (await res.json()) as GeneratedContent;
      setResult(data);
    } catch {
      setResult(CONTENT_MOCKS[activeTab]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async (overridePhoto?: string, overridePrompt?: string) => {
    if (activeTab !== "autoridade-pessoal" && !result) return;
    setIsGeneratingImage(true);
    setImageError("");
    setGeneratedImage(null);

    const finalPrompt = overridePrompt ?? (imagePrompt.trim() || buildImagePrompt(activeTab, result?.content ?? "", "", lastFormDataRef.current));
    const photos = overridePhoto ? [overridePhoto] : brokerConfig.photos;

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          brokerPhotos: photos,
          systemPrompt: brokerConfig.photoUsageInstructions,
        }),
      });

      const data = await res.json();

      if (data.error || data.mock) {
        setImageError(
          data.error === "GOOGLE_AI_API_KEY não configurada"
            ? "Configure GOOGLE_AI_API_KEY no .env.local para gerar imagens reais."
            : `Erro: ${data.error ?? "Tente novamente"}`
        );
      } else if (data.imageData) {
        setGeneratedImage({ data: data.imageData, mimeType: data.mimeType ?? "image/png" });
      }
    } catch {
      setImageError("Erro ao gerar imagem. Verifique sua conexão e a API key.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = `data:${generatedImage.mimeType};base64,${generatedImage.data}`;
    link.download = `post-${activeTab}-${Date.now()}.${generatedImage.mimeType.split("/")[1] ?? "png"}`;
    link.click();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const selectedPreset = BROKER_PRESETS.find((p) => p.id === brokerConfig.selectedPresetId);
  const hasBrokerPhotos = brokerConfig.photos.length > 0;

  const currentPrompt = imagePrompt || (result ? buildImagePrompt(activeTab, result.content, "", lastFormDataRef.current) : "");

  const FormComponent = () => {
    const commonProps = { onGenerate: handleGenerate, isLoading, hasBrokerPhotos };
    switch (activeTab) {
      case "showcase-imovel": return <ShowcaseImovelForm {...commonProps} />;
      case "imovel-semana": return <ImovelSemanaForm {...commonProps} />;
      case "carousel-bairro": return <CarouselBairroForm {...commonProps} />;
      case "infografico-mercado": return <InfograficoMercadoForm {...commonProps} />;
      case "depoimento-cliente": return <DepoimentoClienteForm {...commonProps} />;
      case "calculadora-visual": return <CalculadoraVisualForm {...commonProps} />;
      case "quiz-perfil": return <QuizPerfilForm {...commonProps} />;
      case "mapa-bairros": return <MapaBairrosForm {...commonProps} />;
      case "vendido": return <VendidoForm {...commonProps} />;
      case "hashtags": return <HashtagsForm {...commonProps} />;
      case "autoridade-pessoal": return (
        <AutoridadeForm
          {...commonProps}
          brokerConfig={brokerConfig}
          onGenerateImage={handleGenerateImage}
          isGeneratingImage={isGeneratingImage}
        />
      );
      case "anuncio-premium": return <AnuncioPremiumForm {...commonProps} />;
    }
  };

  return (
    <AuthLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium">
              Criação de Conteúdo
            </p>
            <Link
              href="/perfil-corretor"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/15 hover:border-accent/30 transition-all duration-200 group"
            >
              {selectedPreset ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-xs text-muted/70 group-hover:text-text-primary transition-colors">
                    {selectedPreset.name}
                  </span>
                  {hasBrokerPhotos && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                      {brokerConfig.photos.length} foto{brokerConfig.photos.length > 1 ? "s" : ""}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Settings size={12} strokeWidth={1.5} className="text-muted/50" />
                  <span className="text-xs text-muted/50 group-hover:text-text-primary transition-colors">
                    Configurar perfil
                  </span>
                  <ChevronRight size={11} className="text-muted/30" />
                </>
              )}
            </Link>
          </div>

          <h1
            className="text-3xl font-light text-text-primary mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Hub de Conteúdo
          </h1>
          <p className="text-sm text-muted/70">
            Gere texto e imagens profissionais para Instagram com IA e sua identidade de marca.
          </p>
          <div className="h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent mt-5" />
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setResult(null); }}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                activeTab === tab.id
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "text-muted/60 hover:text-text-primary hover:bg-white/3 border border-transparent"
              )}
            >
              {tab.icon}
              <span>{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Main area */}
        <div className="flex gap-6">
          {/* Form panel */}
          <div className="flex-[3] min-w-0">
            <div className="bg-secondary border border-accent/15 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  {TABS.find((t) => t.id === activeTab)?.icon}
                </div>
                <h2
                  className="text-base font-medium text-text-primary"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {TABS.find((t) => t.id === activeTab)?.label}
                </h2>
              </div>
              <FormComponent />
            </div>
          </div>

          {/* Output + Image panel */}
          <div className="flex-[2] min-w-0 space-y-4">

            {/* Text output */}
            <div className="sticky top-8 bg-secondary border border-accent/15 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-accent/10">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted/60 font-medium">
                  Conteúdo Gerado
                </p>
                {result && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/8 text-accent text-xs hover:bg-accent/15 transition-colors border border-accent/20"
                  >
                    {copied ? <Check size={11} strokeWidth={2} /> : <Copy size={11} strokeWidth={1.5} />}
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                )}
              </div>

              <div className="p-5">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <Loader2 size={22} strokeWidth={1.5} className="text-accent animate-spin" />
                    <p className="text-sm text-muted/60">Gerando conteúdo...</p>
                  </div>
                )}

                {!isLoading && !result && (
                  <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-accent/8 border border-accent/20 flex items-center justify-center">
                      <Wand2 size={18} strokeWidth={1.5} className="text-accent/50" />
                    </div>
                    <p className="text-xs text-muted/50">Preencha o formulário e clique em Gerar.</p>
                  </div>
                )}

                {!isLoading && result && (
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-accent/10 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-thin">
                      <pre className="text-xs text-text-primary/90 leading-relaxed whitespace-pre-wrap font-sans">
                        {result.content}
                      </pre>
                    </div>

                    {result.suggestions.length > 0 && (
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-medium mb-2">
                          Dicas de Publicação
                        </p>
                        <ul className="space-y-1.5">
                          {result.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted/70">
                              <span className="text-accent mt-0.5 flex-shrink-0">·</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Image generation panel — shown after text generated, or always for autoridade tab */}
            {(result || activeTab === "autoridade-pessoal") && (
              <div className="bg-secondary border border-accent/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-accent/10">
                  <ImageIcon size={14} strokeWidth={1.5} className="text-accent/70" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted/60 font-medium flex-1">
                    Gerar Imagem Visual
                  </p>
                  {hasBrokerPhotos && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                      Com sua foto
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  {/* For autoridade tab: the form handles generation, panel only shows result */}
                  {activeTab !== "autoridade-pessoal" && (
                    <>
                      {/* Image prompt */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/60 font-medium">
                            Prompt de Imagem
                          </label>
                          <button
                            type="button"
                            onClick={() => { setEditingPrompt(!editingPrompt); if (!imagePrompt) setImagePrompt(currentPrompt); }}
                            className="flex items-center gap-1 text-[10px] text-accent/60 hover:text-accent transition-colors"
                          >
                            <Pencil size={10} strokeWidth={1.5} />
                            {editingPrompt ? "Fechar" : "Editar"}
                          </button>
                        </div>

                        {editingPrompt ? (
                          <textarea
                            value={imagePrompt || currentPrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            rows={4}
                            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-xs text-text-primary/80 focus:outline-none focus:border-accent/50 transition-colors resize-none leading-relaxed"
                          />
                        ) : (
                          <p className="text-xs text-muted/50 leading-relaxed bg-white/2 border border-accent/10 rounded-lg p-3 line-clamp-3">
                            {currentPrompt}
                          </p>
                        )}
                      </div>

                      {/* Generate button */}
                      <button
                        type="button"
                        onClick={() => handleGenerateImage()}
                        disabled={isGeneratingImage}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
                          isGeneratingImage
                            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
                            : "bg-gradient-to-r from-accent to-warm-highlight text-[#050505] hover:opacity-90"
                        )}
                      >
                        {isGeneratingImage
                          ? <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" /> Gerando imagem...</>
                          : <><Sparkles size={14} strokeWidth={1.5} /> Gerar Imagem com Gemini</>
                        }
                      </button>
                    </>
                  )}

                  {/* Autoridade tab: waiting state */}
                  {activeTab === "autoridade-pessoal" && !generatedImage && !isGeneratingImage && !imageError && (
                    <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/8 border border-accent/20 flex items-center justify-center">
                        <UserCheck size={18} strokeWidth={1.5} className="text-accent/50" />
                      </div>
                      <p className="text-xs text-muted/50">Configure o cenário e clique em Gerar no formulário ao lado.</p>
                    </div>
                  )}

                  {/* Loading state for autoridade */}
                  {activeTab === "autoridade-pessoal" && isGeneratingImage && (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <Loader2 size={22} strokeWidth={1.5} className="text-accent animate-spin" />
                      <p className="text-sm text-muted/60">Gerando sua imagem de autoridade...</p>
                      <p className="text-xs text-muted/40">O Gemini está processando sua foto</p>
                    </div>
                  )}

                  {/* Error */}
                  {imageError && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/30 border border-red-900/40">
                      <AlertCircle size={13} strokeWidth={1.5} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-400/90">{imageError}</p>
                    </div>
                  )}

                  {/* Generated image */}
                  {generatedImage && (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`data:${generatedImage.mimeType};base64,${generatedImage.data}`}
                        alt="Imagem gerada"
                        className="w-full rounded-lg border border-accent/20 object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleDownloadImage}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium border border-accent/30 text-accent hover:bg-accent/8 transition-colors"
                      >
                        <Download size={13} strokeWidth={1.5} />
                        Baixar Imagem
                      </button>
                      <a ref={imageRef} className="hidden" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
