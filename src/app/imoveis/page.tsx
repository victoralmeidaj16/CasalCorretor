import { AuthLayout } from "@/components/auth-layout";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/data/properties";
import { SlidersHorizontal, Search } from "lucide-react";

export default function ImoveisPage() {
  return (
    <AuthLayout>
      <div className="px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-accent uppercase mb-2">
            Portfólio Exclusivo
          </p>
          <h1
            className="text-4xl font-light text-text-primary leading-none mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Imóveis Disponíveis
          </h1>
          <p className="text-xs text-muted font-light tracking-wider">
            {properties.length} imóveis no portfólio AB INVEST
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 flex-1 max-w-xs">
            <Search size={14} strokeWidth={1.5} className="text-muted/50" />
            <input
              type="text"
              placeholder="Buscar imóvel..."
              className="bg-transparent text-sm text-text-primary placeholder-muted/30 font-light flex-1 outline-none"
            />
          </div>

          <select className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors">
            <option value="">Tipo</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
          </select>

          <select className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors">
            <option value="">Localização</option>
            <option value="bc">Balneário Camboriú</option>
            <option value="pb">Porto Belo</option>
            <option value="fl">Florianópolis</option>
          </select>

          <select className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors">
            <option value="">Valor</option>
            <option value="1">Até R$ 2M</option>
            <option value="2">R$ 2M – R$ 6M</option>
            <option value="3">Acima de R$ 6M</option>
          </select>

          <button className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors duration-200">
            <SlidersHorizontal size={13} strokeWidth={1.5} />
            Filtros
          </button>
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-3 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
