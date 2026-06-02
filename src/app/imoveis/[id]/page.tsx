"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth-layout";
import { properties as defaultProperties, Property } from "@/data/properties";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { ArrowLeft, ChevronRight, MapPin, Maximize2, BedDouble, Bath, Waves, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";
  const propertyId = parseInt(idStr, 10);

  const [property, setProperty] = useState<(Property & { imageUrl?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      if (isNaN(propertyId)) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "properties"), where("id", "==", propertyId), limit(1));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setProperty({ id: docData.id, ...docData } as Property & { imageUrl?: string });
        } else {
          const localMatch = defaultProperties.find((p) => p.id === propertyId);
          if (localMatch) setProperty(localMatch);
        }
      } catch (err) {
        console.error("Error loading property details:", err);
        const localMatch = defaultProperties.find((p) => p.id === propertyId);
        if (localMatch) setProperty(localMatch);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </AuthLayout>
    );
  }

  if (!property) {
    return (
      <AuthLayout>
        <div className="px-8 py-20 text-center">
          <h2 className="text-xl text-text-primary font-light mb-4">Imóvel não encontrado</h2>
          <Link href="/imoveis" className="text-accent hover:underline text-xs uppercase tracking-wider">
            Voltar para o Portfólio
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="px-8 py-10 max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted/60 mb-8">
          <Link href="/imoveis" className="hover:text-accent transition-colors">Portfólio</Link>
          <ChevronRight size={10} />
          <span className="text-accent truncate max-w-[200px]">{property.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Voltar
        </button>

        {/* Cinematic Property View */}
        <div className="bg-secondary border border-accent/20 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Image Cover */}
          <div className={`relative ${property.imageUrl ? "h-[450px]" : "bg-gradient-to-br " + property.gradient + " h-[300px]"} w-full overflow-hidden flex items-center justify-center`}>
            {property.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={property.imageUrl} 
                alt={property.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
                  <span className="text-accent/30 text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>AB</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30 pointer-events-none" />
            
            {/* Tag Badge */}
            {property.tag && (
              <span className="absolute top-6 left-6 text-[10px] font-bold tracking-[0.3em] text-primary bg-accent px-4 py-1.5 rounded shadow-lg">
                {property.tag}
              </span>
            )}
            
            {/* Float details */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-primary/80 backdrop-blur-sm border border-accent/20 px-3 py-1 rounded">
                  {property.type}
                </span>
                <h1 
                  className="text-3xl md:text-5xl font-light text-text-primary mt-3 leading-tight text-shadow"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {property.name}
                </h1>
              </div>
              <div className="bg-primary/95 backdrop-blur-sm border border-accent/20 p-5 rounded-xl shadow-xl min-w-[200px]">
                <span className="block text-[8px] uppercase tracking-widest text-muted/60 mb-1">Preço de Venda</span>
                <span 
                  className="text-2xl md:text-3xl font-light text-accent"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {property.price}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#0c0c0c]">
            {/* Left Column: Specs & Info */}
            <div className="md:col-span-8 space-y-8">
              <div>
                <h2 className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">Sobre o Imóvel</h2>
                <div className="flex flex-wrap items-center gap-1 text-muted text-sm mb-6">
                  <MapPin size={14} className="text-accent/60 flex-shrink-0" />
                  <span className="font-light">{property.location}</span>
                </div>
                <p className="text-sm text-muted/80 font-light leading-relaxed">
                  Esta residência exclusiva faz parte do seleto portfólio da AB Invest Group. O projeto arquitetônico prioriza a integração espacial, iluminação natural exuberante e acabamentos nobres com materiais selecionados, oferecendo a máxima sofisticação no mercado de alto padrão.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="border border-accent/10 rounded-xl p-6 bg-primary/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-muted/65 mb-1 flex items-center gap-1.5">
                    <Maximize2 size={12} className="text-accent/50" /> Área Útil
                  </span>
                  <span className="text-sm font-medium text-text-primary">{property.size}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-muted/65 mb-1 flex items-center gap-1.5">
                    <BedDouble size={12} className="text-accent/50" /> Quartos
                  </span>
                  <span className="text-sm font-medium text-text-primary">{property.bedrooms} suítes</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-muted/65 mb-1 flex items-center gap-1.5">
                    <Bath size={12} className="text-accent/50" /> Banheiros
                  </span>
                  <span className="text-sm font-medium text-text-primary">{property.bathrooms} banheiros</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-muted/65 mb-1 flex items-center gap-1.5">
                    <Waves size={12} className="text-accent/50" /> Proximidade
                  </span>
                  <span className="text-sm font-medium text-text-primary">{property.distanceToSea}</span>
                </div>
              </div>
            </div>

            {/* Right Column: CTAs / Form */}
            <div className="md:col-span-4 space-y-6">
              <div className="border border-accent/20 rounded-xl p-6 bg-secondary/80 space-y-6">
                <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">Atendimento Premium</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      alert("Simulando fluxo para geração de proposta com IA...");
                    }}
                    className="w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase bg-accent text-primary py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(201,151,77,0.4)] transition-all duration-300"
                  >
                    Gerar Proposta IA
                  </button>

                  <button
                    onClick={() => {
                      window.open(`https://wa.me/5547999999999?text=Olá, tenho interesse no imóvel ${property.name}`, "_blank");
                    }}
                    className="w-full flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase border border-accent/20 text-muted hover:text-accent hover:border-accent/40 py-3.5 rounded-xl transition-all duration-200"
                  >
                    Falar com Consultor
                  </button>
                </div>

                <div className="pt-4 border-t border-accent/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <span className="text-accent text-xs font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>AB</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-muted/60">Suporte Comercial</span>
                    <span className="text-xs font-medium text-text-primary">AB Invest Group</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
