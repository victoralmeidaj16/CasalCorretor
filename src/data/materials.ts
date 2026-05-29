export interface Material {
  id: number;
  title: string;
  type: "arte" | "video" | "apresentacao";
  subtitle?: string;
  duration?: string;
  size?: string;
  gradient: string;
}

export const materials: Material[] = [
  // Artes
  {
    id: 1,
    title: "Banner Residencial Vista Mar",
    type: "arte",
    subtitle: "1080 × 1080px",
    size: "2.4 MB",
    gradient: "from-[#1a0e05] to-[#050505]",
  },
  {
    id: 2,
    title: "Post Instagram – Lançamento",
    type: "arte",
    subtitle: "1080 × 1350px",
    size: "1.8 MB",
    gradient: "from-[#05100a] to-[#050505]",
  },
  {
    id: 3,
    title: "Story Exclusividade AB INVEST",
    type: "arte",
    subtitle: "1080 × 1920px",
    size: "3.1 MB",
    gradient: "from-[#0a0510] to-[#050505]",
  },
  {
    id: 4,
    title: "Card Imóvel Destaque – Verão",
    type: "arte",
    subtitle: "1200 × 628px",
    size: "1.5 MB",
    gradient: "from-[#100a05] to-[#050505]",
  },
  {
    id: 5,
    title: "Identidade Visual Corretor",
    type: "arte",
    subtitle: "Pack completo",
    size: "12 MB",
    gradient: "from-[#0a1005] to-[#050505]",
  },
  {
    id: 6,
    title: "Assinatura de E-mail Premium",
    type: "arte",
    subtitle: "HTML + PNG",
    size: "0.8 MB",
    gradient: "from-[#100505] to-[#050505]",
  },
  {
    id: 7,
    title: "Banner Fachada – Temporada",
    type: "arte",
    subtitle: "3000 × 1200px",
    size: "5.6 MB",
    gradient: "from-[#05100a] to-[#050505]",
  },
  {
    id: 8,
    title: "Cartão de Visita Premium",
    type: "arte",
    subtitle: "Print-ready PDF",
    size: "4.2 MB",
    gradient: "from-[#0a0a10] to-[#050505]",
  },
  // Vídeos
  {
    id: 9,
    title: "Tour Virtual – Vista Mar Infinito",
    type: "video",
    duration: "3:42",
    gradient: "from-[#1a0e05] to-[#050505]",
  },
  {
    id: 10,
    title: "Apresentação AB INVEST 2024",
    type: "video",
    duration: "5:18",
    gradient: "from-[#05100a] to-[#050505]",
  },
  {
    id: 11,
    title: "Depoimento Cliente High Ticket",
    type: "video",
    duration: "2:05",
    gradient: "from-[#0a0510] to-[#050505]",
  },
  {
    id: 12,
    title: "Reels – Balneário Camboriú",
    type: "video",
    duration: "0:58",
    gradient: "from-[#100a05] to-[#050505]",
  },
  // Apresentações
  {
    id: 13,
    title: "Proposta Comercial Premium",
    type: "apresentacao",
    subtitle: "PDF • 24 slides",
    size: "8.3 MB",
    gradient: "from-[#1a0e05] to-[#050505]",
  },
  {
    id: 14,
    title: "Portfolio AB INVEST 2024",
    type: "apresentacao",
    subtitle: "PDF • 48 slides",
    size: "22 MB",
    gradient: "from-[#05100a] to-[#050505]",
  },
  {
    id: 15,
    title: "Relatório de Mercado – SC",
    type: "apresentacao",
    subtitle: "PDF • 16 slides",
    size: "6.1 MB",
    gradient: "from-[#0a0510] to-[#050505]",
  },
  {
    id: 16,
    title: "Guia do Investidor Imobiliário",
    type: "apresentacao",
    subtitle: "PDF • 32 slides",
    size: "11 MB",
    gradient: "from-[#100a05] to-[#050505]",
  },
];
