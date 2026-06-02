import Link from "next/link";
import { MapPin, Maximize2, BedDouble, Bath, Waves, Trash2 } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property & { imageUrl?: string; firestoreId?: string };
  compact?: boolean;
  showDelete?: boolean;
  onDelete?: (firestoreId: string, id: number) => void;
}

export function PropertyCard({ property, compact, showDelete, onDelete }: PropertyCardProps) {
  return (
    <div
      className={`bg-secondary border border-accent/20 rounded-xl overflow-hidden card-gold-hover flex flex-col relative
        ${compact ? "w-72 flex-shrink-0" : "w-full"}`}
    >
      {/* Delete button (Admin mode) */}
      {showDelete && (property.firestoreId || property.id) && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm(`Deseja realmente excluir "${property.name}"?`)) {
              onDelete?.(property.firestoreId || "", property.id);
            }
          }}
          className="absolute top-3 left-3 z-30 bg-red-600/90 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-200"
          title="Excluir Imóvel"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* Image area */}
      <div className={`relative bg-gradient-to-br ${property.gradient} ${compact ? "h-40" : "h-52"} overflow-hidden`}>
        {property.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={property.imageUrl} 
            alt={property.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          /* Decorative icon if no image */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-accent/10 flex items-center justify-center">
              <span className="text-accent/20 text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>AB</span>
            </div>
          </div>
        )}
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent pointer-events-none" />
        {/* Cinematic bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
        {/* Tag */}
        {property.tag && !showDelete && (
          <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.3em] text-primary bg-accent px-2.5 py-1 rounded">
            {property.tag}
          </span>
        )}
        {/* Type badge */}
        <span className="absolute top-3 right-3 text-[9px] font-medium tracking-widest text-accent border border-accent/40 px-2.5 py-1 rounded bg-primary/60 backdrop-blur-sm">
          {property.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-normal text-text-primary leading-snug mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {property.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted text-xs mb-4">
          <MapPin size={11} strokeWidth={1.5} className="text-accent/60 flex-shrink-0" />
          <span className="font-light">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted/70 mb-4">
          <span className="flex items-center gap-1.5">
            <Maximize2 size={11} strokeWidth={1.5} className="text-accent/50" />
            {property.size}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={11} strokeWidth={1.5} className="text-accent/50" />
            {property.bedrooms} quartos
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={11} strokeWidth={1.5} className="text-accent/50" />
            {property.bathrooms}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted/70 mb-4">
          <Waves size={12} strokeWidth={1.5} className="text-accent/50 flex-shrink-0" />
          <span className="font-light">{property.distanceToSea}</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <p
              className="text-xl font-light text-accent"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {property.price}
            </p>
          </div>
          <Link 
            href={`/imoveis/${property.id}`}
            className="mt-3 w-full inline-flex items-center justify-center text-xs font-medium tracking-[0.15em] uppercase border border-accent/30 text-accent hover:bg-accent hover:text-primary py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_16px_rgba(201,151,77,0.25)]"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
