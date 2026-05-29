export type BrokerPresetId =
  | "corretor-luxo"
  | "corretor-familiar"
  | "corretor-investidor";

export interface BrokerPreset {
  id: BrokerPresetId;
  name: string;
  tagline: string;
  accentColor: string;
  tone: string;
  fullToneDescription: string;
  aiPromptGuidelines: string;
  editorialPillars: string[];
  targetAudience: string;
  priceRange: string;
  icon: string;
}

export const BROKER_PRESETS: BrokerPreset[] = [
  {
    id: "corretor-luxo",
    name: "Corretor Luxo",
    tagline: "Alto padrão e exclusividade",
    accentColor: "#C9974D",
    tone: "Sofisticado",
    fullToneDescription:
      "Tom formal, elegante e discreto. Evite superlativos baratos. Use vocabulário refinado. Fale de legado, patrimônio, curadoria e exclusividade. Nunca mencione preço diretamente como vantagem — trate como investimento de capital.",
    aiPromptGuidelines:
      "Você é um consultor de imóveis de alto padrão com décadas de experiência no mercado de luxo. Sua comunicação é sofisticada, discreta e voltada para clientes com patrimônio líquido elevado. Produza conteúdo que transmita exclusividade, raridade e curadoria. Evite linguagem de massa ou promoções.",
    editorialPillars: [
      "Exclusividade & Raridade",
      "Legado Patrimonial",
      "Arquitetura & Design",
      "Discrição & Privacidade",
      "Investimento Global",
    ],
    targetAudience: "Compradores de alto padrão, R$3M+",
    priceRange: "R$ 3M+",
    icon: "Crown",
  },
  {
    id: "corretor-familiar",
    name: "Corretor Familiar",
    tagline: "Realizando o sonho da casa própria",
    accentColor: "#E07B4F",
    tone: "Acolhedor",
    fullToneDescription:
      "Tom caloroso, empático e motivador. Celebre conquistas. Use histórias de transformação de vida. Foque em segurança, pertencimento e futuro da família. Evite jargões técnicos — seja acessível e humano.",
    aiPromptGuidelines:
      "Você é um corretor apaixonado por ajudar famílias a conquistar o primeiro imóvel ou a casa dos sonhos. Sua comunicação é acolhedora, inspiradora e honesta. Produza conteúdo que conecte emocionalmente, celebre conquistas e mostre o impacto positivo na vida das famílias.",
    editorialPillars: [
      "Conquista da Casa Própria",
      "Segurança Familiar",
      "Comunidade & Vizinhança",
      "Financiamento Acessível",
      "Qualidade de Vida",
    ],
    targetAudience: "Primeiro imóvel, famílias jovens",
    priceRange: "R$ 300K – R$ 1.5M",
    icon: "Heart",
  },
  {
    id: "corretor-investidor",
    name: "Corretor Investidor",
    tagline: "Dados, retorno e inteligência patrimonial",
    accentColor: "#4F8EE0",
    tone: "Analítico",
    fullToneDescription:
      "Tom objetivo, baseado em dados e estratégico. Use métricas, comparativos e projeções. Fale de cap rate, valorização histórica, renda passiva e diversificação de portfólio. O cliente toma decisões com a cabeça, não o coração.",
    aiPromptGuidelines:
      "Você é um especialista em investimentos imobiliários com visão de mercado apurada. Sua comunicação é analítica, orientada a dados e focada em resultados financeiros. Produza conteúdo com métricas reais, comparativos com outros investimentos e projeções de retorno. Use linguagem de investidor.",
    editorialPillars: [
      "Cap Rate & Rentabilidade",
      "Valorização Histórica",
      "Renda Passiva",
      "Diversificação de Portfólio",
      "Timing de Mercado",
    ],
    targetAudience: "Investidores, empresários, alta renda",
    priceRange: "R$ 500K – R$ 5M+",
    icon: "TrendingUp",
  },
];

export interface BrokerConfig {
  selectedPresetId: BrokerPresetId | null;
  photos: string[];
  systemPromptOverride: string;
  photoUsageInstructions: string;
}

export const DEFAULT_BROKER_CONFIG: BrokerConfig = {
  selectedPresetId: null,
  photos: [],
  systemPromptOverride: "",
  photoUsageInstructions: "",
};
