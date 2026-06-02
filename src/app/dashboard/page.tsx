import Image from "next/image";
import { Building2, FolderOpen, BookOpen, Bell, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { PropertyCard } from "@/components/property-card";
import { MaterialCard } from "@/components/material-card";
import { properties } from "@/data/properties";
import { materials } from "@/data/materials";

const announcements = [
  {
    id: 1,
    title: "Novo lançamento: Residencial Costa Esmeralda",
    body: "Temos o prazer de anunciar o lançamento exclusivo do Residencial Costa Esmeralda em Porto Belo. Materiais de vendas disponíveis na área de Materiais.",
    date: "20 Jan 2024",
    tag: "LANÇAMENTO",
  },
  {
    id: 2,
    title: "Reunião de equipe – 25 de Janeiro",
    body: "Reunião mensal obrigatória para corretores associados. Local: Sede AB INVEST, Balneário Camboriú. Confirmem presença até 22/01.",
    date: "18 Jan 2024",
    tag: "EVENTO",
  },
];

export default function DashboardPage() {
  const featuredProperties = properties.slice(0, 3);
  const recentMaterials = materials.filter((m) => m.type === "arte").slice(0, 4);

  return (
    <div>
      {/* Photo Hero */}
      <div className="relative h-[480px] overflow-hidden">
        <Image
          src="/MuriloEariHero.png"
          alt="Murilo e Ariane — AB Invest Group"
          fill
          className="object-cover object-top -translate-y-[10%] scale-[1.0]"
          priority
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070707] to-transparent" />

        {/* Gold vertical line */}
        <div className="absolute left-12 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#C9974D]/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-14 py-10">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <p className="text-[9px] font-semibold tracking-[0.4em] text-[#C9974D]/60 uppercase">
              Área do Corretor &nbsp;/&nbsp; AB INVEST
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase">
                Sexta-feira, 19 Jan 2024
              </span>
              <div className="w-px h-3 bg-accent/20 mx-1" />
              <div className="w-7 h-7 rounded-full bg-[#111] border border-accent/20 flex items-center justify-center hover:border-accent/50 transition-colors cursor-pointer">
                <Bell size={12} strokeWidth={1.5} className="text-muted" />
              </div>
            </div>
          </div>

          <div />

          {/* Bottom horizontal gold line */}
          <div className="h-px bg-gradient-to-r from-[#C9974D]/40 via-[#C9974D]/10 to-transparent max-w-xs" />
        </div>
      </div>

      {/* Welcome strip */}
      <div className="relative border-b border-accent/10 bg-[#070707]">
        <div className="px-14 py-8 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.35em] text-[#C9974D] uppercase mb-2">
              Bem-vindo de volta
            </p>
            <h2
              className="text-4xl font-light text-[#F4F1EC] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Victor Almeida
            </h2>
            <p className="text-[10px] text-muted/40 font-light tracking-widest uppercase mt-1.5">
              Corretor Associado &nbsp;·&nbsp; Plano Elite
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-2xl font-light text-[#C9974D]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>12</p>
              <p className="text-[9px] tracking-[0.25em] text-muted/40 uppercase mt-0.5">Imóveis</p>
            </div>
            <div className="w-px h-8 bg-accent/15" />
            <div className="text-right">
              <p className="text-2xl font-light text-[#C9974D]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>R$ 2.4M</p>
              <p className="text-[9px] tracking-[0.25em] text-muted/40 uppercase mt-0.5">VGV Este Mês</p>
            </div>
            <div className="w-px h-8 bg-accent/15" />
            <div className="text-right">
              <p className="text-2xl font-light text-[#C9974D]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>3</p>
              <p className="text-[9px] tracking-[0.25em] text-muted/40 uppercase mt-0.5">Treinamentos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-10">
      {/* About AB Invest */}
      <section className="mb-10 border-y border-accent/10 bg-[#0b0b0b] px-8 py-8">
        <div className="max-w-5xl">
          <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/70 uppercase mb-2">
            Institucional
          </p>
          <h2
            className="text-3xl font-light text-text-primary mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Sobre a AB Invest
          </h2>
          <div className="grid gap-4 text-sm font-light leading-7 text-muted/75 md:grid-cols-2">
            <p>
              Foi assim que ficamos conhecidos no mercado imobiliário. Dois profissionais que decidiram unir propósito, conhecimento e profissionalismo para transformar vidas através do mercado imobiliário.
            </p>
            <p>
              Sempre acreditamos que resultado sustentável nasce da ética, do estudo constante e da dedicação em entregar segurança para cada cliente e investidor.
            </p>
            <p>
              Ao longo da trajetória, criamos a AB INVEST GROUP, um ecossistema de negócios imobiliários especializado em alavancagem patrimonial através do mercado imobiliário, conectando investidores de mais de 6 países às oportunidades mais estratégicas de Itapema e Porto Belo, dois dos mercados imobiliários mais valorizados do Brasil.
            </p>
            <p>
              Mais do que negociações milionárias, construímos confiança, autoridade e um legado que continua crescendo todos os dias.
            </p>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <div className="flex gap-5 mb-10">
        <StatCard
          icon={Building2}
          label="Imóveis Disponíveis"
          value="12"
          subtitle="Portfólio exclusivo AB INVEST"
        />
        <StatCard
          icon={FolderOpen}
          label="Novos Materiais"
          value="8"
          subtitle="Adicionados esta semana"
        />
        <StatCard
          icon={BookOpen}
          label="Treinamentos Pendentes"
          value="3"
          subtitle="Continue sua formação"
        />
        <StatCard
          icon={TrendingUp}
          label="VGV Este Mês"
          value="R$ 2.4M"
          subtitle="Meta: R$ 5M"
        />
      </div>

      {/* Featured Properties */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/70 uppercase mb-1">
              Portfólio
            </p>
            <h2
              className="text-2xl font-light text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Imóveis em Destaque
            </h2>
          </div>
          <a
            href="/imoveis"
            className="text-[10px] font-semibold tracking-[0.2em] text-accent/70 hover:text-accent uppercase border-b border-accent/30 pb-0.5 transition-colors duration-200"
          >
            Ver todos
          </a>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-thin">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} compact />
          ))}
        </div>
      </section>

      {/* Latest Materials */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/70 uppercase mb-1">
              Marketing
            </p>
            <h2
              className="text-2xl font-light text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Últimos Materiais
            </h2>
          </div>
          <a
            href="/materiais"
            className="text-[10px] font-semibold tracking-[0.2em] text-accent/70 hover:text-accent uppercase border-b border-accent/30 pb-0.5 transition-colors duration-200"
          >
            Ver todos
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recentMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section>
        <div className="mb-5">
          <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/70 uppercase mb-1">
            Comunicados
          </p>
          <h2
            className="text-2xl font-light text-text-primary"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Avisos
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-secondary border border-accent/20 rounded-xl p-6 card-gold-hover"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-[9px] font-bold tracking-[0.2em] text-primary bg-accent px-2 py-1 rounded flex-shrink-0">
                  {ann.tag}
                </span>
                <span className="text-[10px] text-muted/50 font-light mt-0.5">{ann.date}</span>
              </div>
              <h3
                className="text-base font-normal text-text-primary mb-2 leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {ann.title}
              </h3>
              <p className="text-xs text-muted/60 font-light leading-relaxed">{ann.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}
