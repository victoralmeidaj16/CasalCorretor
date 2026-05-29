export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: number;
  duration: string;
  status: "concluido" | "em-andamento" | "pendente";
}

export interface Document {
  id: number;
  name: string;
  date: string;
  size: string;
  category: string;
}

export const trainingModules: TrainingModule[] = [
  {
    id: 1,
    title: "Manual do Corretor AB INVEST",
    description:
      "Guia completo com processos, padrões de atendimento e valores da marca AB INVEST para corretores associados.",
    progress: 100,
    lessons: 12,
    duration: "4h 30min",
    status: "concluido",
  },
  {
    id: 2,
    title: "Técnicas de Negociação Premium",
    description:
      "Estratégias avançadas para fechar negócios de alto valor, gestão de objeções e condução de visitas exclusivas.",
    progress: 65,
    lessons: 8,
    duration: "3h 15min",
    status: "em-andamento",
  },
  {
    id: 3,
    title: "Gestão de Clientes High Ticket",
    description:
      "CRM avançado, relacionamento com clientes de alto padrão, follow-up estratégico e fidelização de investidores.",
    progress: 20,
    lessons: 10,
    duration: "5h 00min",
    status: "em-andamento",
  },
  {
    id: 4,
    title: "Marketing Digital para Corretores",
    description:
      "Presença digital premium, gestão de redes sociais, anúncios pagos e construção de autoridade no mercado.",
    progress: 0,
    lessons: 6,
    duration: "2h 45min",
    status: "pendente",
  },
];

export const documents: Document[] = [
  {
    id: 1,
    name: "Contrato de Corretagem – Modelo Padrão",
    date: "15 Jan 2024",
    size: "245 KB",
    category: "Jurídico",
  },
  {
    id: 2,
    name: "Política de Comissões 2024",
    date: "02 Jan 2024",
    size: "128 KB",
    category: "Financeiro",
  },
  {
    id: 3,
    name: "Código de Conduta e Ética",
    date: "01 Jan 2024",
    size: "312 KB",
    category: "Institucional",
  },
  {
    id: 4,
    name: "Checklist de Visita ao Imóvel",
    date: "10 Jan 2024",
    size: "98 KB",
    category: "Operacional",
  },
  {
    id: 5,
    name: "Tabela de Imóveis – Balneário Camboriú",
    date: "20 Jan 2024",
    size: "189 KB",
    category: "Comercial",
  },
  {
    id: 6,
    name: "Modelo de Proposta de Compra",
    date: "05 Jan 2024",
    size: "210 KB",
    category: "Jurídico",
  },
];
